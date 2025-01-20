// sketch.js - Vector Art
// Author: Jack Sims
// Date: Jan 19, 2025
// P_2_0_01

// Starting with this original code.
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_2_0_01
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
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
// limitations under the License.

let vecAnim = (p) => {
p.setup = () => {
  p.canvasContainer = $("#canvas-container");
  let canvas = p.createCanvas(p.canvasContainer.width(), p.canvasContainer.height());
  canvas.parent("canvas-container");
  p.strokeCap(p.SQUARE);
}

p.draw = () => {
    p.background(255);
    p.translate(p.width / 2, p.height / 2);

    var circleResolution = p.int(p.map(p.mouseY, 0, p.height, 2, 80));
    var radius = p.mouseX - p.width / 2;
    var angle = p.TAU / circleResolution;

    p.strokeWeight(p.mouseY / 20);

    for (var i = 0; i <= circleResolution; i++) {
      var x = p.cos(angle * i) * radius;
      var y = p.sin(angle * i) * radius;
      p.line(0, 0, x, y);
    }
  }
};
new p5(vecAnim);