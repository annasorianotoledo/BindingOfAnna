class Coin {
  constructor(ctx, positionx, positiony, creationTime){
    this.ctx = ctx
    this.x = positionx
    this.y = positiony

    this.w = 40
    this.h = 40
    this.taken = false

    this.creationTime = creationTime

    this.img = new Image()
    this.img.src = IMAGE_URL.coin
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
  }

}