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

// if removing somethign from an array, always count backwards through an array: start at the back and iterate through to the front of the array. 


// http://molleindustria.github.io/p5.play/examples/index.html?fileName=camera.js
// http://molleindustria.github.io/p5.play/examples/index.html?fileName=sprites_with_sheet.js


/////////////////COLORS//////////////////////
// grass = (70, 150, 10)




// Player object:
let player;
let foe;

// Screen state variable:
let screenState;

// Button objects:
let startButton;
let infoButton;

// Menu coordinates and dimensions:
let menuX;
let menuY;
let menuWidth = 350;
let menuHeight = 250;

// Player variables:
let playerLives;
let coins;
let score;

// Image holders:
let playerAvatar;
let marioRun;
let marioJump;
let marioDuck;
let coinImage;

let level, lines;
let platform;

let gravity;
let yLocation, ground;
let yVelocity, yAcceleration;


function preload() {
  // Backgorund environment:
  //level = "assets/levels/1.txt";
  //lines = loadStrings(level);

  // Tiles:
  //platform = loadImage("assets/platform.png");

  // Player Avatars:
  marioRun = loadImage("assets/marioRun.png");
  marioJump = loadImage("assets/marioJump.png");
  marioDuck = loadImage("assets/marioDuck.png");

  // Game elements:
  coinImage = loadImage("assets/coin.png");
}



function setup() {
  createCanvas(windowWidth, windowHeight);

  textSize(40);

  // Start Screen: 
  screenState = "Start Screen";

  menuX = (windowWidth/2) - (menuWidth/2);
  menuY = (windowHeight/2) - (menuHeight/2);

  //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  yVelocity = 0;
  yAcceleration = 0;
  gravity = 0.1;
  ground = windowHeight-250;
  yLocation = ground;
  //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

  // Demo Sprite Object:
  player = new User(300, yLocation);
  foe = new Sprites(300, yLocation - 400);
  playerAvatar = marioDuck;

  // Menu Button Objects:
  textStyle(BOLD);
  startButton = new Button(menuX, menuY + menuHeight/5, "Start");
  infoButton = new Button(menuX, menuY + menuHeight/5 + 80, "Info");

  // Gameplay stuff ----------------------------------------------should i be declaring these in setup or the gamescreen?
  playerLives = 4;
  coins = 0;
  score = 0;
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



// Scrolling background??????????????????????????????????
function displayInfoScreen() {
  background(200);
}



function displayGameScreen() {
  background(70, 150, 100);

  foe.show();
  foe.glide();

  player.jump();
  player.updateShow(playerAvatar);

  playerLifeCounter();
  coinCounter();

  //showTiles(tiles[x][y], x, y); //////???????????????????????????????????????????implement 2 d array and grid generation
}



function showTiles(location, x, y) {
  if (location === "#") {
    image(platform, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
}



function displayGameOverScreen() {
  background(80);
  textAlign(CENTER);
  textSize(80);
  fill(255, 0, 0);
  text("GAME OVER", windowWidth/2, windowHeight/2);
  textSize(50);
  fill(255);
  text("Score " + score, windowWidth/2, windowHeight/2);
}



// Displays player lives:
function playerLifeCounter() {
  fill(190);
  rect(25, 25, 125, 40, 5);
  
  fill(0);
  textSize(25);
  text("Life : " + playerLives, 30, 55);
}

// Displays coins earned:
function coinCounter() {
  fill(190);
  rect(175, 25, 125, 40, 5);
  
  image(coinImage, 260, 27, 38, 38);

  fill(0);
  textSize(25);
  text("Coins : " + coins, 180, 55);
}