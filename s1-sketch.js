// Major Project
// Alina Sami
// Monday, April 29, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
/////////////////COLORS//////////////////////
// grass = (70, 150, 10)




// Screen state variable:
let screenState;

// Button objects:
let startButton, infoButton;

// Menu coordinates and dimensions:
let menuX, menuY, menuWidth = 350, menuHeight = 250;

// Player variables:
let playerLives, coins, score;

// Image holders:
let playerAvatar, marioRun, marioRunBack, marioJump, marioDuck, coinImage;

let level, lines;
let platform;
let lettersHigh, lettersWide, tileHeight, tileWidth;


// Jump physics
let gravity, yLocation, ground, yVelocity, yAcceleration;

// Scrolling
let imageX1 = 0, imageX2, scrollImage, scrollSpeed = 1.5, stationaryObject;

let collision;


function preload() {
  // Backgorund environment:
  level = "assets/textFiles/1.txt";
  lines = loadStrings(level);

  // Tiles:
  platform = loadImage("assets/environment/platform.png");

  // BG screen:
  scrollImage = loadImage("assets/environment/scrollImage.jpg");

  // Player Avatars:
  marioRun = loadImage("assets/marios/marioRun.png");
  marioRunBack = loadImage("assets/marios/marioRunInverted.png");
  marioJump = loadImage("assets/marios/marioJump.png");
  marioDuck = loadImage("assets/marios/marioDuck.png");

  // Game elements:
  coinImage = loadImage("assets/coin.png");
}




function setup() {
  createCanvas(windowWidth, windowHeight);
  let camera = 20;

  lettersHigh = lines.length;
  lettersWide = lines[0].length;

  tileHeight = height/lettersHigh;
  tileWidth = width/camera;

  tiles = twoDArray(lettersWide, lettersHigh);

  for (let y = 0; y < lettersHigh; y++) {     /////////////add the scrp;ll text file by looking at the first 30 
    for (let x = 0; x < 80; x++) {
      let theTile = lines[y][x];
      tiles[x][y] = theTile;     // assigns/ puts a letter of the string (line) of the text file to a spot in the empty array.
    }
  }

  stationaryObject = new Constant(0, 0);

  imageX2 = windowWidth;

  textSize(40);

  // Start Screen: 
  screenState = "Start Screen";

  menuX = (windowWidth/2) - (menuWidth/2);
  menuY = (windowHeight/2) - (menuHeight/2);

  //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  yVelocity = 0;
  yAcceleration = 0;
  gravity = 0.1;
  ground = windowHeight- 2.4*tileHeight;
  yLocation = ground;
  //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

  // Demo Sprite Object:
  player = new Player(300, yLocation);
  foe = new Sprites(300, yLocation - 400);
  playerAvatar = marioDuck;
  collision = false;

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
  //console.log(tileHeight, ground, windowHeight, yLocation);

  if (screenState === "Start Screen") {
    displayStartScreen();
  }
  else if (screenState === "Game Screen") {
    displayGameScreen();
    // if (collison === true) {   
    //   console.log("done");
    //   this.yVel = 0;
    //   this.yAccel = +5;
    //   playerLives -= 1;
    // }
    // else {
    //   console.log("nothing");
    // }
    //console.log("collision " + collision + ", player.x " + player.x + ", foe.x " + foe.x);
  }

  else if (screenState === "Info Screen") {
    displayInfoScreen();
  }
  else if (screenState === "Game Over") {
    displayGameOverScreen();
  }

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




let isJumping = false;

function keyPressed() {
  if (screenState === "Game Screen") {
    if (keyCode === UP_ARROW) {
      isJumping = true;
      if (isJumping === true) {
        playerAvatar = marioJump;
        player.yAccel = -5;
      }
    }
    else {
      isJumping = false;
    }
  }
}




// Displays player lives:                  
function playerLifeCounter() {
  fill(190);
  rect(stationaryObject.position.x+25, 20, 125, 40, 5);   // offsets the x position of counter displayed on screen by the scroll screen rate, thereby, making the counter "stationary" on screen while the rest of the game moves.
  
  fill(0);
  textSize(25);
  text("Life : " + playerLives, stationaryObject.position.x+30, 50);
}


// Displays coins earned:
function coinCounter() {
  fill(190);
  rect(stationaryObject.position.x+175, 20, 125, 40, 5);
  
  image(coinImage, stationaryObject.position.x+260, 22, 38, 38);

  fill(0);
  textSize(25);
  text("Coins : " + coins, stationaryObject.position.x+180, 50);
}


// Displays the time left in the round (resets at each level/game):
function countdownTimer() {

}




// Empty 2-D Array:
function twoDArray(columns, rows) {
  let thegrid = [];
  for (let c = 0; c < columns; c++) {
    thegrid.push([]);
    for (let r = 0; r < rows; r++) {
      thegrid[c].push(0);
    }
  }
  return thegrid;
}


// NEXT:
// - jump with gravity
// - collision detection
// - timer
// - other sprites