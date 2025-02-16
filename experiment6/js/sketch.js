// sketch.js -
// Author: Jack Sims
// Date:

// Text input from the user.
let input;

// Center of the Canvas
let centerW;
let centerH;

// For text formatting
let wrapLength = 300;
let fontSize = 32;

let textProject = (p) => {
  p.setup = () => {
    p.canvasContainer = $("#canvas-container");
    let canvas = p.createCanvas(
      p.canvasContainer.width(),
      p.canvasContainer.height()
    );
    canvas.parent("canvas-container");
    p.background(200);
    makeInputBox();
    formatSetup();
    centerW = p.canvasContainer.width() / 2;
    centerH = p.canvasContainer.height() / 2;
  };
  function makeInputBox() {
    input = p.createInput("");
    input.position(centerW, centerH + 100);
    input.input(repaint);
  }
  function repaint() {
    p.background(200);
    let msg = input.value();
    p.text(msg, centerW-wrapLength/2, centerH, wrapLength);
  }
  function formatSetup() {
    p.textSize(fontSize);
    p.textFont("consolas");
    p.textAlign(p.CENTER, p.CENTER);
    p.textWrap(p.WORD);
  }
  p.draw = () => {};
  p.keyPressed = () => {
    if (p.keyCode === p.ENTER) {
      inputHandle(input.value());
    }
  };
  function inputHandle(inText) {
    console.log(inText);
    input.value("");
    repaint();
  }
};
new p5(textProject);
