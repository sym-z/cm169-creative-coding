// sketch.js -
// Author: Jack Sims
// Date:
let table;
let taskArr = [];

// For plot distribution
let cWidth;
let cHeight;
let edgeBuffer = 24;
let dataProject = (p) => {
  p.preload = () => {
    table = p.loadTable("/data.csv", "csv", "header");
  };
  p.setup = () => {
    p.canvasContainer = $("#canvas-container");
    let canvas = p.createCanvas(
      p.canvasContainer.width(),
      p.canvasContainer.height()
    );
    canvas.parent("canvas-container");

    cWidth = p.canvasContainer.width() - edgeBuffer;
    cHeight = p.canvasContainer.height() - edgeBuffer;

    for (let i = 0; i < table.getRowCount(); i++) {
      p.append(taskArr, table.getRow(i).obj);
    }

    // TODO: If statement to choose type of plot.
    taskArr.forEach((task, index) => {
      console.log(task);
      drawTaskScatter(task, index);
    });
  };
  let circleSize = 50;
  function drawTaskScatter(task, index) {
    let dataX = task["Time Estimate (Days)"];
    let dataY = task["Sprint Number"];
    let yPos = edgeBuffer;
    let xPos = edgeBuffer;
    if (dataX != "") {
      xPos = dataX;
    } else {
      return;
    }
    if (dataY != "") {
      yPos = dataY;
    } else {
      return;
    }
    xPos = p.floor(cWidth / xPos);
    yPos = p.floor(cHeight / yPos);
    p.ellipse(xPos, yPos, circleSize, circleSize);
  }
  // Shows tasks per category
  function drawBar(task,index){

  }
  // Shows tasks per sprint
  function drawLine(){

  }
  // Outputs tasks per member
  function outputTasks(task)
  {

  }
  p.draw = () => {};
};
new p5(dataProject);
