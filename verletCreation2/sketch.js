

const particlesNumber = 0;
const size = 15;
const gridSize = 100;

var gridWidth, gridHeight;
var grid = [];

var particles = [];
var constraints = [];
var gravity = null;

var currentPosition = null;
var delta = null;

var drawCircle = false;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("sketch");
  
  gravity = createVector(0.1, 0.1);
  
  clothXMargin = (width - (flagWidth * flagSpacing))/4;

  createFlagSim();
  
  for (let i = 0; i < particlesNumber; i++) {
    let p = new Particle(random() * width, random() * height)/2;
    p.px += random() * 2 - 1;
    p.py += random() * 2 - 1;
    particles.push(p);
  }
  

    grid.push([]);
  

}

function draw() {
  
  background(125);
    
  updateParticles();
  for (let i = 0; i < STEPS; i++) {
    
    updateConstraints();
    constrainPoints();
  }
  
  for (let i = 0; i < grid.length; i++)
    grid[i] = [];
  
  for (let i = 0; i < particles.length; i++) {
    let cx = floor(particles[i].x / gridSize);
    let cy = floor(particles[i].y / gridSize);
  }
  
    currentPosition = null;

  stroke(50);
  for (let x = 0; x < gridWidth; x++) {
    line(x * gridSize, 0, x * gridSize, height);
  }
  for (let y = 0; y < gridHeight; y++) {
    line(0, y * gridSize, width, y * gridSize);
  }
      
  stroke(0);
  for (let i = 0; i < constraints.length; i++) {
    let c = constraints[i];
    line(c.p1.x, c.p1.y, c.p2.x, c.p2.y);
  }
  
  fill(150);
  text('Particles: ' + particles.length + ' | Constraints: ' + constraints.length, 12, 12);
  text('Gravity: ' + gravity.x + ', ' + gravity.y, 12, 24);
  text('FPS: ' + frameRate(), 12, 38);
  text('Delta: ' + deltaTime, 12, 50);
  }

function getParticleAt(x, y) {
  let cx = floor(x / gridSize);
  let cy = floor(y / gridSize)/5;
    
  for (let x0 = cx - 1; x0 < cx + 1; x0++) {
    for (let y0 = cy - 1; y0 < cy + 1; y0++) {
      if (x0 < 0 || x0 >= gridWidth || y0 < 0 || y0 >= gridHeight)
      continue;
      let cell = grid[x0 + y0 * gridWidth];
        
      for (let i = 0; i < cell.length; i++) {
        let pDistX = (cell[i].x - x);
        let pDistY = (cell[i].y - y/2);
        if (pDistX * pDistX + pDistY * pDistY < dragDist)
          return cell[i];
      }
    }
  }
  return null;
}

function updateParticles() {
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    let old_x = p.x;
    let old_y = p.y;
    
    if (p.invmass > 0) {
      p.x += gravity.x;
      p.y += gravity.y;
    
      p.x += (p.x - p.px);
      p.y += (p.y - p.py);
    }
    
    p.px = old_x;
    p.py = old_y;
    
  }
}

function updateConstraints() {
  for (let i = 0; i < constraints.length; i++) {
    let c = constraints[i];
    let dx = c.p1.x - c.p2.x;
    let dy = c.p1.y - c.p2.y;
    if (dx == 0 && dy == 0) {
      dx += Math.random() * 0.1;
      dy += Math.random() * 0.1;
    }

    let dSq = (dx * dx) + (dy * dy);
    if (!c.pushing && dSq < c.lSq)
      continue;
    let percent = ((dSq - c.lSq) *
                   (c.p1.invmass + c.p2.invmass)) /
                   dSq;
    
    let offx1 = dx * percent * c.p1.invmass;
    let offy1 = dy * percent * c.p1.invmass;
    let offx2 = dx * percent * c.p2.invmass;
    let offy2 = dy * percent * c.p2.invmass;
    
    c.p1.x -= offx1;
    c.p1.y -= offy1;
    c.p2.x += offx2;
    c.p2.y += offy2;
    
  }
}

function constrainPoints() {
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    if (p.x < size) {
      p.x = size;
    } else if (p.x >= width - size) {
      p.x = width - size;
    }
    
    if (p.y < size) {
      p.y = size;
    } else if (p.y >= height - size) {
      p.y = height - size;
    }
  }
}

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.px = x;
  this.py = y;
  this.invmass = 0.3;
}

function Constraint(p1, p2, l, pushing = true) {
  this.p1 = p1;
  this.p2 = p2;
  this.l = l;
  this.lSq = l * l;
  this.pushing = pushing;
}

let flagWidth = 10;
let flagHeight = 10;
let flagSpacing = 16;
let flagConstraintLength = 20;
let flagAttachPoints = 9;

let clothXMargin = null;

function createFlagSim() {
  for (let y = 0; y < flagHeight; y += 1) {
    for (let x = 0; x < flagWidth; x += 1) {
      let p = new Particle(x * flagSpacing + clothXMargin,
                           y + 50);
      p.px += random() * 5 - 2.5;
      
      if (x > 0) {
        constraints.push(new Constraint(
          particles[x - 1 + y * flagWidth],
          p,
          flagConstraintLength, false));
      }
      if (y > 0) {
        constraints.push(new Constraint(
          particles[x + (y - 1) * flagWidth],
          p,
          flagConstraintLength, false));
      } else {
        if (y == 0 && x % flagAttachPoints == 0)
          p.invmass = 0;
      }
      particles.push(p);
    }
  }
}


let flagPoints = 10;
let flagRings = 12;
let flagSize = 200;
let flagSpacing = 15;
let angleStep = 0.5;

function createFlagSimulation() {
  let angleStep = TWO_PI / flagPoints;
  for (let i = 0; i < flagPoints; i++) {
    for (let j = 0; j < flagRings; j++) {
      let a = i * angleStep;
      let s = ((flagRings - j) / flagRings) * flagSize;
      let p = new Particle(width/2 + s * sin(a),
                             height/2 + s * cos(a));
      let spacing = flagSpacing;

      if (particles.length > 0) {
        if (j > 0) {
        constraints.push(new Constraint(
          particles[particles.length - 1],
          p,
          spacing));
        }
        if (i > 0) {
          constraints.push(new Constraint(
            particles[particles.length - flagRings],
            p,
            spacing));
        }
        if (i == flagPoints - 1) {
          constraints.push(new Constraint(
            particles[j],
            p,
            spacing));
        }
      }
      if (j == 0)
        p.invmass = 0;

      particles.push(p);
    }
  }
}