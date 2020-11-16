//Javascript portion of program

//-------------------------------------------------------------------------------------------------------------------------

var mySound = document.getElementById("myAudio"); //ukelele sound effect
var mySound1 = document.getElementById("myAudio1"); //ding sound effect
let counter = 1

//play ukelele sound effect
function playAudio()
{
    mySound.play();
}

//pause ukelele sound effect
function pauseAudio()
{
    mySound.pause();
}

//play ding sound effect
function playAudio1()
{
    mySound1.play();
}

//pause ding sound effect
function pauseAudio1()
{
    mySound1.pause();
}

//-------------------------------------------------------------------------------------------------------------------------

//display status of the current game
const statusDisplay = document.querySelector('.game--status');
//game status
let gameActive = true;
//starting player X
let currentPlayer = "X";
//setting the grid spots on the board to empty
let gameState = ["", "", "", "", "", "", "", "", ""];
let modState = [false, false, false, false, false, false, false, false, false];
//winning message
const winningMessage = () => `Player ${currentPlayer} has won the game, lets play again!`;
//draw message
const drawMessage = () => `Game ended in a draw, we need a winner!`;
//current player's turn
const currentPlayerTurn = () => `It is player ${currentPlayer}'s turn`;
//display the current players choice for their turn

//-------------------------------------------------------------------------------------------------------------------------

//function to handle the cell selected for the current player turn
function handleCellPlayed(selectedCell, gameBoardIndex)
{
  if (modState[gameBoardIndex] == false){
    gameState[gameBoardIndex] = currentPlayer;
    selectedCell.innerHTML = currentPlayer;
    console.log("Game state location: " + gameState);
    console.log("Current player turn: " + currentPlayer);
    console.log("Index in array: " + gameBoardIndex);
    modState[gameBoardIndex] = true;	
    }
}


//-------------------------------------------------------------------------------------------------------------------------

//function to handle the changing of players
function handlePlayerChange()
{
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

//-------------------------------------------------------------------------------------------------------------------------

//function to handle the results of the game
function handleResultValidation()
{
    //winning combinations for tic tac toe board
    const winningConditions =
    [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    //start game by setting winning round to false
    let roundWon = false;
    //for loop for number of turns in game
    for (let i = 0; i <= 7; i++)
    {
        //variable to check if winning combination above is met
        const winCondition = winningConditions[i];
        //first board number
        let a = gameState[winCondition[0]];
        //second board number
        let b = gameState[winCondition[1]];
        //third board number
        let c = gameState[winCondition[2]];

        //if spots are empty continue game
        if (a === '' || b === '' || c === '')
        {
            continue;
        }

        //doesn't check if number are equal, checks for equal value & type, if combination is correct, game is won
        if (a === b && b === c)
        {
            roundWon = true;
            break
        }
    }

    //instance if game is won
    if (roundWon)
    {
        playAudio();
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    //instance if game ends in draw
    let roundDraw = !gameState.includes("");
    if (roundDraw)
    {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    //change player turns since game isn't over
    handlePlayerChange();
}

//-------------------------------------------------------------------------------------------------------------------------

//function to handle selected cells
function handleCellClick(event)
{
    //reference object (cell) targeted
    const selectedCell = event.target;
    //parses gameState index and returns value of attribute with specific name of an element
    const gameBoardIndex = parseInt(selectedCell.getAttribute('data-cell-index'));

    //checks if board isn't empty and not active
    if (gameState[gameBoardIndex] !== "" || !gameActive || modState[gameBoardIndex] == true)
    {
        return;
    }

   if (modState[gameBoardIndex] == false){	
    handleCellPlayed(selectedCell, gameBoardIndex);	   
    handleResultValidation();
     var msg = new SpeechSynthesisUtterance();	    
    var msgTxt = "";
    msgTxt = (currentPlayer + " selected cell " + (gameBoardIndex+1));	    
    msg.text = msgTxt;	   
    speechSynthesis.speak(msg);	    
    msgTxt = "";    	
    }
}

//-------------------------------------------------------------------------------------------------------------------------
//function to read the state of the cells
function readBoard(event){
  var msg = new SpeechSynthesisUtterance();
  var msgTxt = "";
    for (var i = 0; i< 9; i++){

      if (gameState[i] == "")
      {
        var x = (i+1).toString();
        msgTxt += "   ";
        msgTxt += x;
      }
      else {
        msgTxt += "   ";
        msgTxt += gameState[i];
      }
    }
    msg.text = msgTxt;
    speechSynthesis.speak(msg);
}
//-------------------------------------------------------------------------------------------------------------------------
//function to restart the game
function handleRestartGame()
{
    gameActive = true;
    currentPlayer = "X";
    gameState = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    modState = [false, false, false, false, false, false, false, false, false];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    pauseAudio();
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
document.querySelector('.game--readBoard').addEventListener('onclick', readBoard);

//-------------------------------------------------------------------------------------------------------------------------
function increaseFontSize()
{
    if (counter < 8) {
        counter ++;
    } else if (counter >= 8) {
        return;
    }
    if (counter == 1) {
        document.getElementById('webText').style.fontSize='16px'
    } else if (counter == 2) {
        document.getElementById('webText').style.fontSize='22px'
    } else if (counter == 3) {
        document.getElementById('webText').style.fontSize='28px'
    } else if (counter == 4) {
        document.getElementById('webText').style.fontSize='35px'
    } else if (counter == 5) {
        document.getElementById('webText').style.fontSize='42px'
    } else if (counter == 6) {
        document.getElementById('webText').style.fontSize='50px'
    } else if (counter == 7) {
        document.getElementById('webText').style.fontSize='58px'
    } else if (counter == 8) {
        document.getElementById('webText').style.fontSize='65px'
    }
}
//-------------------------------------------------------------------------------------------------------------------------
function decreaseFontSize()
{
    if (counter >= 2) {
        counter --;
    } else if (counter < 2) {
        return;
    }
    if (counter == 1) {
        document.getElementById('webText').style.fontSize='16px'
    } else if (counter == 2) {
        document.getElementById('webText').style.fontSize='22px'
    } else if (counter == 3) {
        document.getElementById('webText').style.fontSize='28px'
    } else if (counter == 4) {
        document.getElementById('webText').style.fontSize='35px'
    } else if (counter == 5) {
        document.getElementById('webText').style.fontSize='42px'
    } else if (counter == 6) {
        document.getElementById('webText').style.fontSize='50px'
    } else if (counter == 7) {
        document.getElementById('webText').style.fontSize='58px'
    } else if (counter == 8) {
        document.getElementById('webText').style.fontSize='65px'
    }

}
//-------------------------------------------------------------------------------------------------------------------------

//voice recognition for program
function speechRecognition()
{
    //get output div reference
    var output = document.getElementById("output");
    //get action element reference
    var action = document.getElementById("action");
    //new speech recognition object
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    //create new voice recognition instance
    var recognition = new SpeechRecognition();
    //results aren't returned immediately, if true all speech recognized would be printed
    recognition.interimResults = false;
    //listen to commands one at a time, if true would continue to listen
    recognition.continuous = false;

    //runs when speech recognition starts
    recognition.onstart = function()
    {
        pauseAudio();
        action.innerHTML = "<small>Listening....</small>";
    };

    recognition.onspeechend = function()
    {
        recognition.stop();
        action.innerHTML = "<small>Done listening....</small>";
    }

    //runs when speech recognition service returns result
    recognition.onresult = function(event)
    {
        var transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;
        output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence * 100 + "%";
        output.classList.remove("hide");
        console.log(transcript);

       if (transcript.toLowerCase() == 'read'){	 //if a player asks for the board's state to be read out loud
          readBoard();
        }
        //locate box 1 on the map and place the current player symbol in it
        if (transcript.toLowerCase() == '1')
        {
            //id of cell from html
            var htmlID = document.getElementById("1");
            //cell index
            var boardIndex = 0;
            //cell index from html
            var htmlIndex = document.getElementById("0");
            //test voice recognition
            console.log("Got command: " + transcript);
            //(cell from html, game state [board location])
            handleCellPlayed(htmlID, boardIndex);
            //check if player has won game
            handleResultValidation();
        }

        //locate box 2 on the map and place the current player symbol in it
        else if (transcript.toLowerCase() == '2')
        {
            //id of cell from html
            var htmlID = document.getElementById("2");
            //cell index
            var boardIndex = 1;
            //cell index from html
            var htmlIndex = document.getElementById("1");
            //test voice recognition
            console.log("Got command: " + transcript);
            //(cell from html, game state [board location])
            handleCellPlayed(htmlID, boardIndex);
            //check if player has won game
            handleResultValidation();
        }

        //locate box 3 on the map and place the current player symbol in it
        else if (transcript.toLowerCase() == '3')
        {
            //id of cell from html
            var htmlID = document.getElementById("3");
            //cell index
            var boardIndex = 2;
            //cell index from html
            var htmlIndex = document.getElementById("2");
            //test voice recognition
            console.log("Got command: " + transcript);
            //(cell from html, game state [board location])
              if (modState[boardIndex] == false){	
            handleCellPlayed(htmlID, boardIndex);	          
                var msg = new SpeechSynthesisUtterance();
                var msgTxt = "";	
                msgTxt = (currentPlayer + " selected cell " + (boardIndex+1));	
                msg.text = msgTxt;	
                speechSynthesis.speak(msg);	
                msgTxt = "";
 //check if player has won game	
            handleResultValidation();	            
        }
        }

        //locate box 4 on the map and place the current player symbol in it
        else if (transcript.toLowerCase() == '4')
        {
            //id of cell from html
            var htmlID = document.getElementById("4");
            //cell index
            var boardIndex = 3;
            //cell index from html
            var htmlIndex = document.getElementById("3");
            //test voice recognition
            console.log("Got command: " + transcript);
            //(cell from html, game state [board location])
             if (modState[boardIndex] == false){	
            handleCellPlayed(htmlID, boardIndex);	          
                var msg = new SpeechSynthesisUtterance();
	           
                var msgTxt = "";	
                msgTxt = (currentPlayer + " selected cell " + (boardIndex+1));	
                msg.text = msgTxt;	
                speechSynthesis.speak(msg);	
                msgTxt = "";
 //check if player has won game	
            handleResultValidation();	            
        }

        //locate box 5 on the map and place the current player symbol in it
        else if (transcript.toLowerCase() == '5')
        {
            //id of cell from html
            var htmlID = document.getElementById("5");
            //cell index
            var boardIndex = 4;
            //cell index from html
            var htmlIndex = document.getElementById("4");
            //test voice recognition
            console.log("Got command: " + transcript);
            //(cell from html, game state [board location])
            if (modState[boardIndex] == false){	
            handleCellPlayed(htmlID, boardIndex);	          
                var msg = new SpeechSynthesisUtterance();
	           
                var msgTxt = "";	
                msgTxt = (currentPlayer + " selected cell " + (boardIndex+1));	
                msg.text = msgTxt;	
                speechSynthesis.speak(msg);	
                msgTxt = "";
 //check if player has won game	
            handleResultValidation();	            
        }
        }

        //locate box 6 on the map and place the current player symbol in it
        else if (transcript.toLowerCase() == '6')
        {
            //id of cell from html
            var htmlID = document.getElementById("6");
            //cell index
            var boardIndex = 5;
            //cell index from html
            var htmlIndex = document.getElementById("5");
            //test voice recognition
            console.log("Got command: " + transcript);
            //(cell from html, game state [board location])
           if (modState[boardIndex] == false){	
            handleCellPlayed(htmlID, boardIndex);	          
                var msg = new SpeechSynthesisUtterance();
	           
                var msgTxt = "";	
                msgTxt = (currentPlayer + " selected cell " + (boardIndex+1));	
                msg.text = msgTxt;	
                speechSynthesis.speak(msg);	
                msgTxt = "";
 //check if player has won game	
            handleResultValidation();	            
        }
        }

        //locate box 7 on the map and place the current player symbol in it
        else if (transcript.toLowerCase() == '7')
        {
            //id of cell from html
            var htmlID = document.getElementById("7");
            //cell index
            var boardIndex = 6;
            //cell index from html
            var htmlIndex = document.getElementById("6");
            //test voice recognition
            console.log("Got command: " + transcript);
            //(cell from html, game state [board location])
          if (modState[boardIndex] == false){	
            handleCellPlayed(htmlID, boardIndex);	          
                var msg = new SpeechSynthesisUtterance();
	           
                var msgTxt = "";	
                msgTxt = (currentPlayer + " selected cell " + (boardIndex+1));	
                msg.text = msgTxt;	
                speechSynthesis.speak(msg);	
                msgTxt = "";
 //check if player has won game	
            handleResultValidation();	            
        }
        }

        //locate box 8 on the map and place the current player symbol in it
        else if (transcript.toLowerCase() == '8')
        {
            //id of cell from html
            var htmlID = document.getElementById("8");
            //cell index
            var boardIndex = 7;
            //cell index from html
            var htmlIndex = document.getElementById("7");
            //test voice recognition
            console.log("Got command: " + transcript);
            //(cell from html, game state [board location])
           if (modState[boardIndex] == false){	
            handleCellPlayed(htmlID, boardIndex);	          
                var msg = new SpeechSynthesisUtterance();
	           
                var msgTxt = "";	
                msgTxt = (currentPlayer + " selected cell " + (boardIndex+1));	
                msg.text = msgTxt;	
                speechSynthesis.speak(msg);	
                msgTxt = "";
 //check if player has won game	
            handleResultValidation();	            
        }
        }

        //locate box 9 on the map and place the current player symbol in it
        else if (transcript.toLowerCase() == '9')
        {
            //id of cell from html
            var htmlID = document.getElementById("9");
            //cell index
            var boardIndex = 8;
            //cell index from html
            var htmlIndex = document.getElementById("8");
            //test voice recognition
            console.log("Got command: " + transcript);
            //(cell from html, game state [board location])
           if (modState[boardIndex] == false){	
            handleCellPlayed(htmlID, boardIndex);	          
                var msg = new SpeechSynthesisUtterance();
	           
                var msgTxt = "";	
                msgTxt = (currentPlayer + " selected cell " + (boardIndex+1));	
                msg.text = msgTxt;	
                speechSynthesis.speak(msg);	
                msgTxt = "";
 //check if player has won game	
            handleResultValidation();	            
        }
        }
    };

    //start recognition
    recognition.start();
}

//Keyboard Accessible portion
function handleKeyboard(keyEvent)
{
  //saves the clicked html element in a variable for easier use
  //might not need this? look into handle clell played

  const clickedCell = keyEvent.target

  //grabs the 'data-cell-index' attribute from the clicked cell to identify where the cell is in the grid
  //will return a string value
  var x = event.which || event.keyCode;

  if (x == 49)
  {
    //id of cell from html
    var htmlID = document.getElementById("1");
    //cell index
    var boardIndex = 0;
    //cell index from html
    var htmlIndex = document.getElementById("0");
    //(cell from html, game state [board location])
     if (modState[boardIndex] == false){	
            handleCellPlayed(htmlID, boardIndex);	          
                var msg = new SpeechSynthesisUtterance();
	           
                var msgTxt = "";	
                msgTxt = (currentPlayer + " selected cell " + (boardIndex+1));	
                msg.text = msgTxt;	
                speechSynthesis.speak(msg);	
                msgTxt = "";
 //check if player has won game	
            handleResultValidation();	            
        }
  }
  else if (x == 50)
  {
    //id of cell from html
    var htmlID = document.getElementById("2");
    //cell index
    var boardIndex = 1;
    //cell index from html
    var htmlIndex = document.getElementById("1");
    //(cell from html, game state [board location])
  if (modState[boardIndex] == false){	
            handleCellPlayed(htmlID, boardIndex);	          
                var msg = new SpeechSynthesisUtterance();
	           
                var msgTxt = "";	
                msgTxt = (currentPlayer + " selected cell " + (boardIndex+1));	
                msg.text = msgTxt;	
                speechSynthesis.speak(msg);	
                msgTxt = "";
 //check if player has won game	
            handleResultValidation();	            
        }
  }
  else if (x == 51)
  {
    //id of cell from html
    var htmlID = document.getElementById("3");
    //cell index
    var boardIndex = 2;
    //cell index from html
    var htmlIndex = document.getElementById("2");
    //(cell from html, game state [board location])
  if (modState[boardIndex] == false){	
            handleCellPlayed(htmlID, boardIndex);	          
                var msg = new SpeechSynthesisUtterance();
	           
                var msgTxt = "";	
                msgTxt = (currentPlayer + " selected cell " + (boardIndex+1));	
                msg.text = msgTxt;	
                speechSynthesis.speak(msg);	
                msgTxt = "";
 //check if player has won game	
            handleResultValidation();	            
        }
  }
  else if (x == 52)
  {
    //id of cell from html
    var htmlID = document.getElementById("4");
    //cell index
    var boardIndex = 3;
    //cell index from html
    var htmlIndex = document.getElementById("3");
    //(cell from html, game state [board location])
  if (modState[boardIndex] == false){	
            handleCellPlayed(htmlID, boardIndex);	          
                var msg = new SpeechSynthesisUtterance();
	           
                var msgTxt = "";	
                msgTxt = (currentPlayer + " selected cell " + (boardIndex+1));	
                msg.text = msgTxt;	
                speechSynthesis.speak(msg);	
                msgTxt = "";
 //check if player has won game	
            handleResultValidation();	            
        }
  }
  else if (x == 53)
  {
    //id of cell from html
    var htmlID = document.getElementById("5");
    //cell index
    var boardIndex = 4;
    //cell index from html
    var htmlIndex = document.getElementById("4");
    //(cell from html, game state [board location])
  if (modState[boardIndex] == false){	
            handleCellPlayed(htmlID, boardIndex);	          
                var msg = new SpeechSynthesisUtterance();
	           
                var msgTxt = "";	
                msgTxt = (currentPlayer + " selected cell " + (boardIndex+1));	
                msg.text = msgTxt;	
                speechSynthesis.speak(msg);	
                msgTxt = "";
 //check if player has won game	
            handleResultValidation();	            
        }
  }
  else if (x == 54)
  {
    //id of cell from html
    var htmlID = document.getElementById("6");
    //cell index
    var boardIndex = 5;
    //cell index from html
    var htmlIndex = document.getElementById("5");
    //(cell from html, game state [board location])
  if (modState[boardIndex] == false){	
            handleCellPlayed(htmlID, boardIndex);	          
                var msg = new SpeechSynthesisUtterance();
	           
                var msgTxt = "";	
                msgTxt = (currentPlayer + " selected cell " + (boardIndex+1));	
                msg.text = msgTxt;	
                speechSynthesis.speak(msg);	
                msgTxt = "";
 //check if player has won game	
            handleResultValidation();	            
        }
  }
  else if (x == 55)
  {
    //id of cell from html
    var htmlID = document.getElementById("7");
    //cell index
    var boardIndex = 6;
    //cell index from html
    var htmlIndex = document.getElementById("6");
    //(cell from html, game state [board location])
  if (modState[boardIndex] == false){	
            handleCellPlayed(htmlID, boardIndex);	          
                var msg = new SpeechSynthesisUtterance();
	           
                var msgTxt = "";	
                msgTxt = (currentPlayer + " selected cell " + (boardIndex+1));	
                msg.text = msgTxt;	
                speechSynthesis.speak(msg);	
                msgTxt = "";
 //check if player has won game	
            handleResultValidation();	            
        }
  }
  else if (x == 56)
  {
    //id of cell from html
    var htmlID = document.getElementById("8");
    //cell index
    var boardIndex = 7;
    //cell index from html
    var htmlIndex = document.getElementById("7");
    //(cell from html, game state [board location])
  if (modState[boardIndex] == false){	
            handleCellPlayed(htmlID, boardIndex);	          
                var msg = new SpeechSynthesisUtterance();
	           
                var msgTxt = "";	
                msgTxt = (currentPlayer + " selected cell " + (boardIndex+1));	
                msg.text = msgTxt;	
                speechSynthesis.speak(msg);	
                msgTxt = "";
 //check if player has won game	
            handleResultValidation();	            
        }
  }
  else if (x == 57)
  {
    //id of cell from html
    var htmlID = document.getElementById("9");
    //cell index
    var boardIndex = 8;
    //cell index from html
    var htmlIndex = document.getElementById("8");
    //(cell from html, game state [board location])
  if (modState[boardIndex] == false){	
            handleCellPlayed(htmlID, boardIndex);	          
                var msg = new SpeechSynthesisUtterance();
	           
                var msgTxt = "";	
                msgTxt = (currentPlayer + " selected cell " + (boardIndex+1));	
                msg.text = msgTxt;	
                speechSynthesis.speak(msg);	
                msgTxt = "";
 //check if player has won game	
            handleResultValidation();	            
        }
  }
  else {
    alert("Not a valid key try again");
  }

  // const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  //if cell has been played or game is paused, ignore
  if (gameState[clickedCellIndex] !== "" || !gameActive)
  {
      return;
  }

  //continue with gameflow
  //Might have to change clickedCell!!!!
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function changeCSS(cssFile, cssLinkIndex) {

    var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}
