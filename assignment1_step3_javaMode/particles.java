import processing.core.*;

class particles {
  
  PApplet pApp;
  PVector location;
  PVector velocity;
  PVector acceleration;
  color colorOfBall = color(random(255),random(255),random(255));
  float disTime = 1000;
  
  particles(PVector location){
    this.pApp = pApp;
    this.acceleration = new PVector(0, 0.05);
    this.velocity = new PVector(4,2);
    this.location = location;
  }
 
  void display(){
    
    stroke(0, disTime);
    background(255);
    fill(colorOfBall, disTime);
    ellipse(location.x, location.y - 25, 50, 50);
    
  }
  
  void run(){
    velocity.add(acceleration);
    location.add(velocity);
    disTime -= 2;
    //side walls
    if((location.x>width) || (location.x < 0))
    {
      velocity.x = velocity.x * -1;
    }
    
    if((location.y > height) || (location.y < 0))
    {
      velocity.y = velocity.y * -1;
    }
    
    
}

}
