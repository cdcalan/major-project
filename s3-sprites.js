// Sprite objects:
let player;
let koopa;
let crab;
let rock;
let foe;





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
    this.dx = random(2, 6);
    ////this.dy = 1;

    this.life = 3;
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

// //   // Checks if sprite has collided with player:
//   hasCollided(player) {
//     // return (if this sprite is touching the player); then, in another function, add if hasCollided, this.life -= 1; and display the life co7unter.
//     if (player.x + player.w > this.x && player.x < this.x + this.w && player.yLoc + player.h > this.Y && player.yLoc < this.y +this.h) {
//       //collision = true;
//       return true;
//     }
//     else {
//       //collision = false;
//       return false;
//     }
//   }
}




class Koopa extends Sprites {
  constructor(x, y, boundaryLeft, boundaryRight, identifier) {
    super();
    this.x = x * tileWidth;
    this.y = y * tileHeight-(this.h/4);
    this.boundaryXLeft = boundaryLeft;
    this.boundaryXRight = boundaryRight;
    this.identifier = identifier;

    if (this.identifier === 1) {
      this.color = (255, 0, 0);
    }
    else if (this.identifier === 2) {
      this.color = (0, 0, 255);
    }
    else if (this.identifier === 3) {
      this.color = (0, 255, 0);
    }
    else if (this.identifier === 4) {
      this.color = (15, 100, 50);
    }
    else if (this.identifier === 5) {
      this.color = (100, 75, 25);
    }
    else {
      this.color = (60, 100, 255);
    }
  }
  updateShow() {
    image(koopaImage, this.x, this.y, this.w/1.1, this.h/1.1);
    fill(this.color);
    ellipse(this.x, this.y, 10, 10);
  }
  /////////////////////////////////////////////////////////////////
  move() {
    // console.log("x,y: " + this.x + " " + this.y);
    // console.log("boundaries: " + this.boundaryXLeft + " " + this.boundaryXRight);
    this.x += this.dx;
    if (this.x + this.w > this.boundaryXRight || this.x < this.boundaryXLeft) {
      this.dx = -1 * this.dx;
    }
  }
  /////////////////////////////////////////////////////////////////
}




class Crab extends Sprites {
  constructor(x, y) {
    super();
    this.x = x*tileWidth;
    this.y = y*tileHeight;
  }
  updateShow() {
    image(crabLeftImage, this.x, this.y, this.w*1.4, this.h/1.5);
  }
}




// class rock {
//   constructor() {

//   }
// }





// Mario:                                 //resdtrict marios' x velocity so that it stays within the screen:
class Player extends Sprites {
  constructor(spriteX, spriteY) {                            
    super(spriteX, spriteY);
    
    this.yVel = yVelocity;
    this.yAccel = yAcceleration;
    this.yLoc = yLocation;

    this.isColliding = false;

    this.rightEdge = line (this.x+this.w, this.yLoc, this.x+this.w, this.yLoc+this.h);
    this.leftEdge = line (this.x, this.yLoc, this.x, this.yLoc+this.h);
    this.bottomEdge = line (this.x, this.yLoc+this.h, this.x+this.w, this.yLoc+this.h);
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
    else if (this.yLoc < 0) {   // if it is going past the roof make it fall 
      this.yVel = 0;
      this.yAccel = +5;
    }

    // // Response to collision: 
    // if (collision === true) {
    //   console.log("done");
    //   this.yVel = 0;
    //   this.yAccel = +5;
    //   playerLives -= 1;
    // }

    if (keyIsPressed && keyCode === RIGHT_ARROW) {
      if (fall === false) {
        if (this.x < (stationaryObject.position.x + stationaryObject.width) - this.w) {                          
          // show run:
          playerAvatar = marioRun; 
          // Sprite horizontal movement:
          this.x += this.dx;
        }
      }
    }
    else if (keyIsPressed && keyCode === LEFT_ARROW) {
      if (this.x > (stationaryObject.position.x)) {                                      
        // show run:
        playerAvatar = marioRunBack; 
        this.x -= this.dx;
      }
      else {
        this.x = stationaryObject.position.x;             // keep mario from moving off left screen. 

      }
    }
    else {
      // show duck:
      playerAvatar = marioDuck;
    }
    // show user:
    image(playerAvatar, this.x, this.yLoc, this.w, this.h);

    //console.log(this.yAccel, this.yVel, this.yLoc);
  }

  collisionLeft(platformX, platformY, platformXFar, platformYBottom) {
    this.isColliding = collideLineRect(platformX, platformY, platformX, platformYBottom, this.x, this.yLoc, this.w, this.h);
    if (this.isColliding) {
        this.dx = 0;            // restrict player's movement in the x direction (until done falling).
        this.yVel = 0;
        this.yAccel = +5;      //////////change to 5
        playerLives -= 1;
    }
    if (this.yLoc === ground) {
      this.dx = random(3, 10);  //once player reaches ground, allow full movement again.
    }
  }

  collisionRight(platformX, platformY, platformXFar, platformYBottom) {
    this.isColliding = collideLineRect(platformXFar, platformY, platformXFar, platformYBottom, this.x, this.yLoc, this.w, this.h);
    if (this.isColliding) {
        this.dx = 0;            // restrict player's movement in the x direction (until done falling).
        this.yVel = 0;
        this.yAccel = +1;      //////////change to 5
        playerLives -= 1;
    }
    if (this.yLoc === ground) {
      this.dx = random(3, 10);  //once player reaches ground, allow full movement again.
    }
  }

  collisionBottom(platformX, platformY, platformXFar, platformYBottom) {
    this.isColliding = collideLineRect(platformX, platformYBottom, platformXFar, platformYBottom, this.x, this.yLoc, this.w, this.h);
    if (this.isColliding) {
        this.dx = 0;            // restrict player's movement in the x direction (until done falling).
        this.yVel = 0;
        this.yAccel = +1;      //////////change to 5
        playerLives -= 1;
    }
    if (this.yLoc === ground) {
      this.dx = random(3, 10);  //once player reaches ground, allow full movement again.
    }
  }

  collisionTop(platformX, platformY, platformXFar, platformYBottom) {
    this.isColliding = collideLineRect(platformX, platformY, platformXFar, platformY, this.x, this.yLoc + this.h/1.01, this.w, this.h); // beta testing change of this.x values
    if (this.isColliding) {
      this.yAccel = 0;
      //this.yLoc = platformY - this.h;
    }
    if (this.yAccel === 0) {
      this.dx = random(3, 10);  //once player reaches ground, allow full movement again.
    }
  }

  kick() {
  }

  attack() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, 50, 50);
  }
}