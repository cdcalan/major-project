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
// https://www.raywenderlich.com/2891-how-to-make-a-platform-game-like-super-mario-brothers-part-1
// https://eloquentjavascript.net/16_game.html
// https://hackclub.com/workshops/platformer
// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection


/////////////////COLORS//////////////////////
// grass = (70, 150, 10)




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
let marioRun, marioRunBack, marioJump, marioDuck;
let coinImage;

let level, lines;
let platform;
let lettersHigh, lettersWide, tileHeight, tileWidth;



let gravity;
let yLocation, ground;
let yVelocity, yAcceleration;

let imageX1 = 0, imageX2;
let scrollImage, scrollSpeed = 1.5;

let stationaryObject;
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
    if (collison === true) {
      console.log("done");
      this.yVel = 0;
      this.yAccel = +5;
      playerLives -= 1;
    }
    else {
      console.log("nothing");
    }
    console.log("collision " + collision + ", player.x " + player.x + ", foe.x " + foe.x);
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



// Scrolling background??????????????????????????????????
function displayInfoScreen() {
  background(200);
}



function displayGameScreen() {
  //background(70, 150, 100);

  //////////////////SCROLL SCREEN//////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Creates two identical copies of the preloaded background image, and positions them side by side. 
  image(scrollImage, imageX1, 0, windowWidth, windowHeight);
  image(scrollImage, imageX2, 0, windowWidth, windowHeight);

  // Moves the x-pos. of each background image to the left of the canvas to 'scroll backwards'. 
  imageX1 -= scrollSpeed;
  imageX2 -= scrollSpeed;
  
  // Continously loops the two images together, side by side as they move out of the frame to create a scrolling effect. 
  if (imageX1 < -windowWidth){
    imageX1 = windowWidth;
  }
  if (imageX2 < -windowWidth){
    imageX2 = windowWidth;
  }
  ////////////////// E N D ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // For Scroll:
  translate(-stationaryObject.position.x, 0);
  stationaryObject.move();
  stationaryObject.show();

  //foe.glide(); ////////////////////////////////////////uncomment
  foe.hasCollided(player);
  foe.show();

  player.updateShow(playerAvatar);

  playerLifeCounter();

  coinCounter();
  
  for (let y = 0; y < lettersHigh; y++) {
    for (let x = 0; x < lettersWide; x++) {
      showTiles(tiles[x][y], x, y); //////???????????????????????????????????????????implement 2 d array and grid generation
    }
  }
}


/////////////////////////////////////////////////////////////////////currently fixing///////////////////////////////

function showTiles(location, x, y) {
  if (location === "#") {
    for (let i = x; i < windowWidth; i += 300) {
      image(platform, i * tileWidth, y * tileHeight, tileWidth, tileHeight);
      // if (player.x > i * tileWidth && player.x < i * tileWidth+tileWidth && player.y > y * tileHeight && player.y < y * tileHeight+tileHeight) {
      //   collision  = true;
      // if true, 
      //    make mario fall (gravity). 
      //    subtract 1 life.
      //}
    }
  }
}
/////////////////////////////////////////////////////////////////////currently fixing///////////////////////////////


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