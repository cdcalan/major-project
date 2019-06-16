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
    // For Scroll:
    translate(-stationaryObject.position.x, 0);
    stationaryObject.move();
    stationaryObject.show();
  
    foe.glide(); ////////////////////////////////////////uncomment
    //foe.hasCollided(player);
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
    if (location === "G") {
      image(groundImage, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
    }
    if (location === "#") {
      
      image(platformImage, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
      player.collision(x * tileWidth, y * tileHeight);
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