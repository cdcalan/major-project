let enemyColliding;

// Sprite objects:
let player, koopa, crab, rock, foe;




// All sprites:
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
    ////this.dy = 1;

    this.lifeArray = [0, 0, 0];

    this.enemyColliding = false;
  }
  // Displays sprites:
  show() {
    fill(100, 200, 150);
    rect(this.x, this.y, this.w, this.h);
  }

  // Sprite horizontal movement:
  glide() {
    this.x += this.dx;
    if (this.x + this.w >= windowWidth || this.x <= 0) {
      this.dx = -1 * this.dx;
    }
  }

  enemyCollision() {
    this.enemyColliding = collideRectRect(this.x, this.y, this.w, this.h, player.x, player.yLoc, player.w, player.h);
    if (this.enemyColliding === true) {
      enemyColliding = true;
      // console.log("enemy " + enemyColliding);
      //player.x < this.x; //////////////////////////////////////////////////////////
      // fix this so that player cant go through the sprite enemies but still be able to move away from them.
      player.dx = 0;            // restrict player's movement in the x direction (until done falling).
      player.yVel = 0;
      if (player.x < this.x - this.w) {
        player.x < this.x;
      }
      else if (player.x > this.x + 2*this.w) {
        player.x > this.x;
      }
      // console.log("YAAAAA" + this.enemyColliding);
      return this.enemyColliding;
    }
    enemyColliding = false;
  }
}



class Crab extends Sprites {
  constructor(x, y) {
    super();
    this.x = x*tileWidth;
    this.y = y*tileHeight;
    this.w = 70;
    this.h = 50;
  }
  updateShow() {
    image(crabLeftImage, this.x, this.y, this.w, this.h);
  }
  attack() {
    for (let i = 0; i < ballArray.length; i++) {
      ballArray[i].update(this.x, this.y);
    }
    // if (abs(this.x - player.x) <= 100) {
    //   ballArray.push(rock1, rock2, rock3);
    // }
    
      // ballArray[i].update(this.x, this.y);
      // ballArray[i].show(this.x, this.y);
  }
}


class Rock {
  constructor() {
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.radius = 25;
    this. color = color(random(255), random(255), random(255), random(255));
  }
  update(x, y) {
    // move ball
    this.x = x + this.dx;
    this.y = y + this.dy;

    // display ball
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.radius*2, this.radius*2);
  }
  // update(x, y) {
  //   this.x = x;
  //   this.y = y;
    
  //   if (abs(this.x - player.x) <= 100) { //If player is close to the crab, initiate attack:
  //     // move ball
  //     this.dx += 6;
  //     this.x += this.dx;
  //     this.y += this.dy;
  //   }
  // }
  // show() {
  //   // display ball
  //   fill(this.color);
  //   noStroke();
  //   ellipse(this.x, this.y, this.radius*2, this.radius*2);  
  // }
}



class Koopa extends Sprites {
  constructor(x, y, boundaryLeft, boundaryRight, enemyColliding) {
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
      fill(50, 50, 100);
    }
      ellipse(this.x, this.y, 10, 10);
  }
  move(x, y, boundaryLeft, boundaryRight) {
    translate(stationaryObject.position.x, 0);
    if (this.x >= this.boundaryXLeft && this.x <= this.boundaryXRight) {
      this.x += this.dx;
    }
    else if (this.x < this.boundaryXLeft || this.x > this.boundaryXRight) {
      this.dx = -1 *  this.dx;
      this.x += this.dx;
    }
    translate(-stationaryObject.position.x, 0);
  }
}




// Mario:                                 //resdtrict marios' x velocity so that it stays within the screen:
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

    // if it is going past the ground make it stay on the ground and stop it from moving 
    if (this.yLoc > ground) {
      this.yLoc = ground;
      this.yVel = 0;
    }
    else if (this.yLoc < stationaryObject.height) {   // if it is going past the roof make it fall 
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
        if (this.x < this.position.x + 500) {
          this.x += this.dx;
        }
        else {
          this.x = this.position.x + 500+3;
          // Sprite horizontal movement:
          //this.x += this.dx;
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
        // if (this.x = this.position.x + 300) {
        //   this.x -= this.dx;
        // }
        // if (this.x === windowWidth-windowWidth) {
        //   this.x = this.position.x;
        //   playerAvatar = marioRun; 
        //   // Sprite horizontal movement:
        //   //this.x += this.dx;
        // }
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
    this.isColliding = collideLineRect(platformX, platformY, platformXFar, platformY, this.x, this.yLoc + this.h/1.01, this.w, this.h, true); // beta testing change of this.x values
    //if (this.x+this.w >= platformX && this.x+this.w <= platformXFar && this.y+this.h === platformY) {
    if (this.isColliding === true) {
      this.yLoc = platformY;
      this.yAccel = 0;
    }
    if (this.yAccel === 0) {
      this.dx = random(3, 10);  //once player reaches ground, allow full movement again.
    }
  }

  collisionLeft(platformX, platformY, platformXFar, platformYBottom) {
    this.isColliding = collideLineRect(platformX, platformY, platformX, platformYBottom, this.x, this.yLoc, this.w, this.h);
    if (this.hit === false) {
      if (this.isColliding === true) {
        this.hit = true;
        playerLives -= 1;
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
        playerLives -= 1;
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
        playerLives -= 1;
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