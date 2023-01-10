class Enemy {
  constructor(ctx) {
    this.ctx = ctx
    this.x = Math.floor(Math.random() * (FLOOR.right - FLOOR.left) + 60)
    this.y = Math.floor(Math.random() * (FLOOR.down - FLOOR.up) + 60)
    this.w = 66
    this.h = 45
    this.vx = Math.random() * 1
    this.vy = Math.random() * 1

    this.hp = 2
    this.dmg = 0.05
    this.alive = true
    
		this.img = new Image()
    this.img.src = IMAGE_URL.enemy
    this.img.frames = 4
    this.img.frameIndex = 0
    this.tick = 0
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
      )
      this.animate()
    }

    animate() {
        this.tick++

        if (this.tick > 15) {
          this.tick = 0
          this.img.frameIndex++

          if (this.img.frameIndex > this.img.frames - 1) {
            this.img.frameIndex = 0
          }
        }
    }

    move(player) {
			if (player.x >= this.x) {
        this.x += this.vx
      } else {
          this.x -= this.vx
      }

      if (player.y >= this.y) {
        this.y += this.vy
      } else {
        this.y -= this.vy
      }

      if (this.x > FLOOR.right) {
        this.x = FLOOR.right;
      } else if (this.x < FLOOR.left) {
        this.x = FLOOR.left;
      }

      if (this.y > FLOOR.down) {
        this.y = FLOOR.down;
      } else if (this.y < FLOOR.enemyUp) {
        this.y = FLOOR.enemyUp;
      }
    }

    getDmg() {
      this.hp = this.hp - 0.5
      if (this.hp <= 0) {
        this.alive = false
      }
    }

}
