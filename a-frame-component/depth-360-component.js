AFRAME.registerComponent('depth-360', {
    schema: {
        colorImageURL: { type: 'string' },
        depthImageURL: { type: 'string' },
        pointSize: { type: 'int', default: 6 },
        spread: { type: 'int', default: 100, min: 10, max: 300 },
        skip: { type: 'int', default: 0, min: 0, max: 10 }, 
        colored: { type: 'boolean', default: true }
    },

    init: function () {
        const scene = this.el.sceneEl.object3D;

        function loadImage(url) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = url;
            });
        }

        function getImageData(img) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            return ctx.getImageData(0, 0, canvas.width, canvas.height);
        }

        async function main() {
            const [rgbImage, depthImage] = await Promise.all([
                loadImage(this.data.colorImageURL),
                loadImage(this.data.depthImageURL)
            ]);
        
            const rgbData = getImageData(rgbImage);
            const depthData = getImageData(depthImage);
        
            const positions = [];
            const colors = [];
            const skip = this.data.skip === 0 ? 1 : this.data.skip;
            const spread = this.data.spread;
            const depthThreshold = 1.0; // Minimum depth to prevent unecessary points
        
            for (let y = 0; y < rgbData.height; y += skip) {
                for (let x = 0; x < rgbData.width; x += skip) {
                    const offset = (y * rgbData.width + x) * 4;
                    const r = rgbData.data[offset] / 255;
                    const g = rgbData.data[offset + 1] / 255;
                    const b = rgbData.data[offset + 2] / 255;
                    const depth = (1 - depthData.data[offset] / 255) * spread;
        
                    // Skip points with depth below the threshold
                    if (depth < depthThreshold) {
                        continue;
                    }
        
                    const phi = (y / rgbData.height) * Math.PI;
                    const theta = (x / rgbData.width) * 2 * Math.PI;
        
                    const posX = depth * Math.sin(phi) * Math.cos(theta);
                    const posY = depth * Math.sin(phi) * Math.sin(theta);
                    const posZ = depth * Math.cos(phi);
        
                    positions.push(posX, posY, posZ);
        
                    if (!this.data.colored) {
                        colors.push(1.0, 1.0, 1.0); 
                    } else {
                        colors.push(r, g, b); 
                    }
                }
            }
        
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        
            const vertexShader = `
                precision mediump float;
                
                varying vec3 vColor;
        
                void main() {
                    vColor = color;  
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = ${this.data.pointSize}.0;
                }
            `;
            const fragmentShader = `
                precision mediump float;
                
                varying vec3 vColor;
        
                void main() {
                    gl_FragColor = vec4(vColor, 1.0);
                }
            `;
            const material = new THREE.ShaderMaterial({
                vertexShader,
                fragmentShader,
                vertexColors: true,
            });
        
            const points = new THREE.Points(geometry, material);
            scene.add(points);
        }
        
        main.call(this);
    }
});