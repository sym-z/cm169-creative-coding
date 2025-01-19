// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const sketch3 = (pInst) => {
  let canvasContainerC;
  pInst.setup = () => {
    canvasContainerC = $("#canvas-container3");
    let canvas = pInst.createCanvas(
      canvasContainerC.width(),
      canvasContainerC.height()
    );
    canvas.parent("canvas-container3");
  };
  pInst.draw = () => {
    pInst.background(0,0,100);
  };
};
new p5(sketch3);