//Javascript portion of program

//display status of the current game
const statusDisplay = document.querySelector('.game--status');
//game status
let gameActive = true;
//starting player X
let currentPlayer = "X";
//setting the grid spots on the board to empty
let gameState = ["", "", "", "", "", "", "", "", ""];
//winning message
const winningMessage = () => `Player ${currentPlayer} has won the game, lets play again!`;
//draw message
const drawMessage = () => `Game ended in a draw, we need a winner!`;
//current player's turn
const currentPlayerTurn = () => `It is player ${currentPlayer}'s turn`;
//display the current players choice for their turn
statusDisplay.innerHTML = currentPlayerTurn();

//-------------------------------------------------------------------------------------------------------------------------

//function to handle the cell selected for the current player turn
function handleCellPlayed(selectedCell, gameBoardIndex) 
{
    gameState[gameBoardIndex] = currentPlayer;
    selectedCell.innerHTML = currentPlayer;
    console.log("Game state location: " + gameState);
    console.log("Current player turn: " + currentPlayer);
    console.log("Index in array: " + gameBoardIndex);
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
    if (gameState[gameBoardIndex] !== "" || !gameActive) 
    {
        return;
    }

    handleCellPlayed(selectedCell, gameBoardIndex);
    handleResultValidation();
}

//-------------------------------------------------------------------------------------------------------------------------

//function to restart the game
function handleRestartGame() 
{
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

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
            handleCellPlayed(htmlID, boardIndex);
            //check if player has won game
            handleResultValidation();
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
            handleCellPlayed(htmlID, boardIndex);
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
            handleCellPlayed(htmlID, boardIndex);
            //check if player has won game
            handleResultValidation();
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
            handleCellPlayed(htmlID, boardIndex);
            //check if player has won game
            handleResultValidation();
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
            handleCellPlayed(htmlID, boardIndex);
            //check if player has won game
            handleResultValidation();
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
            handleCellPlayed(htmlID, boardIndex);
            //check if player has won game
            handleResultValidation();
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
            handleCellPlayed(htmlID, boardIndex);
            //check if player has won game
            handleResultValidation();
        }
    };
  
    //start recognition
    recognition.start();
}