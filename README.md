# Depth-360 Component Documentation

### Description/Rationale
The repository demonstrates the implementation of immersive 360 depth images and videos for WebXR powered by **A-Frame** and **Three.js**. This component allows developers to render depth-enhanced 360-degree visuals, offering an engaging and interactive experience in virtual reality environments.

### Instructions
1. **Include A-Frame and Three.js:**
   Ensure you have A-Frame and Three.js included in your HTML file:
   ```html
   <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
```
2. Add the Component Script: Copy the depth-360 component script into your project or include it directly in your HTML:

```html
<script>
// Paste the 'depth-360' component code here
</script>
```
3. Create an A-Frame Scene: Use the component in your A-Frame scene by specifying it as an attribute of an <a-entity>:

```html
<a-scene>
  <a-entity depth-360="colorImageURL: path/to/color-image.jpg; depthImageURL: path/to/depth-image.jpg; pointSize: 6; spread: 100; skip: 1; colored: true"></a-entity>
</a-scene>
```
<b>Component Schema</b>
* colorImageURL (string): URL of the RGB color image.
* depthImageURL (string): URL of the corresponding depth map image.
* pointSize (integer): Size of the rendered points. (Default: 6)
* spread (integer): Depth multiplier for rendering points. (Default: 100, Range: 10–300)
* skip (integer): Number of pixels to skip when processing the images for optimization. (Default: 0, Range: 0–10)
* colored (boolean): Determines whether to use the RGB image colors or render all points in white. (Default: true)

### Tech Stack
The project is powered by A-Frame and Three.js.

### Demo
To see the component in action, visit the following page:
