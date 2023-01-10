class Bullet {
  constructor(ctx, x, y, speed, dmg, delay) {
    this.ctx = ctx

    this.direction = {
      left: false,
      right: false,
      up: false,
      down: false
    }

    this.origin = {
      x: x,
      y: y
    }

    this.x = x
    this.y = y
    this.w = 20
    this.h = 20
    this.speed = BULLETSPEED
    this.dmg = BULLETDMG
    this.delay = BULLETDELAY
    this.vx = 15
    this.vy = 15

    this.hasImpact = false

    this.img = new Image()
    this.img.src = 'sprites/bullet.png'
  }

  	draw() {
      this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
  	}

    move() {
			if (this.direction.right) { 
        this.x += this.vx
      }
      if (this.direction.left) {
        this.x -= this.vx
      }
      if (this.direction.up) {
        this.y -= this.vy
      }
      if (this.direction.down) {
        this.y += this.vy
      }
    }

    isVisible() {
       return this.x + this.w <= this.ctx.canvas.width && this.x + this.w >= 0 && this.y + this.h <= this.ctx.canvas.height && this.y + this.h >= FLOOR.up && !this.hasImpact
		} 

}