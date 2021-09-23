var shootingStar = [];

let x;
let y;
let xOff;
let yOff;
let positionX = 30;
let positionY = 300;
let starWidth = 50;
let starLength = 20;
let speed = 0.5;
let targetX = 200;
let targetY = 200;

function setup() {
   createCanvas(1000,800);
   strokeWeight(8);
}

function draw() {
  count += 1;
  background(25);

  targetX = targetX * speed + 0.1 * mouseX;
  targetY = targetY * speed + 0.1 * mouseY;

  if (frameCount == 1){
    createForce();
  }else{
    updateStar();
  }

  drawStar();
}

function drawStar(){
  for(i = 0; i < shootingStar.length; i++){
    let colorA = color(247,107,28);
    let colorB = color(250,217,97);
    fill(lerpColor(colorA, colorB, i / (shootingStar.length)));
    shootingStar[i].render();
  }
}

function createForce(){
  for(i = 0; i < starLength; i++){
    this.newForce = new shootingStarLink(postionX, postionY);
    shootingStar.push(this.newForce);
  }
}

function updateForce(){
  this.mouseToShootingStarX = targetX - positionX;
  this.mouseToShootingStarY = targetY - positionY;

  this.pastXpositon = contrain(positionX, 0 + starWidth / 2 + 8, width - starWidth / 2 - 8);
  this.pastYposition = min(positionY, height - starWidth / 2 - 12);

  this.newForce = new shootingStarLink(positionX, positionY);

  shootingStar.push(this.newForce);

  shootingStar.shift();

  positionX = constrain(map(this.mouseToShootingStarX, 0, width, this.pastXpositon, this.pastXpositon + starWidth /2), starWidth/2, width - (starWidth / 2));
  positionY = constrain(map(this.mouseToShootingStarX, 0, width, this.pastYpositon, this.pastYpositon + starWidth /2), starWidth/2, height - (starWidth / 2));
}

function shootingStarLink(){
  this.x = posX;
  this.y = posY;

  this.render = function() {
    ellipse(this.x, this.y, starWidth, starWidth);
  }
}
