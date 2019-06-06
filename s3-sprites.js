// Sprite objects:
let player;
let foe;





// All sprites:
class Sprites {
  constructor(x, y) {
    // Coordinates:
    this.x = x;
    this.y = y;
    // Dimensions:
    this.h = 75;
    this.w = 50;
    // Speed variables:
    this.dx = random(3, 10);
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

  // Checks if sprite has collided with player:
  hasCollided() {
    // return (if this sprite is touching the player); then, in another function, add if hasCollided, this.life -= 1; and display the life co7unter.

  }
}





// Mario:                                 //resdtrict marios' x velocity so that it stays within the screen:
class User extends Sprites {
  constructor(x, y) {                            
    super(x, y);
    
    this.yVel = yVelocity;
    this.yAccel = yAcceleration;
    this.yLoc = yLocation;
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

    // if (keyIsPressed && keyCode === UP_ARROW) {
    //   //show jump:
    //   playerAvatar = marioJump;
    //   this.yAccel = -5;
    // }

    if (keyIsPressed && keyCode === RIGHT_ARROW) {
      if (this.x < windowWidth) {                          ///fix
        // show run:
        playerAvatar = marioRun; 
        // Sprite horizontal movement:
        this.x += this.dx;
      }
    }
    else if (keyIsPressed && keyCode === LEFT_ARROW) {
      if (this.x > 0) {                                      ///fix
        // show run:
        playerAvatar = marioRunBack; 
        this.x -= this.dx;
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

  jump() {
    //if (keyIsPressed && keyCode === UP_ARROW) {
    // this.y -= this.dy;
  }

  kick() {
  }

  attack() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, 50, 50);
  }
}





// Button:
class Button {
  constructor(x, y, z) {
    this.w = (menuWidth/10)*8;
    this.h = 50;
    this.x = x;
    this.y = y;
    this.message = z;
  }
  // Takes in mouseX (mX) and mouseY (mY) values to check if button is clicked:
  clickedOn(mX, mY) {
    if (screenState === "Start Screen") {
      return (mX >= this.x &&
              mX <= this.x + this.w) &&
             (mY >= this.y && 
              mY <= this.y + this.h);
    }
  }
  show(){
    fill(58, 62, 99);
    rect(this.x + (menuWidth/10), this.y, this.w, this.h, 50);
    fill(255);
    text(this.message, this.x + (this.w/2), this.y + this.h/1.3);
  }
}