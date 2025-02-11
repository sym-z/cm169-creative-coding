// sketch.js - Warmth of 90's Video Game Graphics
// Author: Jack Sims
// Date: February 10, 2025

// NOTE: I used Professor Modes' teapot tutorial example to visualize the mesh of the environment I created, and learned about the normalMaterial() function from ChatGPT when trying to find a workaround for the lack of .mtl file support.
  // GPT Convo Link: https://chatgpt.com/share/67aa6e9a-d574-800b-8b38-6e5c149a4b06
let angleY = 0;
let angleX = 3.14;
let angleZ = 0;
// Speed modifier because initial code was much too fast.
let speed = 0.2;
// The 3D Model.
let test;
let graphicsProject = (p) => {
  p.preload = () => {
    test = p.loadModel("/experiment5/assets/test-model3.obj");
  };
  p.setup = () => {
    // place our canvas, making it fit our container
    p.canvasContainer = $("#canvas-container");
    let canvas = p.createCanvas(
      p.canvasContainer.width(),
      p.canvasContainer.height(),
      p.WEBGL
    );
    canvas.parent("canvas-container");
  };

  p.draw = () => {
    // Set the background color
    p.background(255);

    // Rotate the model around the x-axis
    p.rotateX(angleX);

    // Rotate the model around the y-axis
    p.rotateY(angleY);

    // Rotate the model around the z-axis
    p.rotateZ(angleZ);

    // Increase the angles for the next frame
    angleX += 0.001 * speed;
    angleY += 0.08 * speed;
    angleZ += 0.005 * speed;

    p.normalMaterial();
    p.model(test);
  };
};
new p5(graphicsProject);
