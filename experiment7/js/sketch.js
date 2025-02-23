// sketch.js - 
// Author: Jack Sims
// Date: 
let table;

let dataProject = (p) => {
  p.preload = () => {
    table = p.loadTable('/data.csv','csv','header')
  }
  p.setup = () => {
    p.canvasContainer = $("#canvas-container");
    let canvas = p.createCanvas(
      p.canvasContainer.width(),
      p.canvasContainer.height()
    );
    canvas.parent("canvas-container");
    console.table(table);
  };

  p.draw = () => {};

};
new p5(dataProject);
