
particles p;

void setup(){
  size(500,500);
  p = new particles(new PVector(width/2,20));
}

void draw(){
  p.run();
  p.display();
}
