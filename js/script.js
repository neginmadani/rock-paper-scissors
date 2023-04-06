initializeGame();

function initializeGame(){
    enableGameButtons();
    let txtbox = document.querySelector('.textbox');
    txtbox.textContent = "Let's play! First to 5 wins the game";
}

function playRound(){
    let playerSelection = this.id;
    let computerSelection = getComputerChoice();
    let roundWinner = findRoundWinner(playerSelection, computerSelection);
    declareRoundWinner(roundWinner, playerSelection, computerSelection);
    updateScoreBox(roundWinner);
    let fiveWins = checkForFiveWins(roundWinner);
    if (fiveWins == true){
        declareFinalWinner(roundWinner);
        disableGameButtons();
        createPlayAgainButton();
    }
}

function getComputerChoice(){
    randomNumber = Math.floor(Math.random() * 3) + 1;
    let computerChoice;
    switch(randomNumber){
        case 1:
            computerChoice = "Rock";
            break;
        case 2:
            computerChoice = "Paper";
            break;
        case 3:
            computerChoice = "Scissors"
            break;
        default: 
    }
    return computerChoice;
}

function findRoundWinner(playerSelection, computerSelection){
    let winner;
    if (playerSelection == "Rock" && computerSelection == "Scissors"){
        winner = "player";
    }
    else if (playerSelection == "Paper" && computerSelection == "Rock"){
        winner = "player";
    }
    else if (playerSelection == "Scissors" && computerSelection == "Paper"){
        winner = "player";
    }
    else if (playerSelection == computerSelection){
        winner = "tie";
    }
    else{
        winner = "computer";
    }
    return winner;
}

function declareRoundWinner(winner, playerSelection, computerSelection){
    txtbox = document.querySelector('.textbox');
    if(winner == 'player'){
        txtbox.textContent = `You win this round! ${playerSelection} beats ${computerSelection}.`;
    }
    else if(winner == 'computer'){
        txtbox.textContent = `Computer wins this round! ${computerSelection} beats ${playerSelection}.`;
    }
    else{
        txtbox.textContent = `${playerSelection} vs ${computerSelection}! It's a Tie.`
    }
}

function updateScoreBox(roundWinner){
    if(roundWinner == 'player' || roundWinner == 'computer'){
        let scoreBox = document.querySelector(`#${roundWinner}`);
        let currentScore = extractScore(scoreBox.textContent);
        let newScore = currentScore + 1;
        updateScore(scoreBox, newScore);
    }
}

function checkForFiveWins(roundWinner){
    let scoreBox = document.querySelector(`#${roundWinner}`);
    let score = extractScore(scoreBox.textContent);
    if(score == 5) return true;
    return false;
}

function extractScore(string){
    let stringArray = string.split(" ");
    let score = Number(stringArray[1]);
    return score;
}

function updateScore(scoreBox, newScore){
    let string = scoreBox.textContent;
    let stringArray = string.split(" ");
    let newString = stringArray[0] + " " + newScore;
    scoreBox.textContent = newString;
}

function declareFinalWinner(winnerName){
    let txtbox = document.querySelector('.textbox');
    let newTxtBox = document.createElement('div');
    newTxtBox.style.cssText = 'margin-top: 20px;';
    newTxtBox.setAttribute('id', 'winner-box');
    if(winnerName == 'player'){
        newTxtBox.textContent = 'You won!';
    }
    else if(winnerName == 'computer'){
        newTxtBox.textContent = 'You lost!';
    }
    txtbox.appendChild(newTxtBox);
}

function createPlayAgainButton(){
    const txtbox = document.querySelector('.textbox');
    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again?'
    playAgainButton.style.cssText = 'width: 200px;';
    playAgainButton.addEventListener('click',resetGame);
    txtbox.appendChild(playAgainButton);
}

function resetGame(){
    //reset scoreboard
    let playerScore = document.querySelector('#player');
    updateScore(playerScore, 0);
    let computerScore = document.querySelector('#computer');
    updateScore(computerScore, 0);

    //remove play-again buttun and final winner declaration
    let txtbox = document.querySelector('.textbox');
    let playAgainButton = txtbox.lastChild;
    delete txtbox.removeChild(playAgainButton);
    let finalWinner = txtbox.lastChild;
    delete txtbox.removeChild(finalWinner);

    initializeGame();
}

function enableGameButtons(){
    const gameButtons = document.querySelectorAll('.game-button');
    gameButtons.forEach(btn => btn.addEventListener('click', playRound));
}

function disableGameButtons(){
    const gameButtons = document.querySelectorAll('.game-button');
    gameButtons.forEach(btn => btn.removeEventListener('click', playRound));
}