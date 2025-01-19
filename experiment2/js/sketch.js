// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// Create sketch1, a callback to be handed to the p5 constructor.
let HEIGHT;
let WIDTH;
const sketch1 = (pInst) => {
  let canvasContainerA;
  pInst.setup = () => {
    canvasContainerA = $("#canvas-container");
    let canvas = pInst.createCanvas(
      canvasContainerA.width(),
      canvasContainerA.height()
    );
    HEIGHT = canvasContainerA.height()
    WIDTH = canvasContainerA.width()
    canvas.parent("canvas-container");
  };
  pInst.draw = () => {
    // Fill background sky with blue color.
    pInst.background(50,50,160);
    let horizonHeight = 3*HEIGHT/4;
    // Fill ground quad with brown color.
    pInst.fill(79,55,0)
    let ground = pInst.quad(0,horizonHeight,WIDTH,horizonHeight,WIDTH,HEIGHT,0,HEIGHT)
    
    // Start drawing the sun
    pInst.fill(170,170,0)
    let sunHeight = HEIGHT / 4
    let sunWidth = sunHeight
    let sunSize = 150
    let sun = pInst.ellipse(sunWidth,sunHeight,sunSize,sunSize)

    // Draw the center sunflower
    // Stem
    // Face
    // Petals
  };
};
new p5(sketch1);