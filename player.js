class Player {
  constructor(ctx) {
    this.ctx = ctx

    this.x = 450
    this.y = 250
    this.w = 50
    this.h = 95

    this.vx = 0
    this.vy = 0
    this.speed = 7
        
    this.bodyAnim = new Image ()
    this.bodyAnim.src = IMAGE_URL.bodyanim
    this.bodyAnim.frames = 8
    this.bodyAnim.frameIndex = 0
    this.tick = 0

    this.tearSound = new Audio(AUDIO_URL.tearSound)
    this.tearSound.load()
    this.gruntSound = new Audio(AUDIO_URL.gruntSound)
    this.gruntSound.load()
    this.healthSound = new Audio(AUDIO_URL.healthSound)
    this.healthSound.load()

    this.canShoot = true;
    this.bullets = []
    this.timerTilNextBullet = 0;

    this.hp = 5
    this.dmg = 0.5
    this.alive = true
  }

    draw() {
			this.ctx.drawImage(
        this.bodyAnim,
        this.bodyAnim.frameIndex * this.bodyAnim.width / this.bodyAnim.frames,
        0,
        this.bodyAnim.width / this.bodyAnim.frames,
        this.bodyAnim.height,
        this.x,
        this.y,
        this.w,
        this.h
      )
      this.animate() 
        
      this.bullets.forEach(b => b.draw())
    }

    animate() {
      this.tick++

      if (this.tick > 15) {
        this.tick = 0
        this.bodyAnim.frameIndex++

        if (this.bodyAnim.frameIndex > this.bodyAnim.frames - 1) {
            this.bodyAnim.frameIndex = 0
        }
      }
    }

    move() {
      this.x += this.vx * this.speed
      this.y += this.vy * this.speed

      if (this.x > FLOOR.right) {
        this.x = FLOOR.right;
      } else if (this.x <= FLOOR.left) {
        this.x = FLOOR.left;
      }

      if (this.y > FLOOR.down) {
         this.y = FLOOR.down;
      } else if (this.y <= FLOOR.up) {
        this.y = FLOOR.up;
      }
      this.bullets.forEach(b => b.move())
    }

    getDmg() {
      (console.log('player get dmg'))
			this.hp = this.hp - 0.05
      this.gruntSound.play()
      if (this.hp <= 0) {
        this.alive = false
      }
    }

    getHealth() {
    	console.log('player get hp')
      this.hp += 1
      this.healthSound.play()
      if (this.hp > 5) {
        this.hp = 5
      }
    }

    shootRight() {
      const bulletX = this.x + this.w
      const bulletY = this.y + this.h / 2
      const bullet = new Bullet (this.ctx, bulletX, bulletY, BULLETSPEED, BULLETDMG, BULLETDELAY)  //fix delay and collisions and range
      bullet.direction.right = true
      this.tearSound.play()
      if(this.timerTilNextBullet <= 0) {
        this.bullets.push(bullet) 
        this.timerTilNextBullet = BULLETDELAY; 
      }
      this.timerTilNextBullet--;
    }

    shootLeft() {
      const bulletX = this.x
      const bulletY = this.y + this.h / 2
      const bullet = new Bullet(this.ctx, bulletX, bulletY, BULLETSPEED, BULLETDMG) 
      bullet.direction.left = true
      this.tearSound.play()
      if(this.timerTilNextBullet <= 0) {
        this.bullets.push(bullet) 
        this.timerTilNextBullet = BULLETDELAY; 
      }
      this.timerTilNextBullet--;
    }

    shootUp() {
      const bulletX = this.x + this.w / 2
      const bulletY = this.y
      const bullet = new Bullet(this.ctx, bulletX, bulletY, BULLETSPEED, BULLETDMG)
      bullet.direction.up = true 
      this.tearSound.play()
      if(this.timerTilNextBullet <= 0) {
        this.bullets.push(bullet) 
        this.timerTilNextBullet = BULLETDELAY; 
      }
      this.timerTilNextBullet--;
    }

    shootDown() {
      const bulletX = this.x + this.w / 2
      const bulletY = this.y + this.h
      const bullet = new Bullet(this.ctx, bulletX, bulletY, BULLETSPEED, BULLETDMG) 
      bullet.direction.down = true
      this.tearSound.play()
      if(this.timerTilNextBullet <= 0) {
        this.bullets.push(bullet) 
        this.timerTilNextBullet = BULLETDELAY; 
      }
      this.timerTilNextBullet--;
    }

    onKeyDown(key) {
      if (key === UP) {
        if (this.vy > -this.speed) {
          this.vy --;
        }
      }

      if (key === DOWN) {
        if (this.vy < this.speed) {
            this.vy ++;
        }
      }

      if (key === RIGHT) {
        if (this.vx < this.speed) {
            this.vx ++;
        }
      }

      if (key === LEFT) {
        if (this.vx > -this.speed) {
          this.vx --;
        }
      }

    	switch(key) {
        case SHOOTUP:
          this.shootUp();
          break;
        case SHOOTDOWN:
          this.shootDown();
          break;
        case SHOOTRIGHT:
          this.shootRight();
            break;
        case SHOOTLEFT:
            this.shootLeft();
            break;
        }
    }

    onKeyUp(key) {
      if (key === RIGHT || key === LEFT) {
        this.vx = 0;
      } else if (key === UP || key === DOWN) {
        this.vy = 0;
      }

      switch(key) {
        case SHOOTUP:
          false
          break;
        case SHOOTDOWN:
          false
          break;
        case SHOOTRIGHT:
          false
          break;
        case SHOOTLEFT:
          false
          break;
      }
    }
        
    clearBullets() {
        this.bullets = this.bullets.filter(b => b.isVisible())
    }
  
}