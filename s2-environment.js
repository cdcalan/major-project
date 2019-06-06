class Constant {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.width = windowWidth;
    this.height = 50;

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
