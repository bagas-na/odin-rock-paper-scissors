function getComputerChoice () {
    var hand = Math.floor(Math.random()*3);
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
    var hand = prompt(
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
    var hand = +handNumber;
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
    var handName = hand.toLowerCase();

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

    var result = mod(playerHandNumber - computerHandNumber, 3);
    // console.log(result);
    switch(result) {
        case 2:
            return `You lose! ${computerSelection} beats ${playerSelection}`;
            break;

        case 0:
            return `You are tied! You both choose ${computerSelection}`;
            break;

        case 1:
            return `You win! ${playerSelection} beats ${computerSelection}`;
            break;
        
        default:
            break;
    }

}

function game(){
    for (var i = 0; i < 1; i++){
        const computerChoice = getComputerChoice();
        console.log(`Computer has chosen ${computerChoice}!`);

        const playerChoice = getPlayerChoice();
        console.log(`You have chosen ${playerChoice}!`);

        console.log(playRound(playerChoice, computerChoice));
    }
}

const resultText = document.querySelector('.result');
const playerChoiceText = document.querySelector('#player-choice > .choice');
const computerChoiceText = document.querySelector('#computer-choice > .choice');

const buttonSelection = document.querySelectorAll('.player-choice > .choices > button');
buttonSelection.forEach((button) => {

    button.addEventListener(('click'), function(e) {
        const playerChoice = this.value;
        const computerChoice = getComputerChoice();

        playerChoiceText.textContent = playerChoice;
        computerChoiceText.textContent = computerChoice;
        resultText.textContent = playRound(playerChoice, computerChoice);

    });
});