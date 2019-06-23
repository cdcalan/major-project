// Major Project
// Alina Sami
// Monday, April 29, 2019
//
// Extra for Experts:
// - learned how to use the p5.play library for animations and graphics. 
// - learned how the p5.collide2 library works, and how to use it in my program.
// - Used sub-classes and parent-classes for the first time.
// - devised collision and scoring code
// Beta-Testing:
// - switched from having an infinte scrolling game screen to one that moves right by the player position and speed.
// - Made stylistic changes to the layers that tiles are displayed at/messages to user.
// - Adjusted the speed of player.


// Screen-state and player-state variable:
let screenState, playerState;;

// Menu-button objects, coordinates and dimensions:
let startButton, infoButton, returnButton, menuX, menuY, menuWidth = 350, menuHeight = 250;

// Timer elements:
let timer, seconds, minutes;
let countUp = 76; // Time in game.

// Text file elements:
let level, lines, lettersHigh, lettersWide;

// Dimensions of each square in grid:
let tileHeight, tileWidth;

// Scrolling background:
let imageX1 = 0, imageX2, scrollImage, scrollSpeed = 1.2;

// Image holders:
let playerAvatar, marioRun, marioRunBack, marioJump, marioDuck, marioAttack, coinImage, platformImage;
let crabLeftImage, crabRightImage, rockImage, koopaImage, marioFlagImage, marioCastleImage, mysteryBox;
let coinAnimation;

// Arrays to store object classes:
let koopaArray = [], koopaCloud = [], crabArray = [], crabCloud = [], rockArray = [];
let coinArray = [], cloud = [], boxArray = [], boxCloud = [];

// Player points counters:
let playerLives, pLives, coins;

// Player jump physics variables:
let gravity, yLocation, ground, yVelocity, yAcceleration, isJumping;

// Sound effect:
let soundEffect;


function preload() {
  // Loading structure of game environment from text file:
  level = "assets/textFiles/1.txt";
  lines = loadStrings(level);

  // Load sound:
  soundEffect = loadSound("assets/Input-06.mp3");

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
  mysteryBox = loadImage("assets/environment/mysteryBox.jpg");

  // Player Avatars:
  marioRun = loadImage("assets/marios/marioRun.png");
  marioRunBack = loadImage("assets/marios/marioRunInverted.png");
  marioJump = loadImage("assets/marios/marioJump.png");
  marioDuck = loadImage("assets/marios/marioNormal.png");                        //find and fix
  marioAttack = loadImage("assets/marios/marioAttack.png");

  // Enemies:
  koopaImage = loadImage("assets/enemies/koopa.png");
  crabLeftImage = loadImage("assets/enemies/crab.png");
  rockImage = loadImage("assets/enemies/rock.png"); 
}




function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initializing timer:
  setInterval(timeIt, 1000);
  
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
  returnButton = new Button(windowWidth-400, 50, "Restart");

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
  tileWidth = width/camera;     // Only displays a portion of the entire text length. 
  
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

  ///////////////////////////////////////////// MYSTERY BOX GENERATION ///////////////////////////////////////
  
  // Reads text file for number of coins and pushes their coordinate location into an empty array:
  for (let y = 0; y < lettersHigh; y++) {
    for (let x = 0; x < lettersWide; x++) {
      if (tiles[x][y] === "M") {
        boxCloud.push([x, y]);
      }
    }
  }
  // For each coin in "cloud" array, create a new Coin object with its location, and push it into the coinArray:
  for (let i = boxCloud.length - 1; i > -1; i--) {
    let boxCoord = boxCloud[i];
    boxArray[i] = new Box(boxCoord[0]*tileWidth, boxCoord[1]*tileHeight);
  }

  ////////////////////////////////////INITIALIZING JUMP PHYSICS VARIABLES/////////////////////////////////////
  
  yVelocity = 0;
  yAcceleration = 0;
  gravity = 0.05;
  ground = windowHeight- 2.4*tileHeight;
  yLocation = ground;

  ///////////////////////////////////////////////// SPRITES ///////////////////////////////////////////////////

  // Create player and enemy Sprite Objects:
  player = new Player(300, yLocation);

  // Enemy crabs:
  crab1 = new Crab(31, 2);
  crab2 = new Crab(20, 4);
  crab3 = new Crab(2, 9);
  crab4 = new Crab(78, 9);
  crab5 = new Crab(29, 13); 
  crab6 = new Crab(70, 13); 
  
  // Rocks (part of crab's attack):
  rock1 = new Rock(31, 2);
  rock2 = new Rock(20, 4);
  rock3 = new Rock(2, 9);
  rock4 = new Rock(78, 9);
  rock5 = new Rock(29, 13); 
  rock6 = new Rock(70, 13);

  // Enemy Koopa:
  koopa1 = new Koopa(37, 4, 2798.3, 3208.3);
  koopa2 = new Koopa(57, 4, 4316.3, 4726.3);
  koopa3 = new Koopa(76, 4, 5758.400000000001, 6168.400000000001);   
  koopa4 = new Koopa(17, 9, 1280.3000000000001, 1690.3000000000001);
  koopa5 = new Koopa(36, 9, 2722.4, 3132.4);
  koopa6 = new Koopa(57, 9, 4316.3, 4726.3);

  // // Put each enemy object into an empty array to be called/deleted from:
  crabArray = [crab1, crab2, crab3, crab4, crab5, crab6];
  koopaArray = [koopa1, koopa2, koopa3, koopa4, koopa5, koopa6];
  rockArray = [rock1, rock2, rock3, rock4, rock5, rock6];
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
  // Detect mouse press on menu buttons to trigger the correct screen:
  if (screenState === "Start Screen") {
    if (startButton.clickedOn(mouseX, mouseY)) {
      screenState = "Game Screen";
    }
    if (infoButton.clickedOn(mouseX, mouseY)) {
      screenState = "Info Screen";
    }
  }
  if (screenState === "Info Screen") {
    if (returnButton.clickedOn(mouseX, mouseY)) {
      screenState = "Start Screen";
    }
  }

  if (screenState === "Game Over" || screenState === "Completed") {
    if (returnButton.clickedOn(mouseX, mouseY)) {
      document.location.reload();
    }
  }
}




// Seperate fuction for detecting up arrow key presses (jumps) in game screen mode:
function keyPressed(platformY) {
  if (screenState === "Game Screen") {
    if (keyCode === UP_ARROW) {
      
      // Only allow jumping if player was not already in the air:
      if (isJumping === false) { 
        player.yAccel = -5;
        // If player is accelerating upwards, calssify player as still jumping: 
        if (player.yAccel < 0) {
          isJumping = true;                                
        }
        // When player descends, allow player to jump again.
        else if (player.yAccel = 0) {
          isJumping = fasle;
        }
      }
      // If up arrow key is pressed while player is jumping, keep player yAcceleration to neutral.
      else if (isJumping === true) {
        player.yAccel = 0;
      }
    }
  }
}




// Counters are displayed on-screen and keep track of player lives and coin pickups:                  
function counters() {
  // Banner (offset by player position for scrolling screen):
  fill(0);
  rect(player.position.x-5, 0, windowWidth+5, 55);

  // Displaying Player lives:
  fill(190);
  rect(player.position.x+25, 15, 125, 37, 5);   
  fill(0);
  textSize(25);

  if (playerLives > 1) {
    pLives = playerLives-1;
  }
  else {
    pLives = playerLives;
  }

  text("Life : " + pLives, player.position.x+30, 45);
  
  // Coin pickups:
  fill(190);
  rect(player.position.x+175, 15, 125, 37, 5);
  image(coinImage, player.position.x+260, 17, 38, 35);
  fill(0);
  textSize(25);
  text("Coins : " + coins, player.position.x+180, 45);
}




// Count down timer that keeps track of the time left in the game:
function timeIt() {
  // Timer begins only when game begins:
  if (screenState === "Game Screen") {
    // If timer has accumulated more than 1 second, show timer (1 countUp = 1 second):
    if (countUp > 0) {
      countUp--;
    }
    // If game is still on when timer has reached zero, trigger game over screen:
    else if (countUp === 0) {
      screenState = "Game Over";
    }
    
    minutes = floor(countUp/60);
    seconds = countUp % 60;

    return minutes, seconds;
  }
}




// Generating empty 2-D Array the length of the game text file (framework for grid the game is displayed on):
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