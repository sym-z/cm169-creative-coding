// sketch.js - Warmth of 90's Video Game Graphics
// Author: Jack Sims
// Date: February 10, 2025

let angleY = 0;
let angleX = 3.14;
let angleZ = 0;
let speed = 0.2;
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
