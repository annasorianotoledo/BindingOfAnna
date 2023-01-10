class Game {
  constructor(ctx) {
    this.ctx = ctx

    this.interval = null
    this.bg = new Background(ctx)
    this.player = new Player(ctx)
    this.enemies = [] 
    this.flies = []
    this.hearts = []
    this.coins = []
    this.level = 1
    this.timer = 0
    this.isPlaying = false
    this.number = 1
    this.randomNumber = null
    this.coinCounter = 0
    this.currentWave = 0
    this.color = 'white'
    this.timerTilNextDmg = 0;

    this.fullHp = new Image()
		this.fullHp.src = IMAGE_URL.fullHp
		this.halfHp = new Image()
		this.halfHp.src = IMAGE_URL.halfHp
    this.shop = new Image()
		this.shop.src = IMAGE_URL.shop
    this.waves = new Image ()
    this.waves.src = IMAGE_URL.waves

    this.coinSound = new Audio(AUDIO_URL.coinSound)
    this.coinSound.load();
    this.deathSound = new Audio(AUDIO_URL.deathSound)
    this.deathSound.load();
    this.gameSound = new Audio(AUDIO_URL.gameSound)
    this.gameSound.loop = true
    this.gameSound.volume = 0.1
}

	start() {
    this.toggleScreen('start-screen', false)
    this.toggleScreen('canvas', true)
  	this.initListeners()
    this.gameSound.load()
    this.gameSound.play()
  	this.interval = setInterval(() =>{
      this.timer++
      this.clear()
    	this.draw()
    	this.checkBulletCollisions()
    	this.checkEnemyCollisions()
    	if (this.player.alive === false) {
      	this.gameOver()
    	}
      this.addEnemies()
      this.checkItemsCollisions()
    	this.clearEnemies()
      this.clearItems()
    	this.move()
      if (this.checkLevel()) {
        this.level++
        this.isPlaying = false
      }
    }, 1000 / 60)
  }


  toggleScreen(id, toggle) {
    let element = document.getElementById(id);
    let display = (toggle) ? 'block' : 'none'
    element.style.display = display;
  }

  initListeners() {
    document.addEventListener("keydown", (e) => {
        this.player.onKeyDown(e.keyCode)
        console.log(e.keyCode)
    });

    document.addEventListener("keyup", (e) => {
        this.player.onKeyUp(e.keyCode)
    });
  }

  addEnemies() {
    
    if (!this.isPlaying) {
      for (let i = 1; i < this.level; i++) {
        this.currentWave = i;
        this.enemies.push(new Enemy(this.ctx))
        this.enemies.push(new Enemy(this.ctx))
        this.flies.push(new Fly(this.ctx))
      }
      this.isPlaying = true
    }
  }

  checkLevel() {
    return !this.enemies.length && !this.flies.length
  }


  draw() {
    this.bg.draw()
    this.player.draw()

    this.enemies.forEach(enemy => enemy.draw())
    this.flies.forEach(fly => fly.draw())
		this.hearts.forEach(heart => heart.draw())
    this.coins.forEach(coin => coin.draw())

    this.ctx.font = "35px upheaval";
    this.ctx.textAlign = "justify"
    this.ctx.fillText(
      `Wave: ${this.currentWave}`,
      440,
      70
      );
		this.ctx.fillText(
      `Coins: ${this.coinCounter}`, 
      740, 
      70);
    
    this.ctx.drawImage(this.waves, 380, 35, 50, 50);
    this.ctx.drawImage(this.shop, 680, 40, 40, 40);

      for (let i = 0; i < this.player.hp; i++) {
        this.ctx.drawImage(this.fullHp, i * SPACING, 0)
      }
  }

  move() {
    this.player.move()
    this.enemies.forEach(e => e.move(this.player))
		this.flies.forEach(f =>f.move())
  }

  clear() {
    this.ctx.clearRect(
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height,
    )
    this.player.clearBullets()
  }

  clearEnemies() {
    this.enemies = this.enemies.filter(e => {
			if (e.alive) {
				return true
			}

      this.randomNumber = Math.floor(Math.random() * 3)
      if (this.number === this.randomNumber) {
			  this.hearts.push(new Heart(this.ctx, e.x, e.y, this.timer))
      }

			return false
		})

    this.flies = this.flies.filter(f => {
			if (f.alive) {
				return true
			}

			this.coins.push(
				new Coin(this.ctx, f.x, f.y, this.timer)
			)

			return false
		})
  }

  clearItems() {
    this.hearts = this.hearts.filter(heart => !heart.taken && this.timer <= heart.creationTime + ITEM_DURATION_USABLE);
    this.coins = this.coins.filter(coin => !coin.taken && this.timer <= coin.creationTime + ITEM_DURATION_USABLE);
  }


  checkBulletCollisions() {
    this.player.bullets.forEach(b => {
      this.enemies.forEach(e => {
        const colX = (e.x + e.w) >= b.x && (b.x + b.w) >= e.x
        const colY = (b.y + b.h) >= e.y && b.y <= (e.y + e.h)

        if (colX && colY) {
            e.getDmg()
            b.hasImpact = true;  
        }
       })     
     })
    
    this.player.bullets.forEach(b => {
      this.flies.forEach(f => {
        const colX = (f.x + f.w) >= b.x && (b.x + b.w) >= f.x
        const colY = (b.y + b.h) >= f.y && b.y <= (f.y + f.h)

        if (colX && colY) {
            f.getDmg()
            b.hasImpact = true;  
        }
       })     
     })
  }

  checkEnemyCollisions () {
    this.enemies.forEach(e => {
      const colX = (this.player.x + this.player.w) >= e.x && (e.x + e.w) >= this.player.x
      const colY = (e.y + e.h) >= this.player.y && e.y <= (this.player.y + this.player.h)

      if (colX && colY && this.timerTilNextDmg <= 0) {
        this.player.getDmg()
        this.timerTilNextDmg = DMGDELAY
      }
      this.timerTilNextDmg--;
  	})

    this.flies.forEach(f => {
      const colX = (this.player.x + this.player.w) >= f.x && (f.x + f.w) >= this.player.x
      const colY = (f.y + f.h) >= this.player.y && f.y <= (this.player.y + this.player.h)

      if (colX && colY && this.timerTilNextDmg <= 0) {
        this.player.getDmg()
        this.timerTilNextDmg = DMGDELAY
      }
      this.timerTilNextDmg--;
  	})
  }  

  checkItemsCollisions () {
    this.hearts.forEach(heart => {
      const colX = (this.player.x + this.player.w) >= heart.x && (heart.x + heart.w) >= this.player.x
      const colY = (heart.y + heart.h) >= this.player.y && heart.y <= (this.player.y + this.player.h)
      
      if (colX && colY) {
        this.player.getHealth()
        heart.taken = true
      }
    }) 

    this.coins.forEach(coin => {
      const colX = (this.player.x + this.player.w) >= coin.x && (coin.x + coin.w) >= this.player.x
      const colY = (coin.y + coin.h) >= this.player.y && coin.y <= (this.player.y + this.player.h)
      
      if (colX && colY) {
        this.coinSound.play()
        this.coinCounter++
        coin.taken = true
      }
    }) 
  }


  gameOver() {
    this.gameSound.pause()
    this.deathSound.play()
    clearInterval(this.interval)

    this.ctx.font = "50px upheaval";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
      );
  }  

}
