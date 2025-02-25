// sketch.js - A Glance into my Capstone Project
// Author: Jack Sims
// Date: February 24, 2025

// ChatGPT helped with the foundations of some of the code in this script. Here is the conversation I used.
// Convo Link: https://chatgpt.com/share/67bd16ba-2510-800b-849b-07a116df827d
let table;
let taskArr = [];
// For Menu Choices
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
    table = p.loadTable("data.csv", "csv", "header");
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
    // taskArr.forEach((task, index) => {
    //    console.log(task);
    // });
    p.append(funcArr, drawBar);
    p.append(funcArr, drawLine);
    p.append(funcArr, outputTasks);
    totalFuncs = funcArr.length;
    p.background('#aaaaaa')
    funcArr[currChoice]();
  };
  const CSV_FUNCTION = 2;
  p.keyTyped = () => {
    let input = p.key.toUpperCase();
    if (currChoice == CSV_FUNCTION) {
      downloadButton.remove();
      teamSelect.remove();
    }
    if (input === "A") {
      currChoice--;
    }
    if (input === "D") {
      currChoice++;
    }
    if (currChoice < 0) currChoice = totalFuncs - 1;
    if (currChoice >= totalFuncs) currChoice = 0;
    p.clear();
    p.background('#aaaaaa')
    funcArr[currChoice]();
  };
  function makeTitle(title) {
    p.fill(0);
    p.textAlign(p.CENTER, p.TOP);
    p.textSize(titleSize);
    p.text(title, cWidth / 2, edgeBuffer);
    p.textSize(fontSize);
    p.textAlign(p.LEFT, p.BOTTOM);
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
    Assets: "#00F800",
    Programming: "#0000FF",
    Design: "#FF0000",
    Tools: "#880088",
    Accessibility: "#DDDD00",
    Assignments: "#FF00FF",
  };
  function drawBar() {
    let scaleFactor = 8.5;
    p.noStroke();
    p.fill(0);
    makeTitle("Which Subjects have had the Most Assigned Tasks?");
    // Reset Dictionary
    Object.keys(subjectCount).forEach((key) => (subjectCount[key] = 0));
    // Calculate amount of tasks per category
    taskArr.forEach((task) => {
      if (task["Subject"] != "") subjectCount[task["Subject"]] += 1;
    });
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
  let taskColor = "#00EE00";
  function drawLine() {
    makeTitle("How Many Tasks Have Been Due Per Day?\nDay #(Blue), # of Tasks(Green)");
    let minDate = Infinity;
    let maxDate = -Infinity;
    taskArr.forEach((task) => {
      let days = Number(task["Days Left"]);
      if (days < minDate && days != EMPTY_DAY) {
        minDate = days;
      }
      if (days > maxDate) {
        maxDate = days;
      }
    });
    // Fill dictionary with an initial count of 0 for all days
    for (let i = 0; i <= p.abs(minDate) + maxDate; i++) {
      tasksPerDay[i] = 0;
    }
    taskArr.forEach((task) => {
      let days = Number(task["Days Left"]);
      if (days != EMPTY_DAY) {
        // Normalize the day so that minDate is technically 0
        days += p.abs(minDate);
        tasksPerDay[days] += 1;
      }
    });
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
  let taskDict;
  // Outputs tasks per member, write to new CSV!
  let downloadButton;
  let teamSelect;
  function outputTasks() {
    p.noStroke();
    p.fill(0);
    makeTitle("Output the Tasks for a Team Member!");
    taskDict = {
      Carter: [],
      Rozy: [],
      James: [],
      Phoebe: [],
      Jackson: [],
      Jack: [],
      ALL: [],
    };
    taskArr.forEach((task) => {
      let assignedStr = task["Team Member(s) Assigned"];
      let assignedArr = assignedStr.split(",");
      if (assignedStr != "") {
        assignedArr.forEach((member) => {
          p.append(taskDict[member.trim()], task);
        });
      }
    });
    // Create dropdown of each key from taskDict
    teamSelect = p.createSelect();
    teamSelect.position(cWidth / 2 - teamSelect.elt.getBoundingClientRect().width+25, cHeight / 2 +25);
    Object.keys(taskDict).forEach((key) => {
      teamSelect.option(key);
    });
    // Create download button
    downloadButton = p.createButton("Download CSV of Team Member's Tasks!");
    downloadButton.position(cWidth / 2- downloadButton.elt.getBoundingClientRect().width, cHeight / 2 + 75);
    downloadButton.mousePressed(downloadCSV);
  }
  function downloadCSV() {
    // Create table
    let table = new p5.Table();
    // Build table using selection from dropdown.
    let memberTaskList = taskDict[teamSelect.value()];
    // Add proper columns to table
    table.addColumn("Assigned Task");
    table.addColumn("Status")
    table.addColumn("Time Estimate")
    table.addColumn("Priority")
    table.addColumn("Sprint Number")
    table.addColumn("Task Category")
    // Add rows to column using taskDict
    memberTaskList.forEach((task) => {
      let row = table.addRow();
      row.setString("Assigned Task",task["Assignment"])
      row.setString("Status",task["Status"])
      row.setString("Time Estimate",task["Time Estimate (Days)"])
      row.setString("Priority",task["Priority"])
      row.setString("Sprint Number",task["Sprint Number"])
      row.setString("Task Category",task["Subject"])
    })
    p.saveTable(table, `${teamSelect.value()}_tasks.csv`);
  }
  p.draw = () => {};
};
new p5(dataProject);
