let totalPlatforms = [];



// Button:
class Button {
  constructor(x, y, z) {
    this.w = (menuWidth/10)*8;
    this.h = 50;
    this.x = x;
    this.y = y;
    this.message = z;
    this.color;
    this.hovering = false;
  }
  hoveredOver() {
    this.hovering = collidePointRect(mouseX, mouseY, this.x, this.y, this.w, this.h);
    if (this.hovering) {
      this.color = 99, 62, 40;
    }
    else {
      this.color = 58, 62, 99;
    }
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
    fill(this.color);
    rect(this.x + (menuWidth/10), this.y, this.w, this.h, 50);
    fill(255);
    text(this.message, this.x + (this.w/2), this.y + this.h/1.3);
  }
}




class Constant {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.width = windowWidth;
    this.height = 70;

    // Controls the scroll speed of the game screen:
    this.acceleration += 1;
    // Gives the "screen" a velocity:
    this.velocity = createVector(1, 0);
  }
  // Makes stationary-object "move" horizontally:
  move() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }
  show() {
    fill(0);
    rect(this.position.x, this.position.y, this.width, this.height);
  }
}




class Platform {
  contructor() {

  }
  show() {
    image(platformImage, i * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
}
