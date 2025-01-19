// GLSL Shader that emulates a CRT and Day/Night cycles.
let customShader;
// Where we are writing the sketch to, before applying the shader
let texBuffer;
// Global variables to track the canvas height.
let cHeight
let cWidth
const sketch2 = (pInst) => {
  let canvasContainerB;

  pInst.setup = () => {
    canvasContainerB = $("#canvas-container2");
    let canvas = pInst.createCanvas(
        canvasContainerB.width(),
        canvasContainerB.height(),
        pInst.WEBGL
    );
    // Created to help with buffer drawing.
    cHeight = canvas.height
    cWidth = canvas.width
    canvas.parent("canvas-container2")

    // Create a buffer to write the sketch to, so the shader doesn't interrupt the pipeline.
    texBuffer = pInst.createGraphics(pInst.width, pInst.height, pInst.WEBGL);

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
      vec4 texColor = texture2D(uTexture, uv);

      // Apply alternating darkened stripes based on fragment's y-coordinate
      if (mod(gl_FragCoord.y, 2.0) < 1.0) {
        texColor.rgb *= 0.5; // Darken the stripes by 50%
      } else {
        texColor.rgb *= 1.1 * 2.0*sin(4.0*uTime); // Lighten the other stripes
      }

      gl_FragColor = texColor; // Corrected syntax (use gl_FragColor)
    }
    `;

    // Create shader and check if it's valid
    customShader = pInst.createShader(vertShader, fragShader);

    pInst.angleMode(pInst.DEGREES);
  };

  // Draws the sketch to the buffer
  // Lots of refactoring because shaders use the center of the image as the origin, and not the 
    // top left corner like p5.js does.
    // I tried working with GPT, but eventually ended up using p5's sketch editor to figure out the 
      // proper way to draw to the buffer.
      // My convo: https://chatgpt.com/share/678d860b-37c0-800b-9c73-6992eef14c50
      // even after trying GPT's refactor of my code, it still didn't work until I tweaked it
      // in the sketch editor.
  function drawSketch1(buf) {
    let originH = cHeight/2;
    let originW = -cWidth/2;
    buf.push();  

    buf.background(50, 50, 160); // Sky color
    let horizonHeight = originH - (3*(cHeight/4))

    // Ground
    buf.fill(79, 55, 0);
    buf.quad(originW, originH - cHeight, originW, horizonHeight, cWidth/2,horizonHeight,cWidth/2,originH - cHeight);

    // Sun
    buf.fill(170, 170, 0);
    let sunSize = 150;
    buf.ellipse(originW + sunSize,originH-sunSize, sunSize, sunSize);

    // Sunflower stem
    let stemThickness = 25;
    let stemHeight = 120;
    buf.fill(0, 100, 0);
    buf.quad(
      -stemThickness / 2,
      horizonHeight + stemHeight,
      stemThickness / 2,
      horizonHeight + stemHeight,
     stemThickness / 2,
      horizonHeight,
     -stemThickness / 2,
      horizonHeight
    );

    // Sunflower petals and face
    let petalSize = 30;
    let numPetals = 12;
    let faceX =0;
    let faceY = horizonHeight + stemHeight ; // Adjust face position
    let faceSize = 75
    buf.fill(200, 200, 0);
    for (let i = 0; i < 360; i += 360 / numPetals) {
      buf.push();
      buf.translate(faceX, faceY+faceSize/2);
      buf.rotate(i);
      buf.quad(
        0,
        0,
        petalSize / 2,
        petalSize,
        0,
        petalSize * 2,
        -petalSize / 2,
        petalSize
      );
      buf.pop();
    }

    // Draw face on top of petals
    buf.fill(100, 100, 0);
    buf.ellipse(faceX,faceY+faceSize/2, faceSize, faceSize);

    buf.pop();  
  }

  pInst.draw = () => {
    texBuffer.push();
    texBuffer.clear();
    drawSketch1(texBuffer);  // Draw the sketch to the buffer
    texBuffer.pop();

    // Use the custom shader
    pInst.shader(customShader);

    // Set uniforms for the shader
    customShader.setUniform('uResolution', [pInst.width, pInst.height]);
    customShader.setUniform('uTime', pInst.millis() / 1000.0);
    customShader.setUniform('uTexture', texBuffer);

    // Clear the main canvas before drawing the texture
    pInst.clear();

    // Draw the texture on the canvas
    pInst.push();
    pInst.translate(pInst.width / 2, pInst.height / 2);  // Move the origin to the center of the canvas
    pInst.image(texBuffer, -pInst.width / 2, -pInst.height / 2, pInst.width, pInst.height);  // Draw texture centered and scaled
    pInst.pop();
  };
};

new p5(sketch2);

