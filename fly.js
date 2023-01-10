class Fly {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = Math.floor(Math.random() * (FLOOR.right - FLOOR.left) + 100);
    this.y = Math.floor(Math.random() * (FLOOR.down - FLOOR.up) + 100);
    this.w = 35;
    this.h = 35;
       
    this.vy = 1;
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.1;

    this.hp = 3;
    this.dmg = 0.05;
    this.alive = true;
       

    this.img = new Image();
    this.img.src = IMAGE_URL.fly;
    this.img.frames = 4;
    this.img.frameIndex = 0;
    this.tick = 0;
  }

  draw() {
    this.ctx.drawImage(
    this.img,
    this.img.frameIndex * this.img.width / this.img.frames,
    0,
    this.img.width / this.img.frames,
    this.img.height,
    this.x,
    this.y,
    this.w,
    this.h
    );
    this.animate();
  }
    
  animate() {
    this.tick++;

    if (this.tick > 15) {
      this.tick = 0;
      this.img.frameIndex++;

      if (this.img.frameIndex > this.img.frames - 1) {
        this.img.frameIndex = 0;
      }
    }
  }

  move() {
    this.y += 1 * Math.sin(this.angle);
    this.angle += this.angleSpeed;
        
    this.y < FLOOR.down && this.y > FLOOR.up;
   

    if (this.y < FLOOR.up) { 
      this.y = FLOOR.up;
    } else if (this.y > FLOOR.down) { 
      this.y = FLOOR.down;
    }
  }

  getDmg() {
    this.hp -= 0.5;
    if(this.hp <= 0) {
    	this.alive = false;
    }
  }
}