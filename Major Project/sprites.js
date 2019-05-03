class Sprites {
  constructor(x, y) {
    // Coordinates:
    this.x = x;
    this.y = y;
    // Dimensions:
    this.h = 50;
    this.w = 20;
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
  // Implement gravity!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  jump() {
    if (keyIsPressed && keyCode === UP_ARROW) {
      this.y -= this.dy;

    }
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