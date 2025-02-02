// sketch.js -
// Author: Jack Sims
// Date:

// TODO: Noise on key press
// DONE: Let user adjust ADSR
// TODO: Visual Component
// TODO: Print Controls


let pianoRef = {
  Z: "A3",
  X: "B3",
  C: "C3",
  V: "D3",
  B: "E3",
  N: "F3",
  M: "G3",
  A: "A4",
  S: "B4",
  D: "C4",
  F: "D4",
  G: "E4",
  H: "F4",
  J: "G4",
  K: "A5",
  L: "B5",
  Q: "C5",
  W: "D5",
  E: "E5",
  R: "F5",
  T: "G5",
  Y: "A6",
  U: "B6",
  I: "C6",
  O: "D6",
  P: "E6",
};
let notePositions = {
  A3:0,
  B3:1,
  C3:2,
  D3:3,
  E3:4,
  F3:5,
  G3:6, 
  A4:7,
  B4:8,
  C4:9,
  D4:10,
  E4:11,
  F4:12,
  G4:13, 
  A5:14,
  B5:15,
  C5:16,
  D5:17,
  E5:18,
  F5:19,
  G5:20, 
  A6:21,
  B6:22,
  C6:23,
  D6:24,
  E6:25,
}
// Our Synthesizer
let polySynth;

// For text wrapping.
let wrapLength = 150;

// For output to the user about the current note they're playing.
let currNote = "A4";
let currAtt = 0.01;
let currDec = 0.1;
let currASRatio = 1;
let currRel = 0;
let currVel = 1;
let currDur = 0.2;

// Definitions for bounds checking user input.
const ZERO_KEY = 48;
const NINE_KEY = 57;

const LOWER_A = 97;
const UPPER_A = 65;
const LOWER_Z = 122;
const UPPER_Z = 90;

// Use the number keys to change the note's ADSR
function ADSR(keyNum) {
  if (keyNum === ZERO_KEY + 1) {
    if (currAtt >= 0.05) currAtt -= 0.05;
  } else if (keyNum === ZERO_KEY + 2) {
    if (currAtt < 1) currAtt += 0.05;
  } else if (keyNum === ZERO_KEY + 3) {
    if (currDec >= 0.05) currDec -= 0.05;
  } else if (keyNum === ZERO_KEY + 4) {
    if (currDec < 1) currDec += 0.05;
  } else if (keyNum === ZERO_KEY + 5) {
    if (currASRatio >= 0.05) currASRatio -= 0.05;
  } else if (keyNum === ZERO_KEY + 6) {
    if (currASRatio < 1) currASRatio += 0.05;
  } else if (keyNum === ZERO_KEY + 7) {
    if (currRel >= 0.05) currRel -= 0.05;
  } else if (keyNum === ZERO_KEY + 8) {
    if (currRel < 1) currRel += 0.05;
  } else if (keyNum === ZERO_KEY + 9) {
    if (currDur >= 0.05) currDur -= 0.05;
  } else if (keyNum === ZERO_KEY) {
    if (currDur < 1) currDur += 0.05;
  }
}
// Use the PolySynth to play the given note at the current ADSR
function playNote(note) {
  polySynth.setADSR(currAtt, currDec, currASRatio, currRel);
  polySynth.play(pianoRef[note], currVel, 0, currDur);
}
function drawNote(p,note){
  let height = p.canvasContainer.height();
  let centerW = p.canvasContainer.width()/2;
  let noteRadius = 25;
  p.fill(255,0,0);
  p.circle(centerW,height-noteRadius*notePositions[note],noteRadius);
}
// Set up text output.
function textFormat(p) {
  p.textSize(16);
  p.textFont("Consolas");
  p.textAlign(p.LEFT, p.TOP);
  p.textWrap(p.WORD);
}
// Displays the HUD information about the current state of the PolySynth.
function printHUD(p) {
  p.text(
    `Note: ${currNote}, Attack: ${currAtt}, Decay ${currDec}, Attack - Sustain Ratio: ${currASRatio}, Release: ${currRel}, Velocity: ${currVel}, Duration: ${currDur}`,
    50,
    50,
    wrapLength
  );
}
function printInstructions(p)
{
    p.text("Use the letter keys to play notes. Use number keys to adjust ADSR. 1/2: Lower/Raise Attack, 3/4: Lower/Raise Decay, 5/6: Lower/Raise Attack Sustain Ratio, 7/8: Lower/Raise Release, 9/0: Lower/Raise Duration",p.canvasContainer.width()-wrapLength,50,wrapLength)
}
let soundProject = (p) => {
  p.setup = () => {
    // place our canvas, making it fit our container
    p.canvasContainer = $("#canvas-container");
    let canvas = p.createCanvas(
      p.canvasContainer.width(),
      p.canvasContainer.height()
    );
    canvas.parent("canvas-container");
    polySynth = new p5.PolySynth();

    textFormat(p);
  };

  p.draw = () => {
    p.clear();
    p.fill(0,0,0);
    printHUD(p);
    printInstructions(p)
    drawNote(p,currNote);
  };
  p.keyTyped = () => {
    let keyNum = p.unchar(p.key);
    let note = p.key.toUpperCase();
    if (keyNum >= ZERO_KEY && keyNum <= NINE_KEY) {
      p.clear();
      ADSR(keyNum);
    } else if (
      (keyNum >= UPPER_A && keyNum <= UPPER_Z) ||
      (keyNum >= LOWER_A && keyNum <= LOWER_Z)
    ) {
      p.userStartAudio();
      playNote(note);
      p.clear();
      currNote = pianoRef[note];
    }
  };
};
new p5(soundProject);
