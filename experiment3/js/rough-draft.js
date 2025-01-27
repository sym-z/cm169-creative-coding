const axiom = "F";
const rule = {
  "F": "F+F+F-F",
  "J": "F+F+J-J",
  "A": "J+F+F+A"
}
let sentence = axiom;

function setup() {
  createCanvas(400, 400);
  drawLSystem('A',rule['A']);
  angleMode(DEGREES)
}
function drawLSystem(ruleKey, s) {

  // USE SET PIXEL INSTEAD OF SHAPES
  for (let i = 0; i < s.length; i++) {
    let current = s.charAt(i);
    // If a letter in this sentence is also a rule,
      // Start this function again.
    if(current in rule && current != ruleKey)
      {
        console.log("RECURSE")
        drawLSystem(current, rule[current]);
      }
    else
      {
        
    if (current === "F") {
      fill(255,0,0);
      circle(0,0,100);
    } else if (current === "+") {
      console.log("PLUS")
      fill(255,255,0);
      circle(100,100,100);
    } else if (current === "-") {
      fill(0,0,255);
      ellipse(200,200,50,50)
    }
      else if (current === "J")
        {
          fill(100,50,100);
          quad(200,200,400,200,400,400,200,400)
        }
        else if (current === "A")
          {
            fill(200,24,59);
            circle(200,0,20);
          }
      }
  }
}


function draw() {
  
}