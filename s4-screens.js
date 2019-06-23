// Variables for the coordinates location of the four corners of platforms:
let platformX, platformY, platformYBottom, platformXFar;

// The player life points to subtract during enemy collision:
let pointToSubtract;                                                             



function displayStartScreen() {
  // Start screen with menu:
  background(50, 100, 150);
  
  fill(200, 50, 20, 100);
  rect(menuX, menuY, menuWidth, menuHeight, 30); 

  // Menu buttons:
  startButton.hoveredOver();
  infoButton.hoveredOver();
  startButton.show();
  infoButton.show();
  }




  function displayInfoScreen() {
    // Info-Button Screen with player instructions:
    background(200);
    
    // Header:
    textStyle(BOLD);
    text("INSTRUCTIONS", 500, 50);

    //Instructions:
    textSize(30);
    textStyle(NORMAL);
    text("Objective of the game: complete the game under the alotted time while collecting", 20, 150); 
    text("the most number of coins possible and avoiding the enemy sprites. The game is successfully", 20, 185);
    text("complete when player passes through the mario castle at the end of the game. The time left to", 20, 215);
    text("complete the mission is displayed in a count-down timer on the banner at the top of the screen,", 20, 245);
    text("along with the number of coins earned. Picking up mystery boxes gives the player a power up by", 20, 275); 
    text("increasing the right-scroll velocity; reducing the force of gravity on the player (leading to,", 20, 305);
    text("higher jumps), and augmenting coins by 3 times as normal. Controls: Press right arrow key to move", 20, 340);
    text("forward; press left arrow key to move back; press up arrow key to jump. You can also jump diagonally", 20, 375);
    text("by pressing both the up arrow, and left/right arrow keys. Press bottom arrow key to attack (kick)", 20, 410);
    text("enemies. Defeating Crabs typically require 2-3 blows, while defeating Koopas require only one.", 20, 445);
    text("Similarly, 'lightly' bumping into Crabs while not in attack mode (i.e, while not pressing down", 20, 480);
    text("arrow key), typically deals 1/3 blows to the player, while bumping into a koopa is fatal. Bumping,", 20, 515);
    text("into any enemy with full force can be fatal. As player gets closer to crabs, crabs will release", 20, 550);
    text("rocks' (on either side). Player should jump to avoid the rocks, as bumping into them increases the", 20, 585);
    text("force of gravity (leading to smaller jumps). In order to run propperly, program must be in", 20, 620);
    text("fullscreen. Player can't move past about half way of the screen, but the screen can scroll forward.", 20, 655);
    text("Moving back will pause the scrolling, but player is not allowed to move farhter than the left", 20, 690);
    text("edge of the screen.", 20, 722);

    // Buttons to return to menu:
    returnButton.hoveredOver();
    returnButton.show();
  }
  
  
  

  function displayGameScreen() {
    // Game Screen:
    
    /////////////////////////////////////////// SCROLL SCREEN ////////////////////////////////////////////////
    
    // Creates two identical copies of the preloaded background image, and positions them side by side for scrolling: 
    image(scrollImage, imageX1, 0, windowWidth, windowHeight);
    image(scrollImage, imageX2, 0, windowWidth, windowHeight);
  
    // Moves the x-position of each background image to the left of the canvas to 'scroll backwards': 
    imageX1 -= scrollSpeed;
    imageX2 -= scrollSpeed;
    
    // Continously loops the two images together, side by side as they move out of the frame to create a scrolling effect. 
    if (imageX1 < -windowWidth){
      imageX1 = windowWidth;
    }
    if (imageX2 < -windowWidth){
      imageX2 = windowWidth;
    }

    // For Scrolling of all Game elements besides the background: offset everything by player position.x variable).
    // Implemented after BETA-TESTING:
    translate(-player.position.x, 0);

  /////////////////////////////////////// END OF SCROLL SCREEN /////////////////////////////////////////////


    // Reads textfile for location of mario castle needed to complete the game:
    // BETA-TESTING: (Placed outside of the normal showTiles() function so that mario can 'layer' over top the castle):
    for (let y = 0; y < lettersHigh; y++) {
      for (let x = 0; x < lettersWide; x++) {
        if (tiles[x][y] === "W") {
          image(marioCastleImage, x * tileWidth, (y * tileHeight) - tileHeight*3.7, tileWidth*5, tileHeight*5);
          
          // If player has moved past half of the castle length, trigger Game-Complete Screen:
          if (player.x > (x*tileWidth) + (tileWidth/2) && player.yLoc <= platformY -100) {
            screenState = "Completed";
          }
        }
      }
    }

    // Displays player life and coins counters:
    counters()
    // Displays timer as long as seconds elapsed is more than 1:
    fill(255);
    text("Time Left: ", player.position.x + 800, 22)
    if (seconds >= 10) {
      text(minutes + ":" + seconds, player.position.x + 800, 50);
    }
    else if (seconds < 10) {
      text(minutes + ":" + "0" + seconds, player.position.x + 800, 50);
    }

    // Shows and updates player:
    player.updateShow(playerAvatar); 

    // For every letter in the textfile, show the corresponding game tile:
    for (let y = 0; y < lettersHigh; y++) {
      for (let x = 0; x < lettersWide; x++) {
        showTiles(tiles[x][y], x, y); 
      }
    }
    //////////////////////////////// KOOPA ENEMY SHOW(), MOVE() AND COLLISION /////////////////////////////////////
    
    // For each koopa in koopaArray, show, move and detect collision:
    for (let index = koopaArray.length -1; index > -1; index--) {
      let thisKoopa = koopaArray[index];
      thisKoopa.updateShow();
      thisKoopa.move();
      thisKoopa.enemyCollision();

      // Determines what to do if collision is true:
      if (thisKoopa.enemyCollision(player) === true) {
        // If playerState is attack mode (1), and thisKoopa has atleast 1 life: 
        if (playerState === 1) {
          if (thisKoopa.lifeArray.length >=1) {
            // Remove a life from the koopaArray. 
            thisKoopa.lifeArray.splice(thisKoopa.lifeArray[2], 1);
          }

          // Otherwise, If koopa has no lives left:
          else {
            // "Kill" thisKoopa by splicing it from koopaArray. 
            koopaArray.splice(koopaArray.indexOf(thisKoopa), 1);
          }

          //Turn playerState to normal:
          playerState = 0;
        }

        // Instead, if playerState is already normal (0), subract 1 from player life:
        else if (playerState === 0) {
          enemyColliding = true;
          let pointToSubtract = 1;
          player.playerCollision(pointToSubtract);
        }
      }
    }
    //////////////////////////////// CRAB ENEMY SHOW(), MOVE() AND COLLISION ////////////////////////////////
    
    // For each crab in crabArray, show and detect collision:
    for (let index = crabArray.length -1; index > -1; index--) {
      let thisCrab = crabArray[index];
      thisCrab.updateShow();
      thisCrab.enemyCollision();

      // For each crab, assign the corresponding rock object from rockArray for attack:
      let thisRock = rockArray[index];
      // If the player is within a range of 100 pixels of the crab, and the distance between player and the crab is close enough, release the rock:
      if (abs(thisCrab.y-player.yLoc) <= 50) {
        if (abs(thisCrab.x-player.x) <= 400) {
          thisRock.update();
          thisRock.collision(player);
        }
      }

      // Determines what to do if collision is true:
      if (thisCrab.enemyCollision(player) === true) {
        // If playerState is attack mode (1), and thisCrab has atleast 1 life: 
        if (playerState === 1) {
          if (thisCrab.lifeArray.length >=1) {
            // Remove a life from the CrabArray. 
            thisCrab.lifeArray.splice(thisCrab.lifeArray[2], 1);
          }

          // Otherwise, If crab has no lives left:
          else {
            // "Kill" thisCrab by splicing it from crabArray. 
            crabArray.splice(crabArray.indexOf(thisCrab), 1);
          }

          //Turn playerState to normal:
          playerState = 0;
        }

        // Instead, if playerState is already normal (0), subract 1 from player life:
        else if (playerState === 0) {
          enemyColliding = true;
          let pointToSubtract = 1;
          player.playerCollision(pointToSubtract);
        }
      }
    }
    ////////////////////////////////////////////// COINS ////////////////////////////////////////////////////

    // For every coin object in coinArray, show the coin and detect collision with player:
    for (let index = coinArray.length -1; index > -1; index--) {
      let coin = coinArray[index];
      coin.show();
      // If player is colliding with coin, collect the coin by splicing it from coinArray and augment player coins counter. 
      if (coin.colliding(player) === true) {
        
        // Play sound effect:
        soundEffect.play();

        coinArray.splice(coinArray.indexOf(coin), 1);
        coins ++;
      }
    }
    //////////////////////////////////////////// MYSTERY BOXES ///////////////////////////////////////////////

    // For every box object in boxArray, show the box and detect collision with player:
    for (let index = boxArray.length -1; index > -1; index--) {
      let box = boxArray[index];
      box.show();
      // If player is colliding with box, collect the box by splicing it from boxArray. 
      if (box.colliding(player) === true) {
        boxArray.splice(boxArray.indexOf(box), 1);
        // Augment player coins counter by 3 times the normal amount, and power up by reducing gravity, and increase player x velocity (to beat the timer faster):
        coins = coins+3;
        gravity -= 0.015;
        player.scrollVelocity = createVector(5, player.yLoc);
      }
    }
  }





  // A Function that loads different tile images accroding to type of tile in textfile:
  function showTiles(location, x, y) {

    // Mario-Flag:
    if (location === "T") {
      image(marioFlagImage, x * tileWidth, (y * tileHeight) - tileWidth, tileWidth, tileHeight*2.2);
    }

    // Ground:
    if (location === "G") {
      image(groundImage, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
    }

    // Platform:
    if (location  === "#") {

      // Establishes the 4 edges of each platform:
      platformX = x * tileWidth;                // Left most edge.
      platformY = y * tileHeight;               // Top most edge.
      platformYBottom = platformY+tileHeight;   // Bottom most edge.
      platformXFar = platformX+tileWidth;       // Right most edge.

      // Displays the platform:
      image(platformImage, platformX, platformY, tileWidth, tileHeight);
      
      // Checks for collision between player and 4 sides of each platform:
      player.collisionTop(platformX, platformY, platformXFar, platformYBottom);
      player.collisionLeft(platformX, platformY, platformXFar, platformYBottom);
      player.collisionRight(platformX, platformY, platformXFar, platformYBottom);
      player.collisionBottom(platformX, platformY, platformXFar, platformYBottom);
    } 
  }




function displayGameOverScreen() {
  // Game-Over Screen (displayed when player runs out of lives or timer runs out):
  background(80);
  textAlign(CENTER);
  
  // Notify player if game over was triggered by timer. (Implemented after recommendation from BETA-TESTING)
  textSize(40);
  fill(255);
  if (countUp === 0) {
    text("You ran out of time!", windowWidth/2, windowHeight/5);
  }

  // Game over message:
  textSize(80);  
  fill(255, 0, 0);
  text("GAME OVER", windowWidth/2, windowHeight/2);
  
  // Displays the number of total coins earned in game:
  textSize(50);
  fill(255);
  text("Coins earned: " + coins, windowWidth/2, windowHeight/1.5);

  textSize(30)
  // Offers option of restarting the game:
  returnButton.hoveredOver();
  returnButton.show();
}




function displayCompletedScreen() {
  // Game-Completed Screen (displayed when player finishes the game before timer runs out):
  background(80);
  textAlign(CENTER);
  textSize(80);

  fill(0, 0, 255);
  text("Mission Complete!", windowWidth/2, windowHeight/2);

  textSize(50);
  fill(255);
  text("Coins earned: " + coins, windowWidth/2, windowHeight/1.5);
  
  // Offers option of restarting the game:
  returnButton.hoveredOver();
  returnButton.show();
}