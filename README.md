# 360 Depth in WebXR
<p align="center">
  <img src="img/screenshot.jpg" />
</p>

### Description/Rationale
The repository demonstrates the implementation of immersive 360 depth (image and video) in WebXR powered by **A-Frame**, **Three.js** and **Depth Anywhere**. It has the following: 
1. A-Frame component.
2. Three.js example implementation.

### Instructions
A-Frame component can be found in <b>"a-frame-component"</b> folder. Usage example of the component is given below:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A-Frame Depth 360 Component</title>
    <script src="https://aframe.io/releases/1.6.0/aframe.min.js"></script>
 <script src="https://cdn.jsdelivr.net/gh/akbartus/360-Depth-in-WebXR/a-frame-component/depth-360-component.js"></script>
</head>
<body>
    <a-scene>     
        <a-entity rotation="90 0 0" depth-360="colorImageURL: https://cdn.glitch.global/35f43dae-1ed9-4eff-b068-3100ca885bb4/1.jpg; depthImageURL: https://cdn.glitch.global/35f43dae-1ed9-4eff-b068-3100ca885bb4/1depth.jpg; spread: 10; pointSize: 10; skip: 1; colored: true">
            <a-entity camera="fov: 75" wasd-controls look-controls position="0 0 1"></a-entity>
            <a-box color="orange" position="0 0 -5"></a-box>
        </a-entity>
        <a-sky color="#000"></a-sky>
    </a-scene>
</body>
</html>
```
In order to use the component, make sure to include <b>depth-360</b> attribute.<br><br> 
<b>The component has the following schema:</b>
* colorImageURL (string): URL of the 360 RGB color image.
* depthImageURL (string): URL of the corresponding 360 depth map image.
* pointSize (integer): Size of the rendered points. (Default: 6)
* spread (integer): Depth multiplier for rendering points. (Default: 100, Range: 10–300)
* skip (integer): Number of points to skip when processing the images for optimization. (Default: 0, Range: 0–10)
* colored (boolean): Determines whether to show point cloud as colored or white. (Default: true)

Three.js example implementation can be found in <b>"threejs"</b> folder.

### Getting 360 Depth
The example 360 image and 360 depth both were taken from <a href="https://albert100121.github.io/Depth-Anywhere/">"Depth Anywhere: Enhancing 360 Monocular Depth Estimation via Perspective Distillation and Unlabeled Data Augmentation - Neurips 2024" project</a>.<br>
In order to generate own 360 depth for 360 image, please visit: [ https://albert100121.github.io/Depth-Anywhere/](https://huggingface.co/spaces/Albert-NHWang/Depth-Anywhere-App) 
<br><b>Please note:</b> Make sure original image and generated depth both have the same size.

### 360 Depth Video
To be added soon.

### Tech Stack
The project is powered by A-Frame, Three.js and Depth Anywhere project.

### Demo
To see the component in action, visit the following page: https://depth360-component.glitch.me/
