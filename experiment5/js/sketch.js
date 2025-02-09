// sketch.js - Warmth of 90's Video Game Graphics
// Author: Jack Sims
// Date: 


let graphicsProject = (p) => {
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
new p5(graphicsProject);
