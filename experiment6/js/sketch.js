// sketch.js -
// Author: Jack Sims
// Date:

// Text input from the user.
let input;

// Center of the Canvas
let centerW;
let centerH;

let textProject = (p) => {
  p.setup = () => {
    p.canvasContainer = $("#canvas-container");
    let canvas = p.createCanvas(
      p.canvasContainer.width(),
      p.canvasContainer.height()
    );
    canvas.parent("canvas-container");
    p.background(200);

    input = p.createInput("");
    input.position(centerW, centerH + 100);

    input.input(repaint);

    centerW = p.canvasContainer.width()/2;
    centerH = p.canvasContainer.height()/2;
  };

  function repaint() {
    p.background(200);
    let msg = input.value();
    p.text(msg, centerW, centerH);
  }
  p.draw = () => {};
};
new p5(textProject);
