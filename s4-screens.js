let nextLocation; 
let platformConstant; 
let platformX, platformY, platformYBottom, platformXFar;
let hats; //tester

// let platformLeft, platformRight;
// let platformCoordinates = new Map();

function displayStartScreen() {
    background(50, 100, 150);
  
    fill(200, 50, 20, 100);
    rect(menuX, menuY, menuWidth, menuHeight, 30); 

    startButton.hoveredOver();
    infoButton.hoveredOver();
    startButton.show();
    infoButton.show();
  }




  function displayInfoScreen() {
    background(200);
    //text("To jump forwards or backwards, it is best if you hold down the jump key (UP ARROW) before you press the direction key (LEFT ARROW or RIGHT ARROW).")
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

    // koopa1.move(16, 9, 810.4, 1150);
    // koopa2.move(23, 9, 810.4, 1164.95);
    // koopa3.move(40, 4, 1880, 2200);
    // koopa4.move(43, 9, 1815, 2190);
    // koopa5.move(56, 9, 2830, 3200);
    // koopa6.move(58, 4, 2900, 3200);
    // koopa1.enemyCollision();
    // koopa2.enemyCollision();
    // koopa3.enemyCollision();
    // koopa4.enemyCollision();
    // koopa5.enemyCollision();
    // koopa6.enemyCollision();
    // crab1.enemyCollision();
    // crab2.enemyCollision();
    // crab3.enemyCollision();
    // crab4.enemyCollision();
    // crab5.enemyCollision();
    // crab6.enemyCollision();

    // For Scroll:
    translate(-player.position.x, 0);
    //translate(-player.x, 0);
    // stationaryObject.move();              //delete if works out with player
    //stationaryObject.show();
    
    player.updateShow(playerAvatar);
    
    fill(0);
    text(timer%60, player.position.x+700, 15);

    
    counters()

    // for (let i = 0; i < ballArray.length; i++) {
    //   // move ball
    //   ballArray[i].x += ballArray[i].dx;
    //   ballArray[i].y += ballArray[i].dy;

    //   // display ball
    //   fill(ballArray[i].color);
    //   noStroke();
    //   ellipse(ballArray[i].x, ballArray[i].y, ballArray[i].radius*2, ballArray[i].radius*2);
    // }
    
    for (let y = 0; y < lettersHigh; y++) {
      for (let x = 0; x < lettersWide; x++) {
        showTiles(tiles[x][y], x, y); //////???????????????????????????????????????????implement 2 d array and grid generation
      }
    }

    for (let index = koopaArray.length -1; index > -1; index--) {
      let thisKoopa = koopaArray[index];
      thisKoopa.updateShow();
      thisKoopa.move();
      thisKoopa.enemyCollision();
      // if (thisKoopa.lifeArray.length === 0) {
      //   koopaArray.splice(koopaArray.indexOf(thisKoopa), 1);
      // }
    }
  

    for (let index = crabArray.length -1; index > -1; index--) {
      let thisCrab = crabArray[index];
      thisCrab.updateShow();

      //thisCrab.attack();

      thisCrab.enemyCollision(player);
      if (thisCrab.enemyCollision(player) === true) {
        if (playerState === 1) {
          if (thisCrab.lifeArray.length >=1) {
            thisCrab.lifeArray.splice(thisCrab.lifeArray.indexOf(thisCrab.lifeArray.length-1), 1);
            hats++;
            playerState = 0;
          }
          else {
            crabArray.splice(crabArray.indexOf(thisCrab), 1);
          }
        }
        else if (playerState === 0) {
          console.log("hit");
        }
      }
    }


    for (let index = coinArray.length -1; index > -1; index--) {
      let coin = coinArray[index];
      coin.show();
      if (coin.colliding(player) === true) {
        coinArray.splice(coinArray.indexOf(coin), 1);
        coins ++;
      }
    }
  }

  /////////////////////////////////////////////////////////////////////currently fixing///////////////////////////////
  function showTiles(location, x, y) {
    // if (location === "C") {

    //   // for (let i = cloud.length - 1; i > -1; i--) {
    //   //   let coinCoord = cloud[i];
    //   //   coinArray[i] = new Coin(coinCoord[0]*tileWidth, coinCoord[1]*tileHeight);
    //   // }
    //   //animation(coinAnimation, x*tileWidth, y*tileHeight);
    //   //coinArray[i].show();
    // }
    if (location === "W") {
      image(marioCastleImage, x * tileWidth, (y * tileHeight) - tileHeight*3.7, tileWidth*5, tileHeight*5);
      if (player.x > (x*tileWidth) + (tileWidth/2) && player.yLoc < platformY) {
        screenState = "Completed";
      }
    }
    if (location === "T") {
      image(marioFlagImage, x * tileWidth, (y * tileHeight) - tileWidth, tileWidth, tileHeight*2.2);
    }
    if (location === "G") {
      image(groundImage, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
    }
    if (location  === "#") {
      // if (platformLeft ==! "#") {
      //   platformCoordinates.set("coorX1Left", platformLeft);
      // }
      // if (platformRight ==! "#") {
      //   platformCoordinates.set("coorX1Right", platformRight);
      // }
      platformX = x * tileWidth;
      platformY = y * tileHeight;

      platformYBottom = platformY+tileHeight;
      platformXFar = platformX+tileWidth;

      // console.log(platformX, platformXFar);

      // let platformLeft = line(platformX, platformY, platformX, platformYBottom);
      // let platformRight = line(platformXFar, platformY, platformXFar, platformYBottom);
      // let platformTop = line(platformX, platformY, platformXFar, platformY);
      // let platformBottom = line(platformX, platformYBottom, platformXFar, platformYBottom);

      image(platformImage, platformX, platformY, tileWidth, tileHeight);
      
      player.collisionTop(platformX, platformY, platformXFar, platformYBottom);
      player.collisionLeft(platformX, platformY, platformXFar, platformYBottom);
      player.collisionRight(platformX, platformY, platformXFar, platformYBottom);
      player.collisionBottom(platformX, platformY, platformXFar, platformYBottom);

     //, platformTop, platformBottom);
      // totalPlatforms.push(new Platform());
      // console.log(totalPlatforms);
      //for (let i = x; i < windowWidth; i += 300) {
        //totalPlatforms[i].show;
  
  
        // if (player.x > i * tileWidth && player.x < i * tileWidth+tileWidth && player.y > y * tileHeight && player.y < y * tileHeight+tileHeight) {
        //   collision  = true;
        // if true, 
        //    make mario fall (gravity). 
        //    subtract 1 life.
        // }
      //}
    } 
    if (location === "B") {
      // crab1.updateShow();
      // crab2.updateShow();
      // crab3.updateShow();
      // crab4.updateShow();
      // crab5.updateShow();
      // crab6.updateShow();
    }
    if (location === "K") {
      // koopa1.updateShow();
      // koopa2.updateShow();
      // koopa3.updateShow();
      // koopa4.updateShow();
      // koopa5.updateShow();
      // koopa6.updateShow();
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
    text("Score " + score, windowWidth/2, windowHeight/1.5);
  }

function displayCompletedScreen() {
  background(80);
  textAlign(CENTER);
  textSize(80);
  fill(0, 0, 255);
  text("Mission Complete!", windowWidth/2, windowHeight/2);
  textSize(50);
  fill(255);
  text("Score " + score, windowWidth/2, windowHeight/1.5);
}