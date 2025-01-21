// sketch.js - A showcase of shader code working in p5, and mouse based color calculations.
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

// This strategy I am using, encapsulating the sketches to be callbacks for the p5 function, was 
  // recommended to me in a conversation with chatGPT on how to get all three sketches in one nice window.
  // convo link: https://chatgpt.com/share/67883518-2834-800b-8b1a-d8fff46f1535
// ChatGPT Conversations used:
// Link to my conversation about getting started with shaders in p5, which I still used parts of in this code after switching my project to something new.
// convo link: https://chatgpt.com/share/67895379-6a94-800b-825a-529d649e340e
// Link to conversation about using a texture buffer: https://chatgpt.com/share/678f0209-6420-800b-8d0b-21f027197661
// Link to debugging I was doing in the project before switching over: https://chatgpt.com/share/678d860b-37c0-800b-9c73-6992eef14c50
let tex;
let vecAnim = (p) => {
  p.setup = () => {
    p.canvasContainer = $("#canvas-container");
    let canvas = p.createCanvas(
      p.canvasContainer.width(),
      p.canvasContainer.height(),
      p.WEBGL
    );
    canvas.parent("canvas-container");
    // Create a buffer to write the sketch to, so the shader doesn't interrupt the pipeline.
    tex = p.createGraphics(p.width, p.height, p.WEBGL);
    
    // Vertex shader
    const vertShader = `
    attribute vec3 aPosition;

    void main() {
      gl_Position = vec4(aPosition, 1.0);
    }
    `;

    // Fragment shader with alternating darkened stripes
    const fragShader = `
    precision mediump float;
    uniform vec2 uResolution;
    uniform float uTime;
    uniform sampler2D uTexture;

    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution;
      uv.x += mod(uv.y,0.5) * sin(uTime);
      vec4 texColor = texture2D(uTexture, uv);
      gl_FragColor = texColor; // Corrected syntax (use gl_FragColor)
    }
    `;

    // Create shader and check if it's valid
    customShader = p.createShader(vertShader, fragShader);

    p.strokeCap(p.SQUARE);
  };

  p.draw = () => {
    tex.background(255);
    // 0,0 is the center because we are in WEBGL.
    tex.translate(0, 0);

    var circleResolution = p.int(p.map(p.mouseY, 0, p.height, 2, 80));
    var radius = p.mouseX - p.width / 2;
    var angle = p.TAU / circleResolution;

    tex.strokeWeight(p.mouseY / 20);

    for (var i = 0; i <= circleResolution; i++) {
      let randR = p.random(0, 255);
      let randG = p.random(0, 255);
      let randB = p.random(0, 255);
      let mouseR = p.mouseX % 255;
      let mouseG = p.mouseY % 255;
      let mouseB = p.mouseX % 255;
      tex.stroke(mouseR, mouseG, mouseB);
      var x = p.cos(angle * i) * radius;
      var y = p.sin(angle * i) * radius;
      tex.line(0, 0, x, y);
    }
    p.shader(customShader);
    // Set uniforms for the shader
    customShader.setUniform("uResolution", [p.width, p.height]);
    customShader.setUniform("uTime", p.millis() / 1000.0);
    customShader.setUniform("uTexture", tex);
    p.image(tex, -p.width / 2, -p.height / 2, p.width, p.height); 
  };
};
new p5(vecAnim);

// Integrate: Color based on mouse position
// Innovate: Shader.
