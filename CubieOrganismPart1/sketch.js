
let bounds; // vector-+++++++++++
let verletBox;

function setup() {
    createCanvas(800, 800, WEBGL);
    bounds = createVector(400, 400, 300);
    verletBox = new VerletBox(createVector(0, 0, 0), 80, .001, color(100, 155, 25));
    verletBox.nudge(1, createVector(10.01, 25.02, 30.03));
    verletBox.setStyles(8, color(random(250), 15, random(250)), 1, color(20, 20, 200));
}

function draw() {
    background(255);

    ambientLight(1000);
    directionalLight(255, 0, 0, 0.25, 0.25, 0);
    pointLight(0, 0, 255, mouseX, mouseY, 250);

    rotateX(frameCount*PI/1000);
    rotateY(frameCount*PI/1000);
    drawBounds();
    
   // specularMaterial(250);
    verletBox.verlet();
    verletBox.draw();
    verletBox.boundsCollide(bounds);
}

// NOTE: Needs to be a cube 
function drawBounds() {
    noFill();
    stroke(0, 0, 255, 5);
    box(bounds.x, bounds.y, bounds.z)
}