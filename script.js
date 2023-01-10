const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const game = new Game(ctx)


window.onload = function() {
}

function startGame() {
  game.start()
}

