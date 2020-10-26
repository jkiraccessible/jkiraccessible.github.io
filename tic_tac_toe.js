//JW javascript portion of program

var mySound = new sound("bounce.mp3");

function sound(src) 
{
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function()
    {
        this.sound.play();
    }

    this.stop = function()
    {
        this.sound.pause();
    }    
}

//selecting only one of the checkboxes
function selectOnlyThis(id)
{
    var myCheckbox = document.getElementsByName("myCheckbox");
    Array.prototype.forEach.call(myCheckbox, function(el)
    {
        mySound.play();
        el.checked = false;
    });
    
id.checked = true;
}

//constant display status of the current game
const statusDisplay = document.querySelector('.game--status');
//game active status
let gameActive = true;
let currentPlayer = "1";
//setting the grid spots on the board to empty
let gameState = ["", "", "", "", "", "", "", "", ""];
//winning message
const winningMessage = () => `Player ${currentPlayer} has won the game, lets play again!`;
//draw message
const drawMessage = () => `Game ended in a draw!`;
//window.speechSynthesis.speak(new speechSynthesisUtterance('Game ended in a draw!'));
//current player's turn
const currentPlayerTurn = () => `It is player ${currentPlayer}'s turn`;
//display the current players choice for their turn
statusDisplay.innerHTML = currentPlayerTurn();

//function to handle the cell selected for the current player turn
function handleCellPlayed(clickedCell, clickedCellIndex) 
{
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    mySound.play();
}

//function to handle the changing of players, starting with player 1 and then swithcing to player 0
function handlePlayerChange() 
{
    currentPlayer = currentPlayer === "1" ? "0" : "1";
    statusDisplay.innerHTML = currentPlayerTurn();
}

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
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        mySound.play();
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


function handleRestartGame() 
{
    mySound.play();
    gameActive = true;
    currentPlayer = "1";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
