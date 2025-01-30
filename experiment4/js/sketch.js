// sketch.js -
// Author: Jack Sims
// Date: 


let soundProject = (p) => {
  p.setup = () => {
    // place our canvas, making it fit our container
    p.canvasContainer = $("#canvas-container");
    let canvas = p.createCanvas(
      p.canvasContainer.width(),
      p.canvasContainer.height()
    );
    canvas.parent("canvas-container");
    console.log("Works")
  };

  p.draw = () => {};
 
};
new p5(soundProject);
