/*
* Note: Column segment height 101px, Row segment defined as 83px in engine.js
* General inspiration from the great communities at Udacity, StackOverflow, and the internet at large!
* Instantiation code inspired by Esther Jun Kim http://esthermakes.tech/
* Random speed function inspired by W3 Schools https://www.w3schools.com/js/js_random.asp
*/

// Enemy variable with x, y, speed, and image values
const Enemy = function(x, y) {
  this.x = x;
  this.y = y;
  this.speed = randomSpeed(100, 250);
  this.sprite = 'images/enemy-bug.png';
};

// Random speed function for enemies
function randomSpeed(min, max) {
  return Math.floor((Math.random() * ( max - min )) + min );
};

// Enemy speed consistent across devices by using dt
// Enemy position reset when exceeding entire canvas size
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
  if (this.x > 101 * 6) {
    this.x = -101;
    this.speed = randomSpeed(100, 250);
  };
  // Collision logic based on player and enemy positions
  if (Math.abs(this.x - player.x) < 80 && Math.abs(this.y - player.y) < 60) {
    player.reset();
    score.addFail();
  };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player variable with sprite and reset function set to prototype
const Player = function() {
  this.sprite = 'images/char-cat-girl.png';
  this.reset();
};

// Creates boundaries for row and column values, resets when reaching water (row 0)
Player.prototype.update = function() {
  if(this.col < 0) {
    this.col = 0;
  }
  if(this.col > 4) {
    this.col = 4;
  }
  if(this.row > 5) {
    this.row = 5;
  }
  if(this.row == 0) {
    this.reset();
    score.addSuccess();
  }
  // Converts current column and row values into x, y coordinates for player
  this.x = this.col * 101;
  this.y = (this.row * 83)-20;
};

// Draw default player sprite and coordinates
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Navigate the table by changing column and row values based on key presses
Player.prototype.handleInput = function(keyPress) {
  if (keyPress == 'left') {
    this.col -= 1;
  };
  if (keyPress == 'right') {
    this.col += 1;
  };
  if (keyPress == 'up') {
    this.row -= 1;
  };
  if (keyPress == 'down') {
    this.row += 1;
  };
};

// Sets default position for Player, -20 is to center sprite on row
Player.prototype.reset = function() {
  this.col = 2;
  this.row = 5;
  this.x = this.col * 101;
  this.y = (this.row * 83)-20;
};

// Instantiate enemies contained within array, -20 is to center sprite on row
let allEnemies = [];
let enemyRows = 3;
for(i = 0; i < enemyRows; i++) {
  allEnemies.push(new Enemy(i*101, (i+1)*83-20));
};

// Success/Fail score capture
const Score = function () {
  this.success = 0;
  this.fail = 0;
};

// Adds increment to success value of constructor function Score object
Score.prototype.addSuccess = function () {
  this.success += 1;
  document.querySelector('.success').innerHTML = this.success;
};

// Adds increment to fail value of constructor function Score object
Score.prototype.addFail = function () {
  this.fail += 1;
  document.querySelector('.fail').innerHTML = this.fail;
};

// Resets score
Score.prototype.resetScore = function () {
  this.fail = 0;
  this.success = 0;
  document.querySelector('.success').innerHTML = this.success;
  document.querySelector('.fail').innerHTML = this.fail;
}

// Constructor functions to create player and score objects
let player = new Player();
let score = new Score();

// Convert pressed key values into directions
document.addEventListener('keyup', function(e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

// Ensure all page elements are loaded prior to adding event listeners
window.onload = function() {
  // Change difficulty of game (hard, medium, easy)
  document.getElementById('hard').addEventListener('click', function () {
    allEnemies = [];
    enemyRows = 4;
    for(i = 0; i < enemyRows; i++) {
      if (i == 1) {
        allEnemies.push(new Enemy(i*101, (i+1)*83-20));
        // Adds second enemy on same row
        allEnemies.push(new Enemy(0, (i+1)*83-20));
      }
      else {
        allEnemies.push(new Enemy(i*101, (i+1)*83-20));
      };
    };
    score.resetScore();
    player.reset();
  });

  document.getElementById('medium').addEventListener('click', function() {
    allEnemies = [];
    enemyRows = 3;
    for(i = 0; i < enemyRows; i++) {
      allEnemies.push(new Enemy(i*101, (i+1)*83-20));
    };
    score.resetScore();
    player.reset();
  });

  document.getElementById('easy').addEventListener('click', function() {
    allEnemies = [];
    enemyRows = 2;
    for(i = 0; i < enemyRows; i++) {
      allEnemies.push(new Enemy(i*101, (i+1)*83-20));
    };
    score.resetScore();
    player.reset();
  });

  // Change image based on character selection, reset score/position
  document.getElementById('boy').addEventListener('click', function() {
    Player.prototype.render = function() {
      ctx.drawImage(Resources.get('images/char-boy.png'), this.x, this.y);
    };
    score.resetScore();
    player.reset();
  });

  document.getElementById('cat').addEventListener('click', function() {
    Player.prototype.render = function() {
      ctx.drawImage(Resources.get('images/char-cat-girl.png'), this.x, this.y);
    };
    score.resetScore();
    player.reset();
  });

  document.getElementById('pink').addEventListener('click', function() {
    Player.prototype.render = function() {
      ctx.drawImage(Resources.get('images/char-pink-girl.png'), this.x, this.y);
    };
    score.resetScore();
    player.reset();
  });

  document.getElementById('horn').addEventListener('click', function() {
    Player.prototype.render = function() {
      ctx.drawImage(Resources.get('images/char-horn-girl.png'), this.x, this.y);
    };
    score.resetScore();
    player.reset();
  });

  document.getElementById('princess').addEventListener('click', function() {
    Player.prototype.render = function() {
      ctx.drawImage(Resources.get('images/char-princess-girl.png'), this.x, this.y);
    };
    score.resetScore();
    player.reset();
  });

  // Difficulty selection variables and function
  const diffDiv = document.getElementById('difficulty');
  const diffs = diffDiv.getElementsByClassName('difficulty');
  for (i = 0; i < diffs.length; i++) {
    diffs[i].addEventListener('click', function() {
      const select = diffDiv.getElementsByClassName('selected');
      if (select.length > 0) {
        select[0].classList.remove('selected');
      };
      this.classList.add('selected');
    });
  };

  // Character selection variables and function
  const chars = document.getElementById('character');
  const units = chars.getElementsByClassName('character');
  for (i = 0; i < units.length; i++) {
    units[i].addEventListener('click', function() {
      const select = chars.getElementsByClassName('selected');
      if (select.length > 0) {
        select[0].classList.remove('selected');
      };
      this.classList.add('selected');
    });
  };
};
