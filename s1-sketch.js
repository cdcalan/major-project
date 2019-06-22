// Major Project
// Alina Sami
// Monday, April 29, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
/////////////////COLORS//////////////////////




let timer = 1000; // 1 minute
let isJumping;

// Screen-state and player-state variable:
let screenState, playerState;;

// Menu-button objects, coordinates and dimensions:
let startButton, infoButton, menuX, menuY, menuWidth = 350, menuHeight = 250;

// Text file elements:
let level, lines, lettersHigh, lettersWide;

// Dimensions of each square in grid:
let tileHeight, tileWidth;

// Scrolling background:
let imageX1 = 0, imageX2, scrollImage, scrollSpeed = 1.2, stationaryObject;

// Image holders:
let playerAvatar, marioRun, marioRunBack, marioJump, marioDuck, marioAttack, coinImage, platformImage;
let crabLeftImage, crabRightImage, rockImage, koopaImage, marioFlagImage, marioCastleImage;
let coinAnimation;

// Arrays to store object classes:
let koopaArray = [], cabArray = [], rockArray = [], coinArray = [], cloud = [];

// Player points counters:
let playerLives, coins;

// Player jump physics variables:
let gravity, yLocation, ground, yVelocity, yAcceleration;





function preload() {
  // Loading structure of game environment from text file:
  level = "assets/textFiles/1.txt";
  lines = loadStrings(level);

  // Background scenery:
  scrollImage = loadImage("assets/environment/marioBg1.jpg");
  coinImage = loadImage("assets/coin.png");
  
  // Animating coin pick-up images:
  coinAnimation = loadAnimation("assets/coins/coin1.png", "assets/coins/coin2.png", "assets/coins/coin3.png", "assets/coins/coin4.png", "assets/coins/coin5.png", "assets/coins/coin6.png");

  // Tiles:
  groundImage = loadImage("assets/environment/groundArt.png");
  platformImage = loadImage("assets/environment/platform.png");
  marioFlagImage = loadImage("assets/environment/marioFlag.png");
  marioCastleImage = loadImage("assets/environment/marioCastle.gif");

  // Player Avatars:
  marioRun = loadImage("assets/marios/marioRun.png");
  marioRunBack = loadImage("assets/marios/marioRunInverted.png");
  marioJump = loadImage("assets/marios/marioJump.png");
  marioDuck = loadImage("assets/marios/marioDuck.png");                        //find and fix
  marioAttack = loadImage("assets/marios/marioAttack.png");

  // Enemies:
  koopaImage = loadImage("assets/enemies/koopa.png");
  crabLeftImage = loadImage("assets/enemies/crab.png");
  rockImage = loadImage("assets/enemies/rock.png");
  squishedKoopa = loadImage("assets/enemies/squished_koopa.png");                      //may delete
  squishedCrab = loadImage("assets/enemies/squished_crab.png");                        //may delete  
}





function setup() {
  createCanvas(windowWidth, windowHeight);

  stationaryObject = new Constant(0, 0);                   ///??? might change this into mario himself.
  
  // Set player state to normal mode:
  playerState = 0;  

  // Start Screen: 
  screenState = "Start Screen";
  menuX = (windowWidth/2) - (menuWidth/2);
  menuY = (windowHeight/2) - (menuHeight/2);
  textSize(40);
  textStyle(BOLD);
  startButton = new Button(menuX, menuY + menuHeight/5, "Start");
  infoButton = new Button(menuX, menuY + menuHeight/5 + 80, "Info");

  imageX2 = windowWidth;

  // Slow down the rate of frame-by-frame animation for coin pick-ups:
  coinAnimation.frameDelay = 6;

  // Initializing gameplay variables:
  playerLives = 4;
  coins = 0;
  score = 0;
  playerAvatar = marioDuck;
  isJumping = false;
  enemyColliding = false;

  /////////////////////////////////////////INITIALIZING GRID/////////////////////////////////////////////////
  
  // Looks the level-text-file at a rate of 20 columns per screen length:
  let camera = 20; 
  // In text file:
  lettersHigh = lines.length;
  lettersWide = lines[0].length;
  // On Game Screen:
  tileHeight = height/lettersHigh;
  tileWidth = width/camera;             // Only displays a portion of the entire text length. 
  
  // Creates an empty array with dimensions of the text file:
  tiles = twoDArray(lettersWide, lettersHigh);
  // Assigns a letter from each line of text file to a spot in the empty array:
  for (let y = 0; y < lettersHigh; y++) {      
    for (let x = 0; x < 105; x++) {
      let theTile = lines[y][x];
      tiles[x][y] = theTile;    
    }
  }

//////////////////////////////////////////////COIN GENERATION////////////////////////////////////////////////
  
// Reads text file for number of coins and pushes their coordinate location into an empty array:
  for (let y = 0; y < lettersHigh; y++) {
    for (let x = 0; x < lettersWide; x++) {
      if (tiles[x][y] === "C") {
        cloud.push([x, y]);
      }
    }
  }
  // For each coin in "cloud" array, create a new Coin object with its location, and push it into the coinArray:
  for (let i = cloud.length - 1; i > -1; i--) {
    let coinCoord = cloud[i];
    coinArray[i] = new Coin(coinCoord[0]*tileWidth, coinCoord[1]*tileHeight);
  }

////////////////////////////////////INITIALIZING JUMP PHYSICS VARIABLES//////////////////////////////////////
  
  yVelocity = 0;
  yAcceleration = 0;
  gravity = 0.05;
  ground = windowHeight- 2.4*tileHeight;
  yLocation = ground;

  //////////////////////////////////////////////////SPRITES//////////////////////////////////////////////////

  // Create player and enemy Sprite Objects:
  player = new Player(300, yLocation);
  crab1 = new Crab(29, 2);
  crab2 = new Crab(19, 4);
  crab3 = new Crab(2, 9);
  crab4 = new Crab(19, 13);
  crab5 = new Crab(32, 13); 
  koopa1 = new Koopa(16, 9, 810.4, 1150);
  koopa2 = new Koopa(23, 9, 810.4, 1164.95);
  koopa3 = new Koopa(40, 4, 2026, 2428.6);   //apparently works with just one now?
  koopa4 = new Koopa(43, 9, 2177.95, 2377.95);
  koopa5 = new Koopa(56, 9, 2836.4, 3036.4);
  koopa6 = new Koopa(58, 4, 2937.7, 3140.3);
  rock1 = new Rock(29, 2);
  rock2 = new Rock(19, 4);
  rock3 = new Rock(2, 9);
  rock4 = new Rock(19, 13);
  rock5 = new Rock(32, 13);

  // Put each enemy object into an empty array to be called/deleted from:
  crabArray = [crab1, crab2, crab3, crab4, crab5];
  koopaArray = [koopa1, koopa2, koopa3, koopa4, koopa5, koopa6];
  rockArray = [rock1, rock2, rock3, rock4, rock5];
}





function draw() {

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




function mousePressed() {
  // Detect mouse press on menu buttons:
  if (screenState === "Start Screen") {
    if (startButton.clickedOn(mouseX, mouseY)) {
      screenState = "Game Screen";
    }
    if (infoButton.clickedOn(mouseX, mouseY)) {
      screenState = "Info Screen";
    }
  }
}




// Seperate fuction for detecting up arrow key presses (jumps) in game screen mode:
function keyPressed(platformY) {
  if (screenState === "Game Screen") {
    if (keyCode === UP_ARROW) {
      playerAvatar = marioJump;
      if (player.yLoc === ground || player.yAccel === 0 || player.yLoc === platformY) {
        player.yAccel = -5;
        if (player.yAccel <= 0) {
          isJumping = true;                                                                  ///
        }
      }
      else {
        isJumping = false;
      }
    }
  }
}




// Counters are displayed on-screen and keep track of player lives and coin pickups:                  
function counters() {
  // Banner (offset by player position for scrolling screen):
  fill(0);
  rect(player.position.x-5, 0, windowWidth+5, 55);

  // Player lives:
  fill(190);
  rect(player.position.x+25, 15, 125, 37, 5);   
  fill(0);
  textSize(25);
  text("Life : " + playerLives, player.position.x+30, 45);
  
  // Coin pickups:
  fill(190);
  rect(player.position.x+175, 15, 125, 37, 5);
  image(coinImage, player.position.x+260, 17, 38, 35);
  fill(0);
  textSize(25);
  text("Coins : " + coins, player.position.x+180, 45);
}




// A count-down "timer" that displays the time left in the game: 
function countDown(timer) {

  // Subtract one second from timer each time frameCount is divisible by 60 (60 = 1 second):
  if (frameCount % 60 === 0 && timer > 0) { 
    timer --;
  }

  // If timer has run out and game is still unfinished, trigger game over:
  if (timer === 0) {
    if (screenState === "Game Screen") {
      text("GAME OVER", width/2, height*0.7);
    }
  }
}




// Empty 2-D Array the length of the game text file (framework for grid the game is displayed on):
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