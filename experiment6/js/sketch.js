// sketch.js - 
// Author: Jack Sims
// Date: 

let textProject = (p) => {
  p.setup = () => {
    // place our canvas, making it fit our container
    p.canvasContainer = $("#canvas-container");
    let canvas = p.createCanvas(
      p.canvasContainer.width(),
      p.canvasContainer.height()
    );
    canvas.parent("canvas-container");
  };

  p.draw = () => {
  };
};
new p5(textProject);
