Function Documentation

Current version: tic_tac_toe_final.*

In order to run the code properly, you will need the following files:

The current version of tic_tac_toe.html,  tic_tac_toe.js &  tic_tac_toe.css

The css files containing the alternate color schemes:  darkmode.css, yellowonblack.css and blackonyellow.css

### How To Play:

You can play this game via mouse, keyboard, or voice recognition

To use voice recognition, hit the voice recognition button and say the box you wish to place your X or O in

See the game for other voice commands that you can use

PLEASE don't destory the buttons on the game, tap them once and it will work

    Ex: Hitting X Location repeatedly will call that function many times.... so hit it once and it will work :)

PLEASE be patient with the voice recognition, it works very well but sometimes won't capture every word so pronouce words loud and clear!!

#### Tic_tac_toe.html

Summary: Controls the skeletal layout of the page. Also contains the instructions.

functions:

The <span style="text-decoration:underline;">color scheme</span> class creates buttons that allow users to change different colors by changing which css file is called. 

 Lines 20-28 designate the audio files associated with the application.

The <span style="text-decoration:underline;">game container</span> class creates the cells for the board. 


#### Tic_tac_toe.js


##### Summary: This file contains the majority of the functionality of tic tac toe. 


##### Important variables:

**gameState** starts off with blank string values, but stores player locations in the game. When reset board is called, it reverts back to the blank string values. 

**currentPlayer **flips between “X” and “O”. 


#### Tic_tac_toe.css

Summary: Controls the styling of the webpage, powder blue background with black text. Darkmode.css, yellowblack.css, and blackonyellow.css are alternate color schemes. 


#### darkmode.css

Summary: styling of the webpage, black background with white text. 


#### yellowonblack.css

Summary: styling of the webpage, black background with yellow text. 


#### blackonyellow.css

Summary: styling of the webpage, light yellow background with black text. 


### How To:

Add more Speech Synthesis:

var msg = new SpeechSynthesisUtterance(); //this can be named anything, but lets call it message

msg.text = “Hello World!”.  // Assign string to the message

speechSynthesis.speak(msg);



