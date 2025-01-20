// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Starting with the following code.
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_3_0_01
// P_3_0_01
//
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
var font = "sans-serif";
var letter = "A";
let size = 24;
let sizeDelta = 50;
let defaultSize = size;
let letterArr = []
const ALPHABET_SIZE = 26;
let interSketch = (p) => {
  p.setup = () => {
    p.canvasContainer = $("#canvas-container3");
    let canvas = p.createCanvas(
      p.canvasContainer.width(),
      p.canvasContainer.height()
    );
    canvas.parent("canvas-container3");
    p.background(255);
    p.fill(0);

    p.textFont(font);
    p.textAlign(p.CENTER, p.CENTER);

    for(let i = 0; i < ALPHABET_SIZE;i++)
    {
      p.append(letterArr,0);
    }
  };
  // Learned about unchar from p5 docs
  p.keyTyped = () => {
    letterArr[p.unchar(p.key)%26]+=sizeDelta;
    letter = p.key;
    size = letterArr[p.unchar(p.key)%26] + defaultSize;

    let colorSaturation = p.unchar(p.key) % 255
    p.clear();
    p.textSize(size);
    p.text(letter, p.width / 2, p.height / 2);
    p.fill(colorSaturation*p.random(),colorSaturation *p.random(), colorSaturation*p.random());
  };
};
new p5(interSketch);

// Integrate: Color based on keycode and modulus
// Innovate: Arrays to increment size of each letter based on amount of keystrokes