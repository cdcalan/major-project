let nextLocation; 
let platformConstant; 
let platformX, platformY, platformYBottom, platformXFar;

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

    koopa1.move(16, 9, 810.4, 1150);
    koopa2.move(23, 9, 1164.95, 1364.95);
    koopa3.move(40, 4, 2026, 2228.6);
    koopa4.move(43, 9, 2177.95, 2377.95);
    koopa5.move(56, 9, 2836.4, 1036.4);
    koopa6.move(58, 4, 2937.7, 3140.3);

    // For Scroll:
    translate(-stationaryObject.position.x, 0);
    stationaryObject.move();
    stationaryObject.show();
    
    player.updateShow(playerAvatar);
  
    playerLifeCounter();
  
    coinCounter();
    
    for (let y = 0; y < lettersHigh; y++) {
      for (let x = 0; x < lettersWide; x++) {
        //let b = x + 1;
        // platformLeft = tiles[x-1][y];
        // platformRight = tiles[x+1][y];
        showTiles(tiles[x][y], x, y); //////???????????????????????????????????????????implement 2 d array and grid generation
      }
    }
  }

  /////////////////////////////////////////////////////////////////////currently fixing///////////////////////////////
  function showTiles(location, x, y) {
    if (location === "C") {
      animation(coinAnimation, x*tileWidth, y*tileHeight);
      // theCoin = new Coin(x, y);
      // theCoin.show();
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
      strokeWeight(10);
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
      crab1.updateShow();
      crab2.updateShow();
      crab3.updateShow();
      crab4.updateShow();
      crab5.updateShow();
      crab6.updateShow();
    }
    if (location === "K") {
      koopa1.updateShow();
      koopa2.updateShow();
      koopa3.updateShow();
      koopa4.updateShow();
      koopa5.updateShow();
      koopa6.updateShow();
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