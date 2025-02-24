// sketch.js -
// Author: Jack Sims
// Date:
let table;
let taskArr = [];

// For plot distribution
let cWidth;
let cHeight;
let edgeBuffer = 24;

// Text formatting
let fontSize = 12;
let titleSize = 32;
let wrapLength = 300;

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

    // TODO: Use left and right button to cycle through options. 
    taskArr.forEach((task, index) => {
      console.log(task);
    });
    //drawTaskScatter();
    drawBar();
  };
  function textFormat() {
    p.textFont("consolas");
    p.textSize(fontSize);
  }
  let circleSize = 50;
  // TODO: Include name and better formatting.
  function drawTaskScatter() {
    taskArr.forEach((task, index) => {
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
    });
  }
  // Shows tasks per category
  let subjectCount = {
    Assets: 0,
    Programming: 0,
    Design: 0,
    Tools: 0,
    Accessibility: 0,
    Assignments: 0,
  };
  let subjectColor = {
    Assets: '#00BB00',
    Programming: '#0000FF',
    Design: '#FF0000',
    Tools: '#880088',
    Accessibility:'#AAAA00',
    Assignments:'#FF00FF'
  }
  let scaleFactor = 8.5;
  function drawBar() {
    p.textAlign(p.CENTER,p.TOP)
    p.textSize(titleSize)
    p.text("What Subjects have had the Most Assigned Tasks?", cWidth/2,edgeBuffer)
    p.textSize(fontSize)
    p.textAlign(p.LEFT,p.BOTTOM)
    // Calculate amount of tasks per category
    taskArr.forEach((task,index) => {
      if(task["Subject"] != "") subjectCount[task["Subject"]] += 1; 
    }) 
    console.log("Subject Count:",subjectCount)
    let numSubjects = Object.keys(subjectCount).length;
    let barWidth = p.floor(cWidth / numSubjects)
    for(let i = 0; i < numSubjects; i++)
    {
      let currSubject = Object.keys(subjectCount)[i]
      p.fill(subjectColor[currSubject])
      let xPos = i * barWidth;
      let barHeight = subjectCount[currSubject] * scaleFactor
      p.rect(xPos,cHeight-barHeight, barWidth-5, barHeight)
      p.text(`${currSubject}: ${subjectCount[currSubject]}`,xPos,cHeight-barHeight-5)
    }
  }
  // Shows tasks per sprint
  // Use days left + the minimum value, -36!
  // Y-Plot, amount of tasks due on that day
  // X-Plot, days -36(0) to whatever the max is.
  // Due to my Google Sheets formula, a task with no assigned date assigns "Days Left:" to -45711
  const EMPTY_DAY = -45711
  function drawLine() {
    let minDate = Infinity;
    let maxDate = -Infinity
    taskArr.forEach((task,index)=>{
      if(task["Days Left:"] < minDate) minDate = task["Days Left:"] 
      if(task["Days Left:"] > maxDate) maxDate = task["Days Left:"] 
      
    })
  }
  // Outputs tasks per member, write to new CSV!
  function outputTasks(task, index) {}
  p.draw = () => {};
};
new p5(dataProject);
