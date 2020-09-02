//pkg index.js --output textswapfiles
const interval = 5; //In seconds
// var _ = require("lodash");
var fs = require('fs');
const readline = require("readline-sync");

// var newestSub = "file:///C:\\Users/Rieke/Muxy/most_recent_subscriber.txt";
var newestSub = 'c:\\Users\\Rieke\\Muxy\\most_recent_subscriber.txt';
// var newestFollower = "C:/Users/Rieke/Muxy/most_recent_follower.txt";
var newestCheerer = "C:/Users/Rieke/Muxy/cheer/most_recent_cheerer.txt";
var currentFollowers = "C:/Users/Rieke/Muxy/total_follower_count.txt"
var nowPlaying = "C:\Users/Rieke/Documents/GTA San Andreas User Files/Now Playing.txt"

var subImage = "D:/Dropbox/Projects/Stream/fluff/textswapfiles/img/sub.png";
var cheerImage = "D:/Dropbox/Projects/Stream/fluff/textswapfiles/img/cheers.png";
var followerImage = "D:/Dropbox/Projects/Stream/fluff/textswapfiles/img/followers.png";
var nowPlayingImage = "D:/Dropbox/Projects/Stream/fluff/textswapfiles/img/musiccover.png";
var cstmMsgImage = "D:/Dropbox/Projects/Stream/fluff/textswapfiles/img/msg.png";

var options = [newestSub, newestCheerer, currentFollowers];
var optionsImage = [subImage, cheerImage, followerImage];
var currentState = 0;
var lines = "";
var userinput = "";
var customMsg = "";

userinput = readline.question('Will there be GTA music? (y/n)');
  if (userinput.match("y")) {
    options.push(nowPlaying);
	optionsImage.push(nowPlayingImage);
    console.log("there will be GTA music");
  }
  userinput = readline.question('Do you have a custom message? (n for no): ');
    if (!userinput.match(/^n&/)) {
      customMsg = userinput;
      options.push(customMsg);
      optionsImage.push(cstmMsgImage);
      console.log("Added message: " + userinput);
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
  if (options[currentState] == customMsg) {
    console.log(customMsg);
    fs.writeFile('slideshow.txt', customMsg, (err) => {
      if (err) throw err;
    });
  } else {
  fs.readFile(options[currentState], function(err, data) {
    if (err) throw err;
    //Fills lines with everything in a string array, seperated by \n.
    lines = data.toString();
    console.log(lines);
    fs.writeFile('slideshow.txt', lines, (err) => {
      if (err) throw err;
    });
  });
}
  fs.readFile(optionsImage[currentState], function (err, data) {
    if (err) throw err;
    fs.writeFile('slideshowimage.png', data, function (err) {
        if (err) throw err;
    });
});
  currentState++
}
