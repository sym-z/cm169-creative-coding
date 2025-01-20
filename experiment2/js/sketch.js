// sketch.js - purpose and description here
// Author: Jack Sims
// Date: Jan 19, 2025

// Create sketch1, a callback to be handed to the p5 constructor.
// This strategy I am using, encapsulating the sketches to be callbacks for the p5 function, was 
  // recommended to me in a conversation with chatGPT on how to get all three sketches in one nice window.
  // convo link: https://chatgpt.com/share/67883518-2834-800b-8b1a-d8fff46f1535
  

let HEIGHT;
let WIDTH;
const sketch1 = (pInst) => {
  let canvasContainerA;
  pInst.setup = () => {
    canvasContainerA = $("#canvas-container");
    let canvas = pInst.createCanvas(
      canvasContainerA.width(),
      canvasContainerA.height()
    );
    HEIGHT = canvasContainerA.height()
    WIDTH = canvasContainerA.width()
    canvas.parent("canvas-container");
    pInst.angleMode(pInst.DEGREES)
  };
  pInst.draw = () => {
    // Fill background sky with blue color.
    pInst.background(50,50,160);
    let horizonHeight = 3*HEIGHT/4;
    // Fill ground quad with brown color.
    pInst.fill(79,55,0)
    let ground = pInst.quad(0,horizonHeight,WIDTH,horizonHeight,WIDTH,HEIGHT,0,HEIGHT)
    
    // Start drawing the sun
    pInst.fill(170,170,0)
    let sunHeight = HEIGHT / 4
    let sunWidth = sunHeight
    let sunSize = 150
    let sun = pInst.ellipse(sunWidth,sunHeight,sunSize,sunSize)

    // Draw the center sunflower 
    // Stem
    let stemThickness = 25
    let stemHeight = 120
    let centerWidth = WIDTH/2
    pInst.fill(0,100,0)
    let stem = pInst.quad(centerWidth-stemThickness/2,horizonHeight-stemHeight,centerWidth + stemThickness/2,horizonHeight-stemHeight,centerWidth+stemThickness/2,horizonHeight,centerWidth-stemThickness/2,horizonHeight)
    
    // Face Setup
    let faceSize = 75
    
    // Drawing Petals under face
    let petalSize = 30
    let numPetals = 12
    let faceX = centerWidth
    let faceY = horizonHeight-stemHeight-faceSize/2
    
    pInst.fill(200,200,0)
    // GPT helped me figure out what was going wrong with my push() and pop(), and it
      // suggested the use of translate() which made what I wanted to do a lot easier.
      // Conversation link: https://chatgpt.com/share/678d6a3c-8c18-800b-a058-e80e40556a07
    for(let i = 0; i < 360; i += 360/numPetals)
    {
      pInst.push()
      pInst.translate(faceX,faceY)
      pInst.rotate(i)
      pInst.quad(0,0,-petalSize/2,-petalSize,0,-petalSize*2,petalSize/2,-petalSize)
      pInst.pop()
    }
    // Draw face on top of petals
    pInst.fill(100,100,0)
    let face = pInst.ellipse(centerWidth, horizonHeight-stemHeight-faceSize/2,faceSize,faceSize)
  };
};
new p5(sketch1);