// sketch2.js - A program that lets you layer many captivating grayscale patterns.
// Author: Jack Sims
// Date: Jan 19, 2025

// Starting with the following code:

// http://www.generative-gestaltung.de/2/sketches/?02_M/M_1_3_02


// M_1_3_02
//
// Generative Gestaltung ñ Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groﬂ, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License

const SHOCKWAVES = 0;
const HEARTBEAT = 1;
const GRIDWORK = 2;
let curr_state = 0;

function onBorder(x, y, p) {
  if (x == 0 || y == 0 || x == p.width - 1 || y == p.height - 1) return 0;
  return 1;
}

var actRandomSeed = 0;
function drawNoise(p) {
  p.randomSeed(actRandomSeed);
  for (var x = 0; x < p.width; x++) {
    for (var y = 0; y < p.height; y++) {
      switch (curr_state) {
        case SHOCKWAVES:
          p.set(x, y, p.dist(x, y, p.mouseX, p.mouseY) % 255);
          break;
        case HEARTBEAT:
          p.set(x * p.sin(x), y, p.dist(x, y, p.mouseX, p.mouseY) % 255);
          break;
        case GRIDWORK:
          p.set(
            x * p.sin(x),
            y * p.cos(y),
            p.dist(x, y, p.mouseX, p.mouseY) % 255
          );
          break;
      }
    }
  }
}
let animSketch = (p) => {
  p.setup = function () {
    p.canvasContainer = $("#canvas-container2");
    let canvas = p.createCanvas(
      p.canvasContainer.width(),
      p.canvasContainer.height()
    );
    canvas.parent("canvas-container2");
    drawNoise(p);
  };
  p.draw = function () {
    p.background(0);
    p.updatePixels();
  };
  p.mousePressed = function () {
    actRandomSeed = p.random(100000);
    drawNoise(p);
  };
  p.keyPressed = () => {
    let letter = p.key
    if (letter == "a") {
      curr_state = SHOCKWAVES;
    } else if (letter == "s") {
      curr_state = HEARTBEAT;
    } else if (letter == "d") {
      curr_state = GRIDWORK;
    }
  };
};

new p5(animSketch);

// Integrate: Shockwaves
// Innovate: Heartbeat, Gridwork pattern, layering, user input.
