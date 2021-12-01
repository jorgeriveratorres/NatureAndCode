import processing.core.*;

public class assignment1_step3_javaMode extends PApplet {

  particles p;
  
public void setup(){
  
  p = new particles(new PVector(width/2,20));
}

public void settings(){
  size(500,500);

}

public void draw(){
  p.run();
  p.display();
}
