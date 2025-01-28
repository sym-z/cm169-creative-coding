// sketch.js - An interactive grammar and L-System visualizer.
// Author: Jack Sims
// Date: 1/27/2025

const ruleList = {
  A: "A",
  B: "CC",
  C: "C",
  D: "ASK",
  E: "E",
  F: "DEK",
  G: "G",
  H: "FGIK",
  I: "I",
  J: "HK",
  K: "K",
  L: "YNV",
  M: "M",
  N: "CE",
  O: "O",
  P: "QWFDB",
  Q: "Q",
  R: "ADFCHB",
  S: "S",
  T: "YWVO",
  U: "U",
  V: "QUNM",
  W: "W",
  X: "SGC",
  Y: "Y",
  Z: "ACKSIMS",
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
    p.translate(p.canvasContainer.width()/2, p.canvasContainer.height()/2);
    p.rotate(45*totalTyped);
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
