// Sprite objects:
let player;

// Global boolean variable that turns true if player collides with any enemy.
let enemyColliding;




// Skeleton sprites class for basing all sprites off of:
class Sprites {
  constructor(spriteX, spriteY) {
    // Coordinates:
    this.x = spriteX;
    this.y = spriteY;
    // Dimensions:
    this.h = 75;
    this.w = 50;
    // Speed variables:
    this.dx = 3;

    // Number of lives:
    this.lifeArray = [0, 0, 0];

    // Local variable to check if player is colliding with a particular enemy:
    this.enemyColliding = false;
  }

  enemyCollision() {
    // Checks if player is colliding with enemy sprites:
    this.enemyColliding = collideRectRect(this.x, this.y, this.w, this.h, player.x, player.yLoc, player.w, player.h);
    if (this.enemyColliding === true) {
      enemyColliding = true;         

      // Resists player by trying to push player back away from enemy upon impact (makes it harder for player to hit crabs):
      if (player.x < this.x) {
        player.x -= 1.1*this.dx;
      }
      if (player.x > this.x) {
        player.x += 1.1*this.dx;
      }
    return this.enemyColliding;
    }
    enemyColliding = false;
  }
}




// Crab-enemy sub-class of Sprites:
class Crab extends Sprites {
  constructor(x, y) {
    super();
    this.x = x*tileWidth;
    this.y = y*tileHeight;
    this.w = 70;
    this.h = 50;
  }

  updateShow() {
    // Display Crab:
    image(crabLeftImage, this.x, this.y, this.w, this.h);
  }
}




class Rock {
  constructor(x, y) {
    this.x = x*tileWidth;
    this.y = y*tileHeight;
    this.dx = random(-5, 5);
    this.dy = 5;
    this.radius = 25;
    this.color = color(random(255), random(255), random(255), random(150, 255));
  }
  update() {

    // move ball
    this.x -= this.dx;

    // display ball
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.radius*2, this.radius*2);
  }

  collision(player) {
    if (abs((player.x + player.w) - this.x) <= this.radius) {
      enemyColliding = true;
      console.log("yes");
    }
  }
}




// Koopa-enemy sub-class of Sprites:
class Koopa extends Sprites {
  constructor(x, y, boundaryLeft, boundaryRight) {
    super();
    this.x = x * tileWidth;
    this.y = y * tileHeight-(this.h/4);
    this.boundaryXLeft = boundaryLeft;
    this.boundaryXRight = boundaryRight;
  }
  updateShow() {
    image(koopaImage, this.x, this.y, this.w/1.1, this.h/1.1);
    if (this.lifeArray.length === 1) {
      fill(200, 50, 50);
    }
    if (this.lifeArray.length === 2) {
      fill(50, 200, 50);
    }
    if (this.lifeArray.length === 3) {
      fill(50, 50, 200);
    }
      ellipse(this.x, this.y, 10, 10);
  }
  move(x, y, boundaryLeft, boundaryRight) {
    translate(player.position.x, 0);
    if (this.x >= this.boundaryXLeft && this.x <= this.boundaryXRight) {
      this.x += this.dx;
    }
    else if (this.x < this.boundaryXLeft || this.x > this.boundaryXRight) {
      this.dx = -1 *  this.dx;
      this.x += this.dx;
    }
    translate(-player.position.x, 0);
  }
}




// Player / Mario class:                        
class Player extends Sprites {
  constructor(spriteX, spriteY) {                            
    super(spriteX, spriteY);

    this.position = createVector(0, spriteY);
    // Controls the scroll speed of the game screen:
    this.scrollAcceleration += 5;
    // Gives the "screen" a velocity:
    this.scrollVelocity = createVector(3, spriteY);   // Beta-test: made game scroll faster than background image.
    
    this.yVel = yVelocity;
    this.yAccel = yAcceleration;
    this.yLoc = yLocation;

    this.isColliding = false;

    this.rightEdge = line (this.x+this.w, this.yLoc, this.x+this.w, this.yLoc+this.h);
    this.leftEdge = line (this.x, this.yLoc, this.x, this.yLoc+this.h);
    this.bottomEdge = line (this.x, this.yLoc+this.h, this.x+this.w, this.yLoc+this.h);

    this.hit = false;
  }

  // Implement gravity!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  updateShow(playerAvatar) { 
    this.yVel += this.yAccel;
    this.yLoc += this.yVel;
    this.yAccel = 0;   // after moving each time, turn the acceleration back to 0
    this.yVel += gravity;
    this.xSmooth = this.x + tileWidth;

    // if it is going past the ground make it stay on the ground and stop it from moving 
    if (this.yLoc > ground) {
      this.yLoc = ground;
      this.yVel = 0;
      isJumping = false;
    }
    else if (this.yLoc < 55) {   // if it is going past the roof make it fall 
      this.yVel = 0;
      this.yAccel = +5;
    }

    if (keyIsPressed && keyCode === RIGHT_ARROW) {
      if (enemyColliding === false) {
        if (this.position.x < 80*tileWidth) {
          playerAvatar = marioRun; 
          this.scrollVelocity.add(this.scrollAcceleration);
          this.position.add(this.scrollVelocity); 
        }                                               
        // show run:
        if (this.xSmooth <= this.position.x + 500) {
          this.x += this.dx;
        }
      }
    }
    else if (keyIsPressed && keyCode === LEFT_ARROW) {
      if (enemyColliding === false) {    
        playerAvatar = marioRunBack;                                 
        // show run:
        this.x -= this.dx;
        if (this.x < this.position.x) {
          this.x = this.position.x;
        }
      }
    }
    else if(keyIsPressed && keyCode === DOWN_ARROW) {
      playerState = 1;
      if (playerState === 1) {
        playerAvatar = marioAttack; 
      }
    }
    else {
      // show duck:
      playerAvatar = marioDuck;
    }
    // show user:
    image(playerAvatar, this.x, this.yLoc, this.w, this.h);
  }

  collisionTop(platformX, platformY, platformXFar, platformYBottom) {
    this.previousY = this.yLoc;
    this.isColliding = collideLineRect(platformX, platformY, platformXFar, platformY, this.x, this.yLoc, this.w, this.h); // beta testing change of this.x values
    //if (this.x+this.w >= platformX && this.x+this.w <= platformXFar && this.y+this.h === platformY) {
    if ((this.isColliding === true) || (player.yLoc >= platformY && player.yLoc + player.h < platformYBottom/2 && player.x >= platformX && player.x <= platformXFar)) {
      this.yLoc = platformY - (this.h+0.01);
      //this.yAccel = 0;
      this.yVel = 0;
      isJumping = false;
      return true;
    }
    else {
      if (this.yAccel === 0) {
        this.dx = random(3, 10);  //once player reaches ground, allow full movement again.
      }
      return false;
    }
  }

  collisionLeft(platformX, platformY, platformXFar, platformYBottom) {
    this.isColliding = collideLineRect(platformX, platformY, platformX, platformYBottom, this.x, this.yLoc, this.w, this.h);
    if (this.hit === false) {
      if (this.isColliding === true) {
        this.hit = true;
        this.hit = false;
        this.dx = 0;            // restrict player's movement in the x direction (until done falling).
        this.yVel = 0;
        this.yAccel = +1;      //////////change to 5
      }
      if (this.yLoc === ground) {
        this.dx = random(3, 10);  //once player reaches ground, allow full movement again.
      }
    }
    if (this.isColliding === false) {
      this.hit = false;
    }
  }

  collisionRight(platformX, platformY, platformXFar, platformYBottom) {
    this.isColliding = collideLineRect(platformXFar, platformY, platformXFar, platformYBottom, this.x, this.yLoc, this.w, this.h);
    if (this.hit === false) {
      if (this.isColliding === true) {
        this.hit = true;
        this.hit = false;
        this.dx = 0;            // restrict player's movement in the x direction (until done falling).
        this.yVel = 0;
        this.yAccel = +1;      //////////change to 5
      }
      if (this.yLoc === ground) {
        this.dx = random(3, 10);  //once player reaches ground, allow full movement again.
      }
    }
    if (this.isColliding === false) {
      this.hit = false;
    }
  }

  collisionBottom(platformX, platformY, platformXFar, platformYBottom) {
    this.isColliding = collideLineRect(platformX, platformYBottom, platformXFar, platformYBottom, this.x, this.yLoc, this.w, this.h);
    if (this.hit === false) {
      if (this.isColliding === true) {
        this.hit = true;
        this.hit = false;
        this.dx = 0;            // restrict player's movement in the x direction (until done falling).
        this.yVel = 0;
        this.yAccel = +1;      //////////change to 5
      }
      if (this.yLoc === ground) {
        this.dx = random(3, 10);  //once player reaches ground, allow full movement again.
      }
    }
    if (this.isColliding === false) {
      this.hit = false;
    }
  }

  kick() {
  }

  attack() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, 50, 50);
  }
}