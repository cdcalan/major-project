
// Button class (used for all buttons in game):
class Button {
  constructor(x, y, z) {
    this.x = x + (menuWidth/10);
    this.y = y;
    this.w = (menuWidth/10)*8;
    this.h = 50;
    this.message = z;
    this.color;
    this.hovering = false;
  }
  
  hoveredOver() {
    // Detect if mouseX is hovering over button, and change button color accordingly:
    this.hovering = collidePointRect(mouseX, mouseY, this.x, this.y, this.w, this.h);
    if (this.hovering) {
      this.color = 99, 62, 40;
    }
    else {
      this.color = 58, 62, 99;
    }
  }

  clickedOn(mX, mY) {
    // Takes in mouseX (mX) and mouseY (mY) values to check if button is clicked in start screen:
    if (screenState === "Start Screen" || screenState === "Info Screen" || screenState === "Game Over" || screenState === "Completed") {
      return (mX >= this.x &&
              mX <= this.x + this.w) &&
             (mY >= this.y && 
              mY <= this.y + this.h);
    }
  }

  show() {
    // Displays button:
    fill(this.color);
    rect(this.x, this.y, this.w, this.h, 50);
    fill(255);
    text(this.message, this.x + (this.w/3), this.y + this.h/1.3);
  }
}




// Coin class (used for all collectable coins):
class Coin {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = tileWidth;
    this.h = tileHeight;
    // Bool variable for detecting collision with player:
    this.coinPickUp = false
  }

  colliding(player) {
    // Uses the p5.collide2d library to detect player collision with coin (coinPickUp):
    this.coinPickUp = collideRectRect(this.x, this.y, this.w, this.h, player.x, player.yLoc, player.w, player.h);
    return this.coinPickUp;
  }

  show() {
    // Uses the p5.play library to display coins as an animation of a series of images loaded in preload():
    animation(coinAnimation, this.x, this.y);
  }
}




// Mystery Box class (power up):
class Box {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = tileWidth;
    this.h = tileHeight;
    // Bool variable for detecting collision with player:
    this.boxPickUp = false;
  }

  colliding(player) {
    // Uses the p5.collide2d library to detect player collision with box (boxPickUp):
    this.boxPickUp = collideRectRect(this.x, this.y, this.w, this.h, player.x, player.yLoc, player.w, player.h);
    return this.boxPickUp;
  }
  
  show() {
    // Displays image of mystery box:
    image(mysteryBox, this.x, this.y, this.w, this.h);
  }
}