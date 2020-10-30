//JW javascript portion of program

//voice recognition for program
function speechRecognition() 
{
    //get output div reference
    var output = document.getElementById("output");
    //get action element reference
    var action = document.getElementById("action");
    //new speech recognition object
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    //runs when speech recognition starts
    recognition.onstart = function() 
    {
        action.innerHTML = "<small>Listening....</small>";
    };
    
    recognition.onspeechend = function() 
    {
        recognition.stop();
    }
  
    //runs when speech recognition service returns result
    recognition.onresult = function(event) 
    {
        var transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;
        output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence * 100 + "%";
        output.classList.remove("hide");
        console.log(transcript);

        //reset the game using voice recognition
        if (transcript.toLowerCase() == 'reset')
        {
            handleRestartGame();
        }

        //need to locate box 1 and place player data inside that box 1
        //struggling........
        if (transcript.toLowerCase() == 'box 1' || '1')
        {
            console.log("Got command.");
        }
    };
  
    //start recognition
    recognition.start();
}

//-----------------------------------------------------------------------------------------------------------------------

//functions to play and pause sound
var mySound = document.getElementById("myAudio");

function playAudio()
{
    mySound.play();
}

function pauseAudio()
{
    mySound.pause();
}

//------------------------------------------------------------------------------------------------------------------------

//constant display status of the current game
const statusDisplay = document.querySelector('.game--status');
//game active status
let gameActive = true;
let currentPlayer = "X";
//setting the grid spots on the board to empty
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameBoard = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
//winning message
const winningMessage = () => `Player ${currentPlayer} has won the game, lets play again!`;
//draw message
const drawMessage = () => `Game ended in a draw!`;
//current player's turn
const currentPlayerTurn = () => `It is player ${currentPlayer}'s turn`;
//display the current players choice for their turn
statusDisplay.innerHTML = currentPlayerTurn();

//-------------------------------------------------------------------------------------------------------------------------

//function to handle the cell selected for the current player turn
function handleCellPlayed(clickedCell, clickedCellIndex) 
{
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    console.log(gameState);
    console.log(currentPlayer);
    console.log(clickedCell);
    console.log(clickedCellIndex);
}

//-------------------------------------------------------------------------------------------------------------------------

//function to handle the changing of players, starting with player 1 and then swithcing to player 0
function handlePlayerChange() 
{
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

//-------------------------------------------------------------------------------------------------------------------------

//function to handle the results of the game, and who wins
function handleResultValidation() 
{
    //these are the winning combinations for the tic tac toe board
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

    let roundWon = false;
    for (let i = 0; i <= 7; i++) 
    {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
            
        if (a === '' || b === '' || c === '') 
        {
            continue;
        }

        if (a === b && b === c) 
        {
            roundWon = true;
            break
        }
    }

    //chrcking if the game has been won
    if (roundWon) 
    {
        playAudio();
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    //creating the instance of if the game ends in a draw
    let roundDraw = !gameState.includes("");
    if (roundDraw)
    {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    //since we know that the game isn't over, we're still going to switch players
    handlePlayerChange();
}

//-------------------------------------------------------------------------------------------------------------------------

function handleCellClick(clickedCellEvent) 
{   
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) 
    {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

//-------------------------------------------------------------------------------------------------------------------------

function handleVoiceCommand(clickedCellEvent)
{
    const clickedCell = clickedCellEvent.target;
    const voiceCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    console.log(clickedCell);
    console.log(voiceCellIndex);
}

//-------------------------------------------------------------------------------------------------------------------------

function handleRestartGame() 
{
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    pauseAudio();
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

//-------------------------------------------------------------------------------------------------------------------------
