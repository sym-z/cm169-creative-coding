// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const sketch2 = (pInst) => {
  let canvasContainerB;
  pInst.setup = () => {
    canvasContainerB = $("#canvas-container2");
    let canvas = pInst.createCanvas(
      canvasContainerB.width(),
      canvasContainerB.height()
    );
    canvas.parent("canvas-container2");
  };
  pInst.draw = () => {
    pInst.background(100,0,0);
  };
};
new p5(sketch2);