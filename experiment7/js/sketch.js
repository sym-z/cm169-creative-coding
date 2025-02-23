// sketch.js - 
// Author: Jack Sims
// Date: 

let dataProject = (p) => {
  p.setup = () => {
    p.canvasContainer = $("#canvas-container");
    let canvas = p.createCanvas(
      p.canvasContainer.width(),
      p.canvasContainer.height()
    );
    canvas.parent("canvas-container");
    
  };

  p.draw = () => {};

};
new p5(dataProject);
