PVector speed, position;
color colorOfBall = color(255,0,0);

void setup(){
  size(500,500);
  speed = new PVector(4,2);
  position = new PVector(100,100);
}

void draw(){
  position.x = position.x + speed.x;
  position.y = position.y + speed.y;
  
  //side walls
  if((position.x > width) || (position.x < 0))
  {
    speed.x = speed.x * -1;
  }
  //floor and ceiling
  if((position.y > height) || (position.y < 0))
  {
    speed.y = speed.y * -1;
  }
  
  background(255);
  fill(colorOfBall);
  ellipse(position.x, position.y - 25, 50, 50);
}

void keyPressed(){
  if(key == ' ')
  {
    colorOfBall = color(0,26,255);
  }
}
