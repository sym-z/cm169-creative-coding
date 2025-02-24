// sketch.js -
// Author: Jack Sims
// Date:
let table;
let taskArr = [];
let funcArr = [];
let totalFuncs = 0;
let currChoice = 0;
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
    //drawBar();
    //drawLine();
    //outputTasks();
    p.append(funcArr, drawBar);
    p.append(funcArr, drawLine);
    p.append(funcArr, outputTasks);
    totalFuncs = funcArr.length;
    funcArr[currChoice]();
  };
  p.keyTyped = () => {
    let input = p.key.toUpperCase();
    // console.log(p.key.toUpperCase())
    if (input === "A") {
      currChoice--;
    }
    if (input === "D") {
      currChoice++;
    }
    if (currChoice < 0) currChoice = totalFuncs - 1;
    if (currChoice >= totalFuncs) currChoice = 0;
    p.clear();
    funcArr[currChoice]();
  };
  function textFormat() {
    p.textFont("consolas");
    p.textSize(fontSize);
  }
  function makeTitle(title) {
    p.fill(0);
    p.textAlign(p.CENTER, p.TOP);
    p.textSize(titleSize);
    p.text(title, cWidth / 2, edgeBuffer);
    p.textSize(fontSize);
    p.textAlign(p.LEFT, p.BOTTOM);
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
    Assets: "#00BB00",
    Programming: "#0000FF",
    Design: "#FF0000",
    Tools: "#880088",
    Accessibility: "#AAAA00",
    Assignments: "#FF00FF",
  };
  function drawBar() {
    let scaleFactor = 8.5;
    p.noStroke();
    p.fill(0);
    makeTitle("What Subjects have had the Most Assigned Tasks?");
    // Reset Dictionary
    Object.keys(subjectCount).forEach((key) => (subjectCount[key] = 0));
    // Calculate amount of tasks per category
    taskArr.forEach((task, index) => {
      if (task["Subject"] != "") subjectCount[task["Subject"]] += 1;
    });
    console.log("Subject Count:", subjectCount);
    let numSubjects = Object.keys(subjectCount).length;
    let barWidth = p.floor(cWidth / numSubjects);
    for (let i = 0; i < numSubjects; i++) {
      let currSubject = Object.keys(subjectCount)[i];
      p.fill(subjectColor[currSubject]);
      let xPos = i * barWidth;
      let barHeight = subjectCount[currSubject] * scaleFactor;
      p.rect(xPos, cHeight - barHeight, barWidth - 5, barHeight);
      p.text(
        `${currSubject}: ${subjectCount[currSubject]}`,
        xPos,
        cHeight - barHeight - 5
      );
    }
  }
  // Shows tasks per due per day
  // Use days left + the minimum value, -36!
  // Y-Plot, amount of tasks due on that day
  // X-Plot, days -36(0) to whatever the max is.
  // Due to my Google Sheets formula, a task with no assigned date assigns "Days Left:" to -45711
  const EMPTY_DAY = -45711;
  let tasksPerDay = {};
  let lineScaleFactor = 25;
  let lineColor = "#FF0000";
  let dayColor = "#0000FF";
  let taskColor = "#00AA00";
  function drawLine() {
    makeTitle("How Many Tasks Have Been Due Per Day?");
    let minDate = Infinity;
    let maxDate = -Infinity;
    taskArr.forEach((task, index) => {
      let days = Number(task["Days Left"]);
      if (days < minDate && days != EMPTY_DAY) {
        //console.log(`${days} is less than ${minDate}`);
        minDate = days;
        //console.log(`${days} is new minDate`);
      }
      if (days > maxDate) {
        //console.log(`${days} is greater than ${maxDate}`);
        maxDate = days;
        //console.log(`${days} is new maxDate`);
      }
    });
    //console.log("min ", minDate, " max ", maxDate);
    // Fill dictionary with an initial count of 0 for all days
    for (let i = 0; i <= p.abs(minDate) + maxDate; i++) {
      tasksPerDay[i] = 0;
    }
    taskArr.forEach((task, index) => {
      let days = Number(task["Days Left"]);
      if (days != EMPTY_DAY) {
        // Normalize the day so that minDate is technically 0
        days += p.abs(minDate);
        tasksPerDay[days] += 1;
      }
    });
    //console.log(tasksPerDay)

    // Draw line graph
    p.noFill();
    p.stroke(lineColor);
    p.beginShape();
    for (let i = 0; i < Object.keys(tasksPerDay).length; i++) {
      let xVal = p.map(
        i,
        0,
        Object.keys(tasksPerDay).length - 1,
        edgeBuffer,
        cWidth - edgeBuffer
      );
      let yVal = cHeight - tasksPerDay[i] * lineScaleFactor;
      p.vertex(xVal, yVal);
      p.stroke(dayColor);
      p.text(`${i}`, xVal, cHeight + 16);
      p.stroke(taskColor);
      p.text(`${tasksPerDay[i]}`, xVal, yVal - 5);
      p.stroke(lineColor);
    }
    p.endShape();
  }
  // Outputs tasks per member, write to new CSV!
  function outputTasks() {
    let taskDict = {
      Carter: [],
      Rozy: [],
      James: [],
      Phoebe: [],
      Jackson: [],
      Jack: [],
      ALL: [],
    };
    taskArr.forEach((task, index) => {
      let assignedStr = task["Team Member(s) Assigned"];
      let assignedArr = assignedStr.split(",");
      if (assignedStr != "") {
        assignedArr.forEach((member) => {
          p.append(taskDict[member.trim()], task);
        });
      }
    });
    console.log(taskDict);
  }
  p.draw = () => {};
};
new p5(dataProject);
