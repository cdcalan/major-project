// Major Project
// Alina Sami
// Monday, April 29, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
/////////////////COLORS//////////////////////
// grass = (70, 150, 10)

let timer = 100; // 1 minute

let ballArray = [];

// Screen state variable:
let screenState;

// Button objects:
let startButton, infoButton;

// Menu coordinates and dimensions:
let menuX, menuY, menuWidth = 350, menuHeight = 250;

// Player variables:
let playerLives, coins, score;

// Image holders:
let playerAvatar, marioRun, marioRunBack, marioJump, marioDuck, marioAttack, coinImage;

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

let marioFlagImage;
let marioCastleImage;

let koopa1, crab1;

let cloud = [];
let coinArray = [];

let playerState;

// let crabArray = [new Crab(29, 2), new Crab(19, 4), new Crab(2, 9), new Crab(19, 13), new Crab(32, 13), new Crab(52, 13)];
// let koopaArray = [new Koopa(16, 9, 810.4, 1150), new Koopa(23, 9, 810.4, 1164.95, 4), new Koopa(40, 4, 2026, 2428.6, 1), new Koopa(43, 9, 2177.95, 2377.95, 5), new Koopa(43, 9, 2177.95, 2377.95, 5), new Koopa(56, 9, 2836.4, 3036.4, 6), new Koopa(58, 4, 2937.7, 3140.3, 2)];
let crabArray = [];
let koopaArray = [];

function preload() {
  // Backgorund environment:
  level = "assets/textFiles/1.txt";
  lines = loadStrings(level);

  // Tiles:
  groundImage = loadImage("assets/environment/groundArt.png");
  platformImage = loadImage("assets/environment/platform.png");
  marioFlagImage = loadImage("assets/environment/marioFlag.png");
  marioCastleImage = loadImage("assets/environment/marioCastle.gif");

  // BG screen:
  scrollImage = loadImage("assets/environment/marioBg1.jpg");

  // Player Avatars:
  marioRun = loadImage("assets/marios/marioRun.png");
  marioRunBack = loadImage("assets/marios/marioRunInverted.png");
  marioJump = loadImage("assets/marios/marioJump.png");
  marioDuck = loadImage("assets/marios/marioDuck.png");
  marioAttack = loadImage("assets/marios/marioAttack.png");

  // Enemies:
  koopaImage = loadImage("assets/enemies/koopa.png");
  crabLeftImage = loadImage("assets/enemies/crab.png");
  rockImage = loadImage("assets/enemies/rock.png");
  squishedKoopa = loadImage("assets/enemies/squished_koopa.png");
  squishedCrab = loadImage("assets/enemies/squished_crab.png");

  coinImage = loadImage("assets/coin.png");

  // Game elements:
  coinAnimation = loadAnimation("assets/coins/coin1.png", "assets/coins/coin2.png", "assets/coins/coin3.png", "assets/coins/coin4.png", "assets/coins/coin5.png", "assets/coins/coin6.png");
  //"assets/coins/coin3.png", "assets/coins/coin4.png", );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  collideDebug(true);
  coinAnimation.frameDelay = 6;
  playerState = 0;  //normal

  enemyColliding = false;

  let camera = 20;   // Letters wide

  lettersHigh = lines.length;
  lettersWide = lines[0].length;

  tileHeight = height/lettersHigh;
  tileWidth = width/camera;   // bc i dont watn to display the entire text file at once; only a section of it.

  tiles = twoDArray(lettersWide, lettersHigh);

  for (let y = 0; y < lettersHigh; y++) {     /////////////add the scrp;ll text file by looking at the first 30 
    for (let x = 0; x < 100; x++) {
      let theTile = lines[y][x];
      tiles[x][y] = theTile;     // assigns/ puts a letter of the string (line) of the text file to a spot in the empty array.
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////
  for (let y = 0; y < lettersHigh; y++) {
    for (let x = 0; x < lettersWide; x++) {
      if (tiles[x][y] === "C") {
        cloud.push([x, y]);
      }
    }
  }
  for (let i = cloud.length - 1; i > -1; i--) {
    let coinCoord = cloud[i];
    coinArray[i] = new Coin(coinCoord[0]*tileWidth, coinCoord[1]*tileHeight);
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////
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
  gravity = 0.05;
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
  koopa1 = new Koopa(16, 9, 810.4, 1150);
  koopa2 = new Koopa(23, 9, 810.4, 1164.95, 4);
  koopa3 = new Koopa(40, 4, 2026, 2428.6, 1);   //apparently works with just one now?
  koopa4 = new Koopa(43, 9, 2177.95, 2377.95, 5);
  koopa5 = new Koopa(56, 9, 2836.4, 3036.4, 6);
  koopa6 = new Koopa(58, 4, 2937.7, 3140.3, 2);

  rock1 = new Rock();
  rock2 = new Rock();
  rock3 = new Rock();
  ballArray.push(rock1, rock2, rock3);

  crabArray = [crab1, crab2, crab3, crab4, crab5, crab6];
  koopaArray = [koopa1, koopa2, koopa3, koopa4, koopa5, koopa6];

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
    displayGameScreen();
  }

  else if (screenState === "Info Screen") {
    displayInfoScreen();
  }
  else if (screenState === "Game Over") {
    displayGameOverScreen();
  }
  else if (screenState === "Completed") {
    displayCompletedScreen();
  }

}

function mouseClicked(mouseX, mouseY) {
  console.log(mouseX, mouseY);
}

// function timestamp() {

// }




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


function keyPressed(platformY) {
  if (screenState === "Game Screen") {
    if (keyCode === UP_ARROW) {
      if (player.yLoc === ground || player.yAccel === 0 || player.yLoc === platformY) {
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
  rect(stationaryObject.position.x+25, 15, 125, 37, 5);   // offsets the x position of counter displayed on screen by the scroll screen rate, thereby, making the counter "stationary" on screen while the rest of the game moves.
  
  fill(0);
  textSize(25);
  text("Life : " + playerLives, stationaryObject.position.x+30, 45);
}


// Displays coins earned:
function coinCounter() {
  fill(190);
  rect(stationaryObject.position.x+175, 15, 125, 37, 5);
  
  image(coinImage, stationaryObject.position.x+260, 17, 38, 35);

  fill(0);
  textSize(25);
  text("Coins : " + coins, stationaryObject.position.x+180, 45);
}


function countDown() {
  // frameCount --> this keeps track of the number of times the program has gone throught the code, 60 = 1 second
  // % ---> this is the Modulo operator, it divides numbers and evaluates to the remainder: 17 % 5 evaluates to 2 remainder
  // this can be used to determine if the number on the left is divisible by the number on the right
  if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer --;
  }
  if (timer == 0) {
    text("GAME OVER", width/2, height*0.7);
  }
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