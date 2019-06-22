// Variables for the coordinates location of the four corners of platforms:
let platformX, platformY, platformYBottom, platformXFar;

let hats;                                                                //tester

function displayStartScreen() {
  // Start screen with menu:
  background(50, 100, 150);
  
  fill(200, 50, 20, 100);
  rect(menuX, menuY, menuWidth, menuHeight, 30); 

  startButton.hoveredOver();
  infoButton.hoveredOver();
  startButton.show();
  infoButton.show();
  }




  function displayInfoScreen() {
    // Info-Button Screen with player instructions:
    background(200);
    //text("To jump forwards or backwards, it is best if you hold down the jump key (UP ARROW) before you press the direction key (LEFT ARROW or RIGHT ARROW).")
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
    translate(-player.position.x, 0);

  /////////////////////////////////////// END OF SCROLL SCREEN ///////////////////////////////////////////////
   
  // koopa1.move(16, 9, 810.4, 1150);
    // koopa2.move(23, 9, 810.4, 1164.95);
    // koopa3.move(40, 4, 1880, 2200);
    // koopa4.move(43, 9, 1815, 2190);
    // koopa5.move(56, 9, 2830, 3200);
    // koopa6.move(58, 4, 2900, 3200);

    // Reads textfile for location of mario castle needed to complete the game:
    // (Placed outside of the normal showTiles() function so that mario can 'layer' over top the castle):
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

    // // Trigger Game Over if player dies:
    // if (playerLives === 0) {
    //   screenState = "Game Over";
    // }  


    // For every letter in the textfile, show the corresponding game tile:
    for (let y = 0; y < lettersHigh; y++) {
      for (let x = 0; x < lettersWide; x++) {
        showTiles(tiles[x][y], x, y); 
      }
    }

    /////////////////////////////////KOOPA ENEMY SHOW(), MOVE() AND COLLISION//////////////////////////////////////
    
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
            thisKoopa.lifeArray.splice(thisKoopa.lifeArray.indexOf(thisKoopa.lifeArray.length-1), 1);
          }
          
          // Otherwise, If koopa has no lives left:
          else {
            // "Kill" thisKoopa by splicing it from koopaArray. 
            koopaArray.splice(koopaArray.indexOf(thisKoopa), 1);
          }
          
          //Agument player score, and turn playerState to normal:
          hats++;
          playerState = 0;
        }

        // If playerState is normal (0), subract 1 from player life:
        else if (playerState === 0) {
          enemyColliding = true;
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
            thisCrab.lifeArray.splice(thisCrab.lifeArray.indexOf(thisCrab.lifeArray.length-1), 1);
          }

          // Otherwise, If crab has no lives left:
          else {
            // "Kill" thisCrab by splicing it from crabArray. 
            crabArray.splice(crabArray.indexOf(thisCrab), 1);
          }

          //Agument player score, and turn playerState to normal:
          hats++;
          playerState = 0;
        }

        // If playerState is normal (0), subract 1 from player life:
        else if (playerState === 0) {
          enemyColliding = true;
        }
      }
    }




    // Subtract 1 from playerLives if player collides with any enemy:                    //???
    if (enemyColliding === true) {
      console.log("enemyColliding");
      playerLives -= 1;
      enemyColliding = false;
    }

    ////////////////////////////////////////////// COINS ////////////////////////////////////////////////////

    // For every coin object in coinArray, show the coin and detect collision with player:
    for (let index = coinArray.length -1; index > -1; index--) {
      let coin = coinArray[index];
      coin.show();
      // If player is colliding with coin, collect the coin by splicing it from coinArray and augment player coins counter. 
      if (coin.colliding(player) === true) {
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




  
  // Loads different tile images accroding to type of tile in textfile:
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

      platformX = x * tileWidth;
      platformY = y * tileHeight;
      platformYBottom = platformY+tileHeight;
      platformXFar = platformX+tileWidth;

      // let platformLeft = line(platformX, platformY, platformX, platformYBottom);
      // let platformRight = line(platformXFar, platformY, platformXFar, platformYBottom);
      // let platformTop = line(platformX, platformY, platformXFar, platformY);
      // let platformBottom = line(platformX, platformYBottom, platformXFar, platformYBottom);

      image(platformImage, platformX, platformY, tileWidth, tileHeight);
      
      // Check for collision between player and 4 sides of each platform:
      player.collisionTop(platformX, platformY, platformXFar, platformYBottom);
      player.collisionLeft(platformX, platformY, platformXFar, platformYBottom);
      player.collisionRight(platformX, platformY, platformXFar, platformYBottom);
      player.collisionBottom(platformX, platformY, platformXFar, platformYBottom);
    } 

    if (location === "B") {

    }

    if (location === "K") {

    }
  }




function displayGameOverScreen() {
  // Game-Over Screen (displayed when player runs out of lives or timer runs out):
  background(80);
  textAlign(CENTER);
  
  // If game over is triggered by timer, display message:
  textSize(40);
  fill(255);
  if (countUp === 0) {
    text("You ran out of time!", windowWidth/2, windowHeight/5);
  }

  textSize(80);  
  fill(255, 0, 0);
  text("GAME OVER", windowWidth/2, windowHeight/2);
    
  textSize(50);
  fill(255);
  text("Coins earned: " + coins, windowWidth/2, windowHeight/1.5);
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
  setTimeout(alert("Play Again?"), timeElapsed);
  // If window button clicked, reloads the game:
  document.location.reload();
}