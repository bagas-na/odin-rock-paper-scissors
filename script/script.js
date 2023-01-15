function getComputerChoice () {
    let hand = Math.floor(Math.random()*3);
    switch (hand) {
        case 0:
            return 'rock';
            break;
    
        case 1:
            return 'paper';
            break;
        
        case 2:
            return 'scissor';
            break;

        default:
            break;
    }
}

function getPlayerChoice () {
    let hand = prompt(
        `Input your hand. The choicess are:
        - Rock
        - Paper
        - Scissor`
    );

    hand = hand.toLowerCase();
    return hand;
}

function mod(n, m) {
    `n = number to be evaluated
     m = modulus`
    return ((n % m) + m) % m;
  }

function numberToHand(handNumber) {
    let hand = +handNumber;
    switch (hand) {
        case 0:
            return 'rock';
            break;
    
        case 1:
            return 'paper';
            break;
        
        case 2:
            return 'scissor';
            break;

        default:
            break;
    }
}

function handToNumber(hand) {
    let handName = hand.toLowerCase();

    switch (handName) {
        case 'rock':
            return 0;
            break;
    
        case 'paper':
            return 1;
            break;
        
        case 'scissor':
            return 2;
            break;

        default:
            break;
    };
}

function playRound(playerSelection, computerSelection){
    playerHandNumber = handToNumber(playerSelection);
    computerHandNumber = handToNumber(computerSelection);

    let result = mod(playerHandNumber - computerHandNumber, 3);
    // console.log(result);
    switch(result) {
        case 2:
            return `You lose this round! ${computerSelection} beats ${playerSelection}`;
            break;

        case 0:
            return `You are tied this round! You both choose ${computerSelection}`;
            break;

        case 1:
            return `You win this round! ${playerSelection} beats ${computerSelection}`;
            break;
        
        default:
            break;
    }

}

function playResult(playerSelection, computerSelection){
    // returns an array of [playerScore, computerScore]
    playerHandNumber = handToNumber(playerSelection);
    computerHandNumber = handToNumber(computerSelection);

    let result = mod(playerHandNumber - computerHandNumber, 3);
    // console.log(result);
    switch(result) {
        case 2: // Player loses, computer wins
            return [0, 1];

        case 1: // Player wins, computer loses
            return [1, 0];
        
        default: // Else is a tie
            return [0, 0];
    }
}

function game(){
    for (let i = 0; i < 1; i++){
        const computerChoice = getComputerChoice();
        console.log(`Computer has chosen ${computerChoice}!`);

        const playerChoice = getPlayerChoice();
        console.log(`You have chosen ${playerChoice}!`);

        console.log(playRound(playerChoice, computerChoice));
    }
}

function gameOver(playerScore, computerScore){
    const gameOverText = document.createElement('div');
    gameOverText.classList.add('win-message');
    const gameResult = document.createElement('div');
    gameResult.classList.add('win-message');    

    const resetButton = document.createElement('button');
    resetButton.classList.add("reset");
    resetButton.classList.add("button");
    resetButton.textContent = "Reset Game";
    resetButton.addEventListener(("click"), function(e){
        playerChoiceText.textContent = "your hand";
        computerChoiceText.textContent = "computer's hand";  

        playerScore.textContent = 0;
        computerScore.textContent = 0;

        gameOverText.remove();
        gameResult.remove();
        this.remove();
    });

    gameOverText.textContent = "Game Over";

    if (playerScore.textContent > computerScore.textContent) {
        gameResult.textContent = "You have won the game!";
    } else {
        gameResult.textContent = "You have lost the game :(";
    };

    bodyElement.appendChild(gameOverText); 
    bodyElement.appendChild(gameResult); 
    bodyElement.appendChild(resetButton);
}

function gameReset(){
    playerChoiceText.textContent = "your hand";
    computerChoiceText.textContent = "computer's hand";  

    playerScore.textContent = 0;
    computerScore.textContent = 0;
}

const MAX_SCORE = 5;

const resultText = document.querySelector('.result');
const playerChoiceText = document.querySelector('#player-choice > .choice');
const computerChoiceText = document.querySelector('#computer-choice > .choice');
const playerScore = document.querySelector('.player-score');
const computerScore = document.querySelector('.computer-score');
const scoreTable = document.querySelector('.score');
const bodyElement = document.querySelector('body');

const buttonSelection = document.querySelectorAll('.player-choice > .choices > button');
// const resetButton = document.createElement('button')

buttonSelection.forEach((button) => {

    button.addEventListener(('click'), function(e) {
        // Action when MAX_SCORE has been reached (Game Over)
        if((playerScore.textContent >= MAX_SCORE)||(computerScore.textContent >= MAX_SCORE)) {
            return null;
        }

        const playerChoice = this.value;
        const computerChoice = getComputerChoice();

        let playScore = playResult(playerChoice, computerChoice);

        playerChoiceText.textContent = playerChoice;
        computerChoiceText.textContent = computerChoice;       
        resultText.textContent = playRound(playerChoice, computerChoice);

        // Adds player's score
        playerScore.textContent = +playerScore.textContent + +playScore[0];

        // Adds computer's score
        computerScore.textContent = +computerScore.textContent + +playScore[1];

        if((playerScore.textContent >= MAX_SCORE)||(computerScore.textContent >= MAX_SCORE)) {
            gameOver(playerScore, computerScore);
            return null;
        }
        
    });
});