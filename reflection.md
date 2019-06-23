Problems:
- 1) Collision Detection for platforms and sprite interaction:
    Originally, I was trying to write a collision detection code that could work for any number or position of obstacles, by hand. I had planned to turn each "#" (platform) from the text file into a copy of a Platform class and gather them inside an array. After spending a significant amount of time troubleshooting for different sprites, I decided to learn how to use the more conceise p5.collide2d library to solve the problem. Unfortunately, I still ran into problems with using the collideRectRect() function, as it would only work for the bottom and one side of the rectangular platforms. I solved this issue by adding more code and breaking down my platforms boundaries into lines that used the collideLineRect() function instead. This made my code more efficient than before, as I did not have to use an array of multiple classes.


- 2) Enemy Sprite Movement:
    I had planned out the positions of my enemy sprites inside the text file for the game. However, unlike the platforms, it could not do much but read the position of the enemy sprite from the text sheet. So I made a class for each type of enemy, loaded each sprite in setup, and displayed/moved the sprites in the textfile function (which finds its position). But I could not declare my classes in setup without the x, y coordinates from the textfile function. So, in order to create the enemies, I had to do extra work to find out each sprite's position and input it directly when initializing the class in setup. Similarly, I had to find out the restrictions of the platforms on which each sprite stood (to restrict sprite movement)and input it directly when initializing (instead of having the program read it).
    (Also, I am not sure why, but I noticed my program also started to run more slowly as I was fixing the issue. After I fixed the issue, it seemed to go back to normal speed.) 
    

- 3) Animation:
    As part of my "Nice to Have" list, I wanted to improve the game graphics by turning the coins and running avatars of each sprite into gifs in javascript by sequentially looping through their images. This was another learning curve for me because I had to learn how to work with the p5.play library for animations.  


      //Reads text file for number of coins and pushes their coordinate location into an empty array:
  // for (let y = 0; y < lettersHigh; y++) {
  //   for (let x = 0; x < lettersWide; x++) {
  //     if (tiles[x][y] === "K") {
  //       koopaCloud.push([x, y]);
  //     }
  //   }
  // }
  // // For each coin in "cloud" array, create a new Coin object with its location, and push it into the coinArray:
  // for (let i = koopaCloud.length - 1; i > -1; i--) {
  //   let coordinates = koopaCloud[i];
  //   koopaArray[i] = new Koopa(coordinates[0]*tileWidth, coordinates[1]*tileHeight, (coordinates[0]*tileWidth)-10, (coordinates[0]*tileWidth)+400);
  // }