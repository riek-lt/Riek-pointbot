const interval = 12; //In seconds
// var _ = require("lodash");
var fs = require('fs');
const readline = require("readline-sync");

// var newestSub = "file:///C:\\Users/Rieke/Muxy/most_recent_subscriber.txt";
var newestSub = 'c:\\Users\\Rieke\\Muxy\\most_recent_subscriber.txt';
var newestFollower = "C:/Users/Rieke/Muxy/most_recent_follower.txt";
var newestCheerer = "C:/Users/Rieke/Muxy/cheer/most_recent_cheerer.txt";
var nowPlaying = "C:\Users/Rieke/Documents/GTA San Andreas User Files/Now Playing.txt"
var options = [newestSub, newestFollower, newestCheerer];
var currentState = 0;
var lines = "";
var userinput = "";

userinput = readline.question('Will there be GTA music? (y/n)');
  if (userinput.match("y")) {
    options.push(nowPlaying);
    console.log("there will be GTA music");
    // rl.close();
  }

doSwap();
setInterval(function() {
  // Invoke function every 10 minutes
  doSwap();
}, interval * 1000);

function doSwap() {
  if (currentState == options.length) {
    currentState = 0;
  }
  // console.log("currentState = " + currentState);
  fs.readFile(options[currentState], function(err, data) {
    if (err) throw err;
    //Fills lines with everything in a string array, seperated by \n.
    lines = data.toString();
    console.log(lines);
    fs.writeFile('slideshow.txt', lines, (err) => {
      if (err) throw err;
      // console.log('The file has been saved!');
    });
  });
  currentState++
}
