let position; //vector
let starWidth = 45 
let acceleration; //vector
let delta; //vector
let springing = 0.05;
let damping = 0.9;

let starX = [0,0,0,0,0];
let starY = [0,0,0,0,0];
let cornerX = [0,0,0,0,0];
let cornerY = [0,0,0,0,0];
let angle = [0,0,0,0,0];
let count = [0,0,0,0,0];

function setup() {

  createCanvas(800, 500);

  position = createVector(0,0);
  acceleration = createVector(0,0);
  delta = createVector(0,0);

  for (let i = 0; i < 5; i++){
    count[i] = random(5, 12);
  }
  noStroke();
  frameRate(40);
}

function draw() {
  fill(100);
  rect(0, 0, width, height);
  drawStar();
  moveStar();
}

function drawStar() {
  for (let i = 0; i < 5; i++){
    cornerX[i] = position.x + cos(radians(72)) * starWidth;
    cornerY[i] = position.y + sin(radians(72)) * starWidth; 
  }
  fill(255,255,255);
  beginShape();
  for (let i = 0; i < 5; i++){
    curveVertex(cornerX[i],cornerY[i]);
  }
  for (let i = 0; i < 4; i++){
    curveVertex(cornerX[i], cornerY[i]);
  }
  endShape(CLOSE);
}

function moveStar() {

  delta.x = mouseX - position.x;
  delta.y = mouseY - position.y;

  delta.x *= springing;
  delta.y *= springing;
  acceleration.x += delta.x;
  acceleration.y += delta.y;

  position.x += acceleration.x;
  position.y += acceleration.y;

  acceleration.x *= damping;
  acceleration.y *= damping;
}
