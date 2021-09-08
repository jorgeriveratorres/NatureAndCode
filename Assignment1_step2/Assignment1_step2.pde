
    float gravity = 0.05;
    
    particleGenerator p;
    
    void setup() {
      size(1000,800,P2D);
      p = new particleGenerator();
    }
    
    void draw() {
      
      fill(0,60);
      rect(-1,-1,width+2,height+2);
      p.run();
    }
