// sketch.js - An interactive grammar and L-System visualizer.
// Author: Jack Sims
// Date: 1/27/2025

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

let customGrammar = (p) => {
  p.setup = () => {
    // place our canvas, making it fit our container
    p.canvasContainer = $("#canvas-container");
    let canvas = p.createCanvas(
      p.canvasContainer.width(),
      p.canvasContainer.height()
    );
    canvas.parent("canvas-container");
    p.angleMode(p.DEGREES)
    // Chat GPT let me know that consolas was an available font in this conversation
      // Link: https://chatgpt.com/share/67984b26-1b98-800b-b64b-813365341a82
    p.textFont("consolas")
  };

  p.draw = () => {};
  // The amount of keys pressed since the start of the program.
  let totalTyped = 0;
  let textOffset = 0;
  p.keyTyped = () => {
    totalTyped += 1;
    p.textSize(16);
    p.text(`${p.key}`, 16 + 16 * textOffset,16)
    textOffset += 1;
    drawLSystem(p.key.toUpperCase(), ruleList[p.key.toUpperCase()]);
  };
  // Takes in a rule and draws it to the screen.
  function drawKey(key) {
    // Canvas is centered and rotated when this function is called.
    p.translate(p.canvasContainer.width()/2, p.canvasContainer.height()/2);
    // Canvas is rotated based on the number of calls to drawKey()
    p.rotate(45*totalTyped);
    // Add variation to circles
    let colorMod = p.random(0.5,1);
    let sizeMod = 1/totalTyped + p.random()+1;
    let posMod = 1/totalTyped + 1.5;
    if (key === "A") {
      console.log("Drawing A...");
      p.fill(255*colorMod, 0, 0);
      p.circle(0, 0, 20*sizeMod);
    }
    else if (key === "C")
    {
      console.log("Drawing C...");
      p.fill(0,255*colorMod,0)
      p.circle(10*posMod,10*posMod,20*sizeMod)

    }
    else if (key === "E")
    {
      console.log("Drawing E...");
      p.fill(0,0,255*colorMod)
      p.circle(15*posMod,30*posMod,20*sizeMod)

    }
    else if (key === "G")
    {
      console.log("Drawing G...");
      p.fill(0,128*colorMod,128*colorMod)
      p.circle(45*posMod,60*posMod,20*sizeMod)

    }
    else if (key === "I")
    {
      console.log("Drawing I...");
      p.fill(128*colorMod,128*colorMod,0)
      p.circle(10*posMod,90*posMod,20*sizeMod)

    }
    else if (key === "K")
    {
      console.log("Drawing K...");
      p.fill(128*colorMod,0,128*colorMod)
      p.circle(30*posMod,120*posMod,20*sizeMod)

    }
    else if (key === "M")
    {
      console.log("Drawing M...");
      p.fill(64*colorMod,255*colorMod,128*colorMod)
      p.circle(60*posMod,60*posMod,20*sizeMod)

    }
    else if (key === "O")
    {
      console.log("Drawing O...");
      p.fill(128*colorMod,64*colorMod,255*colorMod)
      p.circle(45*posMod,120*posMod,20*sizeMod)

    }
    else if (key === "Q")
    {
      console.log("Drawing Q...");
      p.fill(255*colorMod,128*colorMod,64*colorMod)
      p.circle(120*posMod,45*posMod,20*sizeMod)

    }
    else if (key === "S")
    {
      console.log("Drawing S...");
      p.fill(255*colorMod,255*colorMod,0)
      p.circle(30*posMod,30*posMod,20*sizeMod)

    }
    else if (key === "U")
    {
      console.log("Drawing U...");
      p.fill(0,255*colorMod,255*colorMod)
      p.circle(60*posMod,90*posMod,20*sizeMod)

    }
    else if (key === "W")
    {
      console.log("Drawing W...");
      p.fill(255*colorMod,0,255*colorMod)
      p.circle(120*posMod,120*posMod,20*sizeMod)

    }
    else if (key === "Y")
    {
      console.log("Drawing Y...");
      p.fill(0,0,0)
      p.circle(45*posMod,45*posMod,20*sizeMod)

    }
    p.pop();
  }
  // ruleKey is the key of the rule we are drawing from the ruleList, and sentence is the associated
  // value.
  function drawLSystem(ruleKey, sentence) {
    console.log(sentence+" IS THE SENTENCE");
    for (let i = 0; i < sentence.length; i++) {
      let currentLetter = sentence.charAt(i);
      // Recurse if this letter is also a rule.
      if (currentLetter in ruleList && currentLetter != ruleKey) {
        console.log(`Recursing into new ruleKey: ${currentLetter}`);
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
new p5(customGrammar);
