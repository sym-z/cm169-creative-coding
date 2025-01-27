const axiom = "F";
const rule = {
  "F": "F+F+F-F",
  "J": "F+F+J-J",
  "A": "J+F+F+A",
  "X": "A-A+J-X",
  "Y": "X+F+J+A+X-X+X-X-X",
  "Z": "Y-F+F-X+A-J+X-Y"
}
let sentence = axiom;

function setup() {
  createCanvas(400, 400);
  translate(width / 2, height / 2);
    angleMode(DEGREES)
  drawLSystem('Z',rule['Z']);
}
function drawLSystem(ruleKey, s) {

  let shift = 50;
  let rotation = 30;
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
      push();
    if (current === "F") {
      console.log("F")
      push();
      fill(200,24,59);
      circle(0,0,20);
      pop();
    } else if (current === "+") {
      console.log("PLUS")
      rotate(rotation);
    } else if (current === "-") {
      console.log("MINUS")
      rotate(-rotation);
    }
      else if (current === "J")
        {
          console.log("J")
          push();
          fill(100,50,100);
          quad(200,200,400,200,400,400,200,400)
          pop();
          translate(shift,0)
        }
        else if (current === "A")
          {
            console.log("A")
            translate(shift,0)
          }
      }
  }
}


function draw() {
  
}