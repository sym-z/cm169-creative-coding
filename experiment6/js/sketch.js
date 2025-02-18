// sketch.js - Passing Notes in Class
// Author: Jack Sims
// Date: February 17 2025

// GPT Conversation used as a tutor and helper.
// Convo Link: https://chatgpt.com/share/67b282eb-6264-800b-85e8-f6f0353fab0c
// Text input from the user.
let rawTextInput;
let rawButton;
let wetButton;
let shiftInput;
// Center of the Canvas
let centerW;
let centerH;

// For page formatting
let wrapLength = 300;
let fontSize = 16;
let rawX = 400;
let rawY = 400;
let wetX = 0;
let wetY = 0;
let shiftInputX = 0;
let shiftInputY = 0;
let encodeOutputX = 200;
let encodeOutputY = 200;
let decodeOutputX = 200;
let decodeOutputY = 200;
let elementBuffer = 32;
// For Encoding and decoding
let shiftValue = 0;
let lastOriginal = "";
let encodedText = "";
let decodedText = "";

// Definitions for bounds checking user input.
const ZERO_KEY = 48;
const NINE_KEY = 57;

const LOWER_A = 97;
const UPPER_A = 65;
const LOWER_Z = 122;
const UPPER_Z = 90;

// L-System Stuff!
// List of rules used by the L-System to draw the circles to the screen.
const ruleList = {
  A: "A",
  B: "CCACEGIF",
  C: "C",
  D: "ASKKSA",
  E: "E",
  F: "DEKKED",
  G: "G",
  H: "FGIKAAGIMOP",
  I: "I",
  J: "HKSUWYDQV",
  K: "K",
  L: "YNVXQAE",
  M: "M",
  N: "MMOMMO",
  O: "O",
  P: "QWFDBV",
  Q: "Q",
  R: "ADFCHB",
  S: "S",
  T: "YWVORPZ",
  U: "U",
  V: "QUNMQUNM",
  W: "W",
  X: "SGCFFDA",
  Y: "Y",
  Z: "JACKSIMS",
};

let textProject = (p) => {
  p.setup = () => {
    p.canvasContainer = $("#canvas-container");
    let canvas = p.createCanvas(
      p.canvasContainer.width(),
      p.canvasContainer.height()
    );
    canvas.parent("canvas-container");
    p.background(200);
    formatSetup();
    let w = p.canvasContainer.width();
    let h = p.canvasContainer.height();
    centerW = p.canvasContainer.width() / 2;
    centerH = p.canvasContainer.height() / 2;
    
    // Set up coords for main page elements
    rawX = 150;
    rawY = 150;
    wetX = w - 200;
    wetY = 150;
    shiftInputX = wetX;
    shiftInputY = wetY + elementBuffer;

    makeUI();
    p.angleMode(p.DEGREES);
    repaint();
  };
  function makeUI() {
    // Text to encode
    rawTextInput = p.createInput("");
    rawTextInput.attribute("placeholder", "Text to encode");
    rawTextInput.position(rawX, rawY);

    // Button to start encoding process
    rawButton = p.createButton("Encode Text");
    rawButton.position(rawX, rawY + elementBuffer);

    rawButton.mousePressed(() => {
      // Do Encode and show original message's L-System
      repaint();
      totalTyped = rawTextInput.value().length;
      let originalString = rawTextInput.value();
      encode(rawTextInput.value());
      console.log(`DRAWING THE L-SYSTEM FOR ${originalString}`);
      for (let i = 0; i < originalString.length; i++) {
        drawLSystem(
          originalString[i].toUpperCase(),
          ruleList[originalString[i].toUpperCase()]
        );
      }
      repaint(false);
      rawTextInput.value("");
    });

    encodeOutputX = 100;
    encodeOutputY = 150;
    // How to shift text to decode
    shiftInput = p.createInput("");
    shiftInput.attribute("placeholder", "Shift Amount");
    shiftInput.position(shiftInputX, shiftInputY);

    // Text to decode
    wetTextInput = p.createInput("");
    //wetTextInput.input(repaint);
    wetTextInput.attribute("placeholder", "Text to decode");
    wetTextInput.position(wetX, wetY);

    // Button to start decoding process
    wetButton = p.createButton("Decode Text with given Shift");
    wetButton.position(shiftInputX, shiftInputY + elementBuffer);
    wetButton.mousePressed(() => {
      // Decode given text with shift value, then display l-system of result.
      decodedText = "";
      console.log(
        `Decoding ${wetTextInput.value()} by ${shiftInput.value() % 26}`
      );
      repaint();
      decode(wetTextInput.value(), shiftInput.value() % 26, true);
      repaint(false);
    });
    decodeOutputX = shiftInputX-128;
    decodeOutputY = shiftInputY+ 2*elementBuffer;

  }
  function repaint(newBg = true) {
    console.log(`Repaint Call! DECODED TEXT IS ${decodedText}`)
    if (newBg) p.background(200);
    let msg = rawTextInput.value();
    p.text(
      `ENCODE INPUT, PRESS "ENCODE TEXT" TO RANDOMLY SHIFT!\nOriginal Message: ${lastOriginal} \nAmount to Shift: ${shiftValue}, \nEncrypted Message:${msg}`,
      encodeOutputX,
      encodeOutputY,
      wrapLength
    );
    p.text(`DECODE OUTPUT, USE THE ABOVE FIELDS AND BUTTON TO DECODE A MESSAGE!\nEncrypted message: ${wetTextInput.value()} \nwhen shifted by ${shiftInput.value()}\nis: ${decodedText}`, decodeOutputX, decodeOutputY,wrapLength)
  }
  function formatSetup() {
    p.textSize(fontSize);
    p.textFont("consolas");
    p.textAlign(p.LEFT, p.TOP);
    p.textWrap(p.WORD);
  }
  p.draw = () => {};
  let totalTyped = 0;

  function encode(inText) {
    // Out of bounds shifting caused weird errors.
    // For the HUD
    lastOriginal = inText;
    encodedText = "";
    shiftValue = p.floor(p.random(0, 25));
    for (let i = 0; i < inText.length; i++) {
      let asciiValue = p.unchar(inText[i]);
      // Character is an upper case letter
      if (asciiValue <= UPPER_Z && asciiValue >= UPPER_A) {
        encodedText += String.fromCharCode(
          ((asciiValue - UPPER_A + shiftValue) % 26) + UPPER_A
        );
      }
      // Character is an lower case letter
      else if (asciiValue <= LOWER_Z && asciiValue >= LOWER_A) {
        encodedText += String.fromCharCode(
          ((asciiValue - LOWER_A + shiftValue) % 26) + LOWER_A
        );
      }
    }
    console.log(`Encoded string is ${encodedText}`);
    rawTextInput.value(encodedText);
    repaint();
  }
  function decode(crypt, shift, drawResult = true) {
    // Determine character type
    // Subtract shift
    // Modulo by proper amount
    decodedText = "";
    for (let i = 0; i < crypt.length; i++) {
      let asciiValue = p.unchar(crypt[i]);
      // Character is an upper case letter
      if (asciiValue <= UPPER_Z && asciiValue >= UPPER_A) {
        decodedText += String.fromCharCode(
          ((asciiValue - UPPER_A - shift + 26) % 26) + UPPER_A
        );
      }
      // Character is an lower case letter
      else if (asciiValue <= LOWER_Z && asciiValue >= LOWER_A) {
        decodedText += String.fromCharCode(
          ((asciiValue - LOWER_A - shift + 26) % 26) + LOWER_A
        );
      }
    }
    // Draw L-System
    if (drawResult) {
      totalTyped = decodedText.length;
      console.log(`DRAWING THE L-SYSTEM FOR ${decodedText}`);
      for (let i = 0; i < decodedText.length; i++) {
        drawLSystem(
          decodedText[i].toUpperCase(),
          ruleList[decodedText[i].toUpperCase()]
        );
      }
      repaint(false);
      wetTextInput.value("");
    }
  }
  // Takes in a rule and draws it to the screen.
  function drawKey(key) {
    // Canvas is centered and rotated when this function is called.
    p.translate(p.canvasContainer.width() / 2, p.canvasContainer.height() / 2);
    // Canvas is rotated based on the number of calls to drawKey()
    p.rotate(45 * totalTyped);
    // Add variation to circles
    let colorMod = p.random(0.5, 1);
    let sizeMod = 1 / totalTyped + p.random() + 1;
    let posMod = 1 / totalTyped + 1.5;
    if (key === "A") {
      // console.log("Drawing A...");
      p.fill(255 * colorMod, 0, 0);
      p.circle(0, 0, 20 * sizeMod);
      p.fill(255,255,255)
      p.text("A",0,0)
    } else if (key === "C") {
      // console.log("Drawing C...");
      p.fill(0, 255 * colorMod, 0);
      p.circle(10 * posMod, 10 * posMod, 20 * sizeMod);
      p.fill(255,255,255)
      p.text("C",10 * posMod,10 * posMod)
    } else if (key === "E") {
      // console.log("Drawing E...");
      p.fill(0, 0, 255 * colorMod);
      p.circle(15 * posMod, 30 * posMod, 20 * sizeMod);
      p.fill(255,255,255)
      p.text("E",15 * posMod,30 * posMod)
    } else if (key === "G") {
      // console.log("Drawing G...");
      p.fill(0, 128 * colorMod, 128 * colorMod);
      p.circle(45 * posMod, 60 * posMod, 20 * sizeMod);
      p.fill(255,255,255)
      p.text("G",45 * posMod,60 * posMod)
    } else if (key === "I") {
      // console.log("Drawing I...");
      p.fill(128 * colorMod, 128 * colorMod, 0);
      p.circle(10 * posMod, 90 * posMod, 20 * sizeMod);
      p.fill(255,255,255)
      p.text("I",10 * posMod,90 * posMod)
    } else if (key === "K") {
      // console.log("Drawing K...");
      p.fill(128 * colorMod, 0, 128 * colorMod);
      p.circle(30 * posMod, 120 * posMod, 20 * sizeMod);
      p.fill(255,255,255)
      p.text("K",30 * posMod,120 * posMod)
    } else if (key === "M") {
      // console.log("Drawing M...");
      p.fill(64 * colorMod, 255 * colorMod, 128 * colorMod);
      p.circle(60 * posMod, 60 * posMod, 20 * sizeMod);
      p.fill(255,255,255)
      p.text("M",60 * posMod,60 * posMod)
    } else if (key === "O") {
      // console.log("Drawing O...");
      p.fill(128 * colorMod, 64 * colorMod, 255 * colorMod);
      p.circle(45 * posMod, 120 * posMod, 20 * sizeMod);
      p.fill(255,255,255)
      p.text("O",45 * posMod,120 * posMod)
    } else if (key === "Q") {
      // console.log("Drawing Q...");
      p.fill(255 * colorMod, 128 * colorMod, 64 * colorMod);
      p.circle(120 * posMod, 45 * posMod, 20 * sizeMod);
      p.fill(255,255,255)
      p.text("Q",120 * posMod,45 * posMod)
    } else if (key === "S") {
      // console.log("Drawing S...");
      p.fill(255 * colorMod, 255 * colorMod, 0);
      p.circle(30 * posMod, 30 * posMod, 20 * sizeMod);
      p.fill(255,255,255)
      p.text("S",30 * posMod,30 * posMod)
    } else if (key === "U") {
      // console.log("Drawing U...");
      p.fill(0, 255 * colorMod, 255 * colorMod);
      p.circle(60 * posMod, 90 * posMod, 20 * sizeMod);
      p.fill(255,255,255)
      p.text("U",60 * posMod,90 * posMod)
    } else if (key === "W") {
      // console.log("Drawing W...");
      p.fill(255 * colorMod, 0, 255 * colorMod);
      p.circle(120 * posMod, 120 * posMod, 20 * sizeMod);
      p.fill(255,255,255)
      p.text("W",120 * posMod,120 * posMod)
    } else if (key === "Y") {
      // console.log("Drawing Y...");
      p.fill(0, 0, 0);
      p.circle(45 * posMod, 45 * posMod, 20 * sizeMod);
      p.fill(255,255,255)
      p.text("Y",45 * posMod,45 * posMod)
    }
    p.pop();
  }
  // ruleKey is the key of the rule we are drawing from the ruleList, and sentence is the associated
  // value.
  function drawLSystem(ruleKey, sentence) {
    //console.log(sentence + " IS THE SENTENCE");
    if (sentence === undefined) return
    for (let i = 0; i < sentence.length; i++) {
      let currentLetter = sentence.charAt(i);
      // Recurse if this letter is also a rule.
      if (currentLetter in ruleList && currentLetter != ruleKey) {
        // Being that it recurses, I increment letters typed so that the rotation works based on the letters in each sentence.
        totalTyped += 1;
        drawLSystem(currentLetter, ruleList[currentLetter]);
      } else {
        p.push();
        drawKey(currentLetter);
      }
    }
  }
};
new p5(textProject);
