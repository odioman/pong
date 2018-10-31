var game, canvas, ctx, soundLeft, soundRight, soundWall, gameTimeLast;

function init() {
canvas = document.getElementById("gameCanvas");
ctx = canvas.getContext("2d");
soundLeft = document.getElementById("bounceLeft");
soundRight = document.getElementById("bounceRight");
soundWall = document.getElementById("bounceWall");
game = {
  player : {
    y : canvas.height / 2,
    score: 0
  },
  computer : {
    y : canvas.height / 2,
    score: 0,
    speed: 2
  },
  ball: {
    x : canvas.width / 2,
    y : canvas.height / 2,
    vx : Math.round(Math.random()) ? 1 : -1,
    vy : Math.random() * 4 - 2,
    boucnes : 0,
    radius : 3,
    reset: function() {
      this.x = canvas.width /2;
      this.y = canvas.height / 2;
      this.vy = Math.random() * 4 -2;
    },
    multiplier: .2,
    maxspeed: 5
  },
  playerHeight : 80,
  playerWidth : 4,
  pause : false,
  sound : true
};

document.onmousemove = moveMouse;

gameTimeLast = new Date();
update();
}

function moveMouse(e) {
  var y;
  if(!e) {
    e = window.event;
    y = e.event.offsetY;
  }
  else {
    y = e.pageY;
  }

  y -= canvas.offsetTop;
  if(y - game.playerHeight/2 >= 0 && y + game.playerHeight/2 <= canvas.height)
    game.player.y = y;
}

function playSound(snd) {
  if(game.sound) {
    try {
      if (!snd.paused) {
        snd.pause();
        snd.currentTime = 0;
      }
      snd.play();
    }
    catch(e) {}
  }

}

function update() {
  dateTime = new Date();

  gameTime = (dateTime - gameTimeLast);
  if (gameTime < 0)
    gameTime = 0;

  moveAmount = gameTime > 0 ? gameTime / 10 : 1;
//how the cpu player interacts
  if (!game.pause) {
    if (game.computer.y + 20 < game.ball.y && game.computer.y + game.playerHeight/2 <= canvas.height)
        game.computer.y += game.computer.speed * moveAmount;
    else if (game.computer.y - 20 > game.ball.y && game.computer.y - game.playerHeight/2 >= 0)
        game.computer.y -= game.computer.speed * moveAmount;
    if (game.ball.y + game.ball.radius > canvas.height
      || game.ball.y - game.ball.radius < 0) {
        playSound(soundWall);
        if(game.ball.y <= game.ball.radius)
          game.ball.y = game.ball.radius;
        else {
          game.ball.y = canvas.height - game.ball.radius;

        game.ball.vy *= -1;
        }

        //check contact between ball and player
        if (game.ball.x + game.ball.radius >= canvas.width - game.playerWidth) {
          if (game.ball.y + game.ball.radius <= game.player.y + game.playerHeight /2) {
            && game.ball.y + game.ball.radius <= game.player.y + game.playerHeight / 2) {
              playSound(soundRight);

              if (game.ball.vx <= game.ball.maxspeed) {
                game.ball.vx += game.ball.multiplier;
              }

              changeBallDirection(game.player);
            } else {
              game.computer.score ++;
              document.getElementById("computerScore").innerHTML = game.computer.score;
              game.ball.reset();
              game.ball.vx = -1;
            }
          }
          //check collision between ball and cpu player
            else if (game.ball.x - game.ball.radius <= game.playerWidth) {
              if (game.ball.y + game.ball.radius >= game.computer.y + game.playerHeight /2) {
                && game.ball.y + game.ball.radius
              }
            }
          }
        }
      }
  }
}
