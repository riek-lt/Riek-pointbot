First of all, open the html in any text editor and put your 
name in "comfyJS.Init("yourChannel"),
then open sniffer in your browser, 
and also open developer tools (specifically the console). 
F12 on Chrome.

This only works for rewards where the user needs to input text. 
It's kind of obnoxious having to do that, 
but it's the only way we're able to read what it's all about.

When you activate it when this script is active 
(and mentions connected: irc-ws.chat.twitch.tv:433), 
it should give a string of hexidecimal letters and numbers. 
Save these with which reward it is.

For example:
honk sound;
231bc4b1-1e68-4779-9b05-04b49cc04822

Then in audio.html (fill your channel in there too),
make a new case (or delete the ones that's already there)
put in your custom reward ID, and all the lines of code
that you want to execute. In the top one, it outputs 
something to the console and also plays the sound
in the simplest way possible. 
The sky's the limit with what you can do. 

You could do 2 things to put it into your stream;
1) Make a browser source with this in it, and put it in all
	your scenes.
2) Make a new scene, put this html file in a browser source,
	and put that scene in every other scene you have. 

And you're done! I think! I hope not!