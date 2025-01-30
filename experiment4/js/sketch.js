// sketch.js -
// Author: Jack Sims
// Date: 

let pianoRef = {
  Z:'A3',
  X:'B3',
  C:'C3',
  V:'D3',
  B:'E3',
  N:'F3',
  M:'G3',
  A:'A4',
  S:'B4',
  D:'C4',
  F:'D4',
  G:'E4',
  H:'F4',
  J:'G4',
  K:'A5',
  L:'B5',
  Q:'C5',
  W:'D5',
  E:'E5',
  R:'F5',
  T:'G5',
  Y:'A6',
  U:'B6',
  I:'C6',
  O:'D6',
  P:'E6',
}
// TODO: Noise on SpaceBar
// TODO: Let user adjust ADSR
// TODO: Visual Component

let polySynth;
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
  };

  p.draw = () => {};
  p.keyTyped = () => {
    p.userStartAudio();
    polySynth.setADSR(0.01,0.1,1,0)
    polySynth.play(pianoRef[p.key.toUpperCase()], 1,0,0.2);
  }
};
new p5(soundProject);
