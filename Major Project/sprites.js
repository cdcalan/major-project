class Sprites {
  constructor(x, y) {
    // Coordinates:
    this.x = x;
    this.y = yLocation;
    // Dimensions:
    this.h = 75;
    this.w = 50;
    // Speed variables:
    this.dx = random(3, 10);
    this.dy = 1;


  }
  // Displays sprites:
  show() {
    fill(100, 200, 150);
    rect(this.x, this.y, this.w, this.h);

  }

  // Sprite horizontal movement:
  move() {
    if (keyIsPressed && keyCode === RIGHT_ARROW) {
      this.x += this.dx;
    }
  }

  // Checks if sprite has collided with player:
  hasCollided() {

  }
}





class User extends Sprites {
  // constructor(yVelocity, yAcceleration) {
  //   super();
  //   // move ball
  //   yVelocity += yAcceleration;
  //   yLocation += yVelocity;

  //   // physics
  //   yAcceleration = 0;  // after movign each tim, turn the acceleration back to 0
  //   yVelocity += gravity;
  //   // if it is going past the grpound make it stay on the ground and stop it from moving 
  //   if (yLocation > ground) {
  //     yLocation = ground;
  //     yVelocity = 0;
  //   }
  // }
  // Implement gravity!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  updateShow(playerAvatar) {
    if (keyIsPressed && keyCode === UP_ARROW) {
      yAcceleration = -5;
      playerAvatar = marioJump;
    }
    else if (keyIsPressed && keyCode === RIGHT_ARROW) {
      playerAvatar = marioRun; 
    }
    else {
      playerAvatar = marioDuck;
    }
    image(playerAvatar, this.x, this.y, this.w, this.h);
  }

  jump() {
    if (keyIsPressed && keyCode === UP_ARROW) {
      this.y -= this.dy;
    }
  }

  kick() {
  }

  attack() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, 50, 50);
  }
}




class Button {
  constructor(x, y, z) {
    this.w = 150;
    this.h = 50;
    this.x = x;
    this.y = y;
    this.message = z;
  }
  show(){
    fill(58, 62, 99);
    rect(this.x + (menuWidth/5), this.y, this.w, this.h, 50);
    fill(255);
    text(this.message, this.x + (this.w/2), this.y + this.h/1.5);
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
}