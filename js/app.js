//Success/Fail score capture
var Score = function () {
  this.success = 0;
  this.fail = 0;
}

Score.prototype.addSuccess = function () {
  this.success += 1;
  document.querySelector('.success').innerHTML = this.success;
};

Score.prototype.addFail = function () {
  this.fail += 1;
  console.log(this);
  document.querySelector('.fail').innerHTML = this.fail;
};

// Random speed function for enemies
function randomSpeed(min, max) {
  return Math.floor((Math.random() * ( max - min + 1 )) + min );
};

//Column segment height 101px, Row segment defined as 83px in engine.js

// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = randomSpeed(100, 250);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if (this.x > 101 * 6) {
      this.x = -101;
      this.speed = randomSpeed(100, 250);
    }

//Reduced size for col and row size to emulate actual collision distance
    if (Math.abs(this.x - player.x) < 80 && Math.abs(this.y - player.y) < 60) {
        player.reset();
        score.addFail();

    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.player = 'images/char-cat-girl.png';
    this.reset();

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
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
    this.x = this.col * 101;
    this.y = (this.row * 83)-20;

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};


Player.prototype.handleInput = function (keyPress) {
  if (keyPress == 'left') {
    this.col -= 1;
  }
  if (keyPress == 'right') {
    this.col += 1;
  }
  if (keyPress == 'up') {
    this.row -= 1;
  }
  if (keyPress == 'down') {
    this.row += 1;
  }

};

Player.prototype.reset = function() {
  this.col = 2;
  this.row = 5;
  this.x = this.col * 101;
  this.y = (this.row * 83)-20;
};

var allEnemies = [];
var numEnemies = 3;

for(var i = 0; i < numEnemies; i++) {
  allEnemies.push(new Enemy(i*101, (i+1)*83-20));
};

var player = new Player();
var score = new Score();


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


//Ensure all page elements are loaded prior to adding event listeners
window.onload=function(){

//Change difficulty of game
  document.getElementById('hard').addEventListener('click', function () {
    allEnemies = [];
    numEnemies = 4;
    for(var i = 0; i < numEnemies; i++) {
      if (i == 2) {
        allEnemies.push(new Enemy(i*101, (i+1)*83-20));
        allEnemies.push(new Enemy(i*101, (i+1)*83-20));
      }
      else {
        allEnemies.push(new Enemy(i*101, (i+1)*83-20));
      }
    };
  });

  document.getElementById('medium').addEventListener('click', function() {
    allEnemies = [];
    numEnemies = 3;
    for(var i = 0; i < numEnemies; i++) {
      allEnemies.push(new Enemy(i*101, (i+1)*83-20));
    };
  });

  document.getElementById('easy').addEventListener('click', function() {
    allEnemies = [];
    numEnemies = 2;
    for(var i = 0; i < numEnemies; i++) {
      allEnemies.push(new Enemy(i*101, (i+1)*83-20));
    };
    
  });
};
