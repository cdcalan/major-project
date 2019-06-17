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
let platformImage;
let lettersHigh, lettersWide, tileHeight, tileWidth;


// Jump physics
let gravity, yLocation, ground, yVelocity, yAcceleration;

// Scrolling
let imageX1 = 0, imageX2, scrollImage, scrollSpeed = 1.2, stationaryObject;

let collision;
let isJumping;
let fall;

let theCoin;


let coinAnimation;

let crabLeftImage;
let crabRightImage;
let rockImage;
let koopaImage;

let koopa1, crab1;
let resizedCoin;

function preload() {
  // Backgorund environment:
  level = "assets/textFiles/1.txt";
  lines = loadStrings(level);

  // Tiles:
  groundImage = loadImage("assets/environment/groundArt.png");
  platformImage = loadImage("assets/environment/platform.png");

  // BG screen:
  scrollImage = loadImage("assets/environment/marioBg1.jpg");

  // Player Avatars:
  marioRun = loadImage("assets/marios/marioRun.png");
  marioRunBack = loadImage("assets/marios/marioRunInverted.png");
  marioJump = loadImage("assets/marios/marioJump.png");
  marioDuck = loadImage("assets/marios/marioDuck.png");

  // Enemies:
  koopaImage = loadImage("assets/enemies/koopa.png");
  crabLeftImage = loadImage("assets/enemies/crabLeft.png");
  rockImage = loadImage("assets/enemies/rock.png");

  coinImage = loadImage("assets/coin.png");

  // Game elements:
  coinAnimation = loadAnimation("assets/coins/coin0.png", "assets/coins/coin1.png", "assets/coins/coin2.png", "assets/coins/coin3.png", "assets/coins/coin4.png", "assets/coins/coin5.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  let camera = 20;   // Letters wide

  lettersHigh = lines.length;
  lettersWide = lines[0].length;

  tileHeight = height/lettersHigh;
  tileWidth = width/camera;   // bc i dont watn to display the entire text file at once; only a section of it.

  tiles = twoDArray(lettersWide, lettersHigh);

  for (let y = 0; y < lettersHigh; y++) {     /////////////add the scrp;ll text file by looking at the first 30 
    for (let x = 0; x < 80; x++) {
      let theTile = lines[y][x];
      tiles[x][y] = theTile;     // assigns/ puts a letter of the string (line) of the text file to a spot in the empty array.
    }
  }

  stationaryObject = new Constant(0, 0);   ///??? might change this into mario himself.

  imageX2 = windowWidth;

  textSize(40);

  // Start Screen: 
  screenState = "Start Screen";

  menuX = (windowWidth/2) - (menuWidth/2);
  menuY = (windowHeight/2) - (menuHeight/2);

  //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  yVelocity = 0;
  yAcceleration = 0;
  gravity = 0.068;
  ground = windowHeight- 2.4*tileHeight;
  yLocation = ground;
  //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

  // Demo Sprite Object:
  player = new Player(300, yLocation);
  crab1 = new Crab(29, 2);
  crab2 = new Crab(19, 4);
  crab3 = new Crab(2, 9);
  crab4 = new Crab(19, 13);
  crab5 = new Crab(32, 13); 
  crab6 = new Crab(52, 13);
  koopa1 = new Koopa(40, 4, 2026, 2428.6, 1);   //apparently works with just one now?
  koopa2 = new Koopa(58, 4, 2937.7, 3140.3, 2);
  koopa3 = new Koopa(16, 9, 810.4, 1000, 3);
  koopa4 = new Koopa(23, 9, 1164.95, 1364.95, 4);
  koopa5 = new Koopa(43, 9, 2177.95, 2377.95, 5);
  koopa6 = new Koopa(56, 9, 2836.4, 3036.4, 6);
  
  playerAvatar = marioDuck;
  collision = false;
  isJumping = false;
  fall = false;

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
    console.log("jumping? " + isJumping);
    displayGameScreen();
  }

  else if (screenState === "Info Screen") {
    displayInfoScreen();
  }
  else if (screenState === "Game Over") {
    displayGameOverScreen();
  }

}

function mouseClicked(mouseX, mouseY) {
  console.log(mouseX, mouseY);
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


function keyPressed() {
  if (screenState === "Game Screen") {
    if (keyCode === UP_ARROW) {
      if (player.yLoc === ground) {
        isJumping = true;  ///
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