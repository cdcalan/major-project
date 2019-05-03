// Major Project
// Alina Sami
// Monday, April 29, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// To Do:
// - create sprites classes
// - use parent and subclasses of sprites.
// - create background txt file (?)
// - create a start screen with menu buttons: start, info
// - Extra: loading animation? (maybe use css)?



// Player object:
let player;

// Screen state variable:
let screenState;

// Button objects:
let startButton;
let infoButton;

// Menu coordinates and dimensions:
let menuX;
let menuY;
let menuWidth = 250;
let menuHeight = 200;



function setup() {
  createCanvas(windowWidth, windowHeight);

  textSize(40);

  screenState = "Start Screen";

  menuX = (windowWidth/2) - (menuWidth/2);
  menuY = (windowHeight/2) - (menuHeight/2);

  // Demo Sprite Object:
  player = new User(300, windowHeight-250);

  // Menu Button Objects:
  startButton = new Button(menuX, menuY + 20, "Start");
  infoButton = new Button(menuX, menuY + 95, "Info");
  console.log(menuX, menuY);
}

function draw() {
  background(220);

  if (screenState === "Start Screen") {
    displayStartScreen();
  }
  else if (screenState === "Game Screen") {
    displayGameScreen();
  }
  else if (screenState === "Info Screen") {
    displayInfoScreen();
  }
  else if (screenState === "Game Over") {
    displayGameOverScreen();
  }
  // Optional: level up screens? or just messages?
  
  player.show();
  player.move();
  player.jump();
}



function mousePressed() {
  if (screenState === "Start Screen") {
    if (startButton.clickedOn(mouseX, mouseY)) {
      screenState = "Game Screen";
    }
    if (infoButton.clickedOn(mouseX, mouseY)) {
      screenState = "Info Screen";
    }
  }
}



//SCREENS-----------------------------------------------------------------------------------------------------------------------------
function displayStartScreen() {
  background(50, 100, 150);

  fill(200, 50, 20, 100);
  rect(menuX, menuY, menuWidth, menuHeight, 30); 

  startButton.show();
  infoButton.show();

}



function displayInfoScreen() {
  background(200);
}



function displayGameScreen() {
  background(70, 150, 100);
}



function displayGameOverScreen() {
  background(80);
  textSize(80);
  textAlign(CENTER);
  fill(255, 0, 0);
  text("GAME OVER", windowWidth/2, windowHeight/2);
}

/////////////////COLORS//////////////////////
// grass = (70, 150, 10)