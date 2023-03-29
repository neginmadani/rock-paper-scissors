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

function playRound(playerSelection, computerSelection){
    //if playerSelection is rock, it beats scissors
    if (playerSelection == "Rock" && computerSelection == "Scissors"){
        console.log("You Win! Rock beats Scissors");
        return "player won";
    }
    //if playerSelection is paper, it beats rock
    else if (playerSelection == "Paper" && computerSelection == "Rock"){
        console.log("You Win! Paper beats Rock");
        return "player won";
    }
    //if playerSelection is scissors, it beats paper
    else if (playerSelection == "Scissors" && computerSelection == "Paper"){
        console.log("You Win! Scissors beats Paper");
        return "player won";
    }
    //if playerSelection is the same as computerSelection, no-one wins
    else if (playerSelection == computerSelection){
        console.log(`${playerSelection} vs ${computerSelection}! That's a Tie`);
        return "tie";
    }
    //if none of the above is true, computer wins
    else{
        console.log(`You Lose! ${computerSelection} beats ${playerSelection}`);
        return "computer won";
    }
}

function reformatPlayerSelection(playerSelection){
    let firstCharacter = playerSelection[0].toUpperCase();
    let selectionMinusFirstCharacter = playerSelection.slice(1).toLowerCase();
    return firstCharacter + selectionMinusFirstCharacter;
}

function game(){
    let playerScore = 0;
    let computerScore = 0;
    //play 5 rounds
    for(let roundCount = 1; roundCount <= 5; roundCount++){
        //print round number
        console.log(`**** Round ${roundCount} ****`);
        //loop until the player enters a correct input
        let isSelectionCorrect  = false;
        let playerSelection = null;
        while (isSelectionCorrect == false) {
            playerSelection = prompt("Enter your selection: Rock, Paper or Scissors\n");
            //exit the game if the player cancels
            if(playerSelection == null) {
                console.log("Game cancelled");
                return;
            }
            //reformat the player input to make the first character capitalized
            playerSelection = reformatPlayerSelection(playerSelection);
            if (playerSelection == "Rock" || playerSelection == "Paper" || playerSelection == "Scissors") {
                isSelectionCorrect = true;
            }
            else console.log("Wrong selection! Try again");
        }
        //get the computer's selection
        let computerSelection = getComputerChoice();
        //play a round
        let roundResult = playRound(playerSelection, computerSelection);
        //adjust total score
        if (roundResult == "player won") playerScore++;
        else if (roundResult == "computer won") computerScore++;
    }
    //print the winner
    if(playerScore > computerScore) console.log(`You Win ${playerScore} to ${computerScore}`);
    else if(playerScore < computerScore) console.log(`Computer Wins ${computerScore} to ${playerScore}`)
    else console.log("It's a Tie");
}

game();