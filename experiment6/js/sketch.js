// sketch.js - AntiMetaMessenger
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

// For Encoding
let shiftValue = 0;
let encodedText = "";
let decodedText = "";

// Definitions for bounds checking user input.
const ZERO_KEY = 48;
const NINE_KEY = 57;

const LOWER_A = 97;
const UPPER_A = 65;
const LOWER_Z = 122;
const UPPER_Z = 90;

// TODO: Decode

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
    p.text(`Shift: ${shiftValue}, ${msg}`, centerW - wrapLength / 2, centerH, wrapLength);
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
    let currTime = new Date();
    shiftValue = currTime.getMilliseconds() %26;
    for (let i = 0; i < inText.length; i++) {
      let asciiValue = p.unchar(inText[i]);
      // Character is a number
      if (asciiValue <= NINE_KEY && asciiValue >= ZERO_KEY) {
        encodedText += String.fromCharCode(ZERO_KEY + ((asciiValue + shiftValue) % 10));
      }
      // Character is an upper case letter
      else if (asciiValue <= UPPER_Z && asciiValue >= UPPER_A) {
        encodedText += String.fromCharCode(UPPER_A + ((asciiValue + shiftValue) % 26));
      }
      // Character is an lower case letter
      else if (asciiValue <= LOWER_Z && asciiValue >= LOWER_A) {
        encodedText += String.fromCharCode(((asciiValue-LOWER_A + shiftValue)%26)+LOWER_A);
        console.log(`asciiValue original: ${asciiValue}, ${asciiValue} + ${shiftValue} = ${asciiValue + shiftValue} % 26 = ${(asciiValue + shiftValue) %26} + Lower bound = ${LOWER_A +(asciiValue + shiftValue) %26}`)
      }
      // Character is something else
      else {
        encodedText += String.fromCharCode(asciiValue);
      }
    }
    console.log(`Encoded string is ${encodedText}`);
    input.value(encodedText);
    decode(encodedText,shiftValue);
    repaint();
  }
  function decode(crypt,shift)
  {
    // Determine character type
    // Subtract shift
    // Modulo by proper amount
    // Works?
    for (let i = 0; i < crypt.length; i++) {
      let asciiValue = p.unchar(crypt[i]);
      // Character is a number
      if (asciiValue <= NINE_KEY && asciiValue >= ZERO_KEY) {
        decodedText += String.fromCharCode(ZERO_KEY + ((asciiValue - shift-ZERO_KEY + 10) % 10));
      }
      // Character is an upper case letter
      else if (asciiValue <= UPPER_Z && asciiValue >= UPPER_A) {
        decodedText += String.fromCharCode(UPPER_A + ((asciiValue - shift - UPPER_A + 26) % 26));
      }
      // Character is an lower case letter
      else if (asciiValue <= LOWER_Z && asciiValue >= LOWER_A) {
        decodedText += String.fromCharCode(((asciiValue - LOWER_A - shift + 26) % 26) + LOWER_A);
        console.log(`asciiValue original: ${asciiValue}, ${asciiValue} - Lower bound = ${asciiValue - LOWER_A} `)
      }
      // Character is something else
      else {
        decodedText += String.fromCharCode(asciiValue);
      }
      console.log(`Encoded String: ${crypt}, Decoded String: ${decodedText}`)
    }
  }

};
new p5(textProject);
