// sketch.js - 
// Author: Jack Sims
// Date: 
let table;
let taskArr = [];

// For plot distribution
let cWidth;
let cHeight;

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

    cWidth = p.canvasContainer.width();
    cHeight = p.canvasContainer.height();

    for (let i = 0; i<table.getRowCount(); i++)
    {
      p.append(taskArr, table.getRow(i).obj)
    }

    // TODO: If statement to choose type of plot.
    taskArr.forEach((task, index) => {
      console.log(task)
      drawTaskScatter(task,index)
    })
  };
  let circleSize = 2;
  function drawTaskScatter(task,index)
  {
   // Get screenwidth and divide by number of tasks for equal distribution
   let xDelta = p.ceil((cWidth - circleSize) / table.getRowCount()-1);
   // Do the same for height
   let yDelta = p.ceil((cHeight-circleSize) / table.getRowCount()-1);
   p.fill(255,0,0)
   // Draw a circle for each task in order
   p.circle(index*xDelta+circleSize,index*yDelta+circleSize,circleSize)
  //  for (let i = circleSize, j = circleSize; i < cWidth && j < cHeight; i += xDelta, j += yDelta)
  //  {
  //     //p.circle(i,j,circleSize)
  //     p.text(i,j,task["Time Estimate (Days)"])
      
  //  }
  }
  p.draw = () => {};

};
new p5(dataProject);
