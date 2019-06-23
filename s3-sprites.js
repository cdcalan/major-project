// Player/ mario object:
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
      console.log("hello " + "playerstate " + playerState);

      enemyColliding = true;         

      // Resists player by trying to push player back away from enemy upon impact (makes it harder for player to hit crabs):
      // If player is attacking, allow less resistance: 
      if (playerState === 1) {
        if (player.x < this.x) {
          player.x -= 1*this.dx;
        }
        if (player.x > this.x) {
          player.x += 1*this.dx;
        }
      }
      // If player is not attacking, allow slightly more resisitance: 
      else if (playerState === 0) {
        if (player.x < this.x) {
          player.x -= 1.3*this.dx;
        }
        if (player.x > this.x) {
          player.x += 1.3*this.dx;
        }
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




// Crab enemy's weapon:
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
    // Detect player collision, and increase the force of gravity on player if collision is true. 
    if (abs((player.x + player.w) - this.x) <= this.radius) {
      gravity += 0.0001;
    }
  }
}




// Koopa-enemy sub-class of Sprites:
class Koopa extends Sprites {
  constructor(x, y, boundaryLeft, boundaryRight) {
    super();
    this.x = x * tileWidth;
    this.y = y * tileHeight-(this.h/4);

    // Boundaries for koopa's routine movement along the x-axis:
    this.boundaryXLeft = boundaryLeft;
    this.boundaryXRight = boundaryRight;
  }
  updateShow() {
    image(koopaImage, this.x, this.y, this.w/1.1, this.h/1.1);
  }

  move(x, y, boundaryLeft, boundaryRight) {
    // if moving at the end of the left boundary, continue right:
    if (this.x >= this.boundaryXLeft && this.x <= this.boundaryXRight) {
      this.x += this.dx;
    }
    // if moving at the end of the right boundary, turn around and move left:
    else if (this.x < this.boundaryXLeft || this.x > this.boundaryXRight) {
      this.dx = -1 *  this.dx;
      this.x += this.dx;
    }
  }
}




// Player / Mario class:                        
class Player extends Sprites {
  constructor(spriteX, spriteY, lifeArray) {                            
    super(spriteX, spriteY);

    //Screen Scrolling Elements:

    // The position of the screen that scrolls with player's movement (NOTE: this is not player's x position!):
    this.position = createVector(0, spriteY);
    // Controls the scroll speed of the game screen:
    this.scrollAcceleration += 5;
    // Gives the "screen" a velocity:
    // BETA TESTING: adjusted background and scrollVelocity speeds to make game scroll faster than background image.
    this.scrollVelocity = createVector(3, spriteY); 
    
    // Player Elements:
    this.yVel = yVelocity;
    this.yAccel = yAcceleration;
    this.yLoc = yLocation;

    this.isColliding = false;
  }

  updateShow(playerAvatar) { 

    // Y-Direction movement physics: if acceleration is acquired, apply it to player's y position. 
    this.yVel += this.yAccel;
    this.yLoc += this.yVel;
    // After moving each time, turn the acceleration back to 0 and apply gravity:
    this.yAccel = 0; 
    this.yVel += gravity;

    // if player is going past the ground make it stay on the ground and stop it from moving:
    if (this.yLoc > ground) {
      this.yLoc = ground;
      this.yVel = 0;
      isJumping = false;
    }
    // If player is going past the top, black banner, make it fall back down:
    else if (this.yLoc < 55) {   
      this.yVel = 0;
      this.yAccel = +5;
    }


    // Player movement in the right direction:
    if (keyIsPressed && keyCode === RIGHT_ARROW) {
      // As long as player is not colliding, and game-environemnt displayed on-screen covers a specific 
      // portion of the text file, change player avatar and scroll the screen to the right:
      if (enemyColliding === false) {
        if (this.position.x < 80*tileWidth) {
          playerAvatar = marioRun; 
          this.scrollVelocity.add(this.scrollAcceleration);
          this.position.add(this.scrollVelocity); 
        }                                               
        // As long as player remains a max. of 500 pixels from left of screen, allow player to scroll right:
        if (this.x <= this.position.x + 500) {
          this.x += this.dx;
        }
      }
    }


    // Player movement in the left direction:
    else if (keyIsPressed && keyCode === LEFT_ARROW) {
      // As long as player is not colliding, display player avatar, move player x position to the left:
      if (enemyColliding === false) {    
        playerAvatar = marioRunBack;                                 
        this.x -= this.dx;
        // If player tries to go farther than the left edge of the scene shown, restrict player's x position to the left edge of the screen: 
        if (this.x < this.position.x) {
          this.x = this.position.x;
        }
      }
    }


    // Player attack key:
    else if(keyIsPressed && keyCode === DOWN_ARROW) {
      // Switch player state to "attack" mode:
      playerState = 1;
      // Change player avatar:
      if (playerState === 1) {
        playerAvatar = marioAttack; 
      }
    }


    // Player attack key:
    else if(keyIsPressed && keyCode === UP_ARROW) {
      // Change the look of player:
      playerAvatar = marioJump;
    }

    else {
      // keep neutral player avatar:
      playerAvatar = marioDuck;
    }
    // display player:
    image(playerAvatar, this.x, this.yLoc, this.w, this.h);
  }



  // Player collision with top of platforms:
  collisionTop(platformX, platformY, platformXFar, platformYBottom) {
    
    // Using p5.collide2d library to detect collision:
    this.isColliding = collideLineRect(platformX, platformY, platformXFar, platformY, this.x, this.yLoc, this.w, this.h);
    
    // If player is colliding directly with the top of platform, or is positioned within the 'range' of the top of the platform.
    if ((this.isColliding === true) || (player.yLoc >= platformY && player.yLoc + player.h < platformYBottom/2 && player.x > platformX && player.x < platformXFar)) {

      // Position player just on top of the platform (offsetting it by 0.01 pixels to avoid getting trapped on platform):
      this.yLoc = platformY - (this.h+0.01);
      this.yVel = 0;
      // If player was jumping before, turn off jump:
      isJumping = false;
      return true;
    }
    // If player is not colliding, and not at the top of a jump, allow for full range of motion again:
    else {
      if (this.yAccel === 0) {
        this.dx = random(3, 10);  
      }
      return false;
    }
  }



  // Player collision with Left of platforms:
  collisionLeft(platformX, platformY, platformXFar, platformYBottom) {
    // Using p5.collide2d library to detect collision:
    this.isColliding = collideLineRect(platformX, platformY, platformX, platformYBottom, this.x, this.yLoc, this.w, this.h);
    if (this.isColliding === true) {
      
      // Play sound effect:
      soundEffect.play();
      
      // If colliding, prevent player movement in the x-axis (preventing player from intersecting the platform):
      this.dx = 0; 
      // Make player fall:      
      this.yVel = 0;
      this.yAccel = +4;      
    }
    // Once player reaches ground, allow full movement again.
    if (this.yLoc === ground) {
      this.dx = random(3, 10);  
    }
  }



  // Player collision with Right of platforms:
  collisionRight(platformX, platformY, platformXFar, platformYBottom) {
    // Using p5.collide2d library to detect collision:
    this.isColliding = collideLineRect(platformXFar, platformY, platformXFar, platformYBottom, this.x, this.yLoc, this.w, this.h);
    if (this.isColliding === true) {
      
      // Play sound effect:
      soundEffect.play();
      
      // If colliding, prevent player movement in the x-axis (preventing player from intersecting the platform):
      this.dx = 0;            
      // Make player fall:   
      this.yVel = 0;
      this.yAccel = +4;
    }
    // Once player reaches ground, allow full movement again.
    if (this.yLoc === ground) {
      this.dx = random(3, 10);  
    }
  }



  // Player collision with Right of platforms:
  collisionBottom(platformX, platformY, platformXFar, platformYBottom) {
    // Using p5.collide2d library to detect collision:
    this.isColliding = collideLineRect(platformX, platformYBottom, platformXFar, platformYBottom, this.x, this.yLoc, this.w, this.h);
    if (this.isColliding === true) {
     
     // Play sound effect:
     soundEffect.play();
     
     // If colliding, prevent player movement in the x-axis (preventing player from intersecting the platform):
      this.dx = 0;            
      // Make player fall:  
      this.yVel = 0;
      this.yAccel = +4;
    }
    // Once player reaches ground, allow full movement again.
    if (this.yLoc === ground) {
      this.dx = random(3, 10);  
    }
  }



  // Enemy collision:
  playerCollision(pointToSubtract) {
    // As long as player has lives left:
    if (playerLives >=1) {
      // Remove a life from the life counter: 
      console.log("old player life " + playerLives);
      let oldPlayerLives = playerLives;
      return playerLives = oldPlayerLives - pointToSubtract;
    }

    // Otherwise, If no lives left, trigger game over screen:
    else if (playerLives === 0){
      screenState = "Game Over";
    }
  }
}