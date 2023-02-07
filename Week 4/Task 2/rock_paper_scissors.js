const Player_score_display = document.getElementById("Player_score_display");
const Computer_score_display = document.getElementById("Computer_score_display");
const Result_display = document.getElementById("Result_display");

const Controls = document.querySelectorAll("#Controls button");

let playerScore = 0;
let computerScore = 0;

function setup(){
  for (i = 0; i <Controls.length; i++){
    Controls[i].addEventListener('click',function(e){
      playRound(e.target.value);
    });
  }
}

function computerPlay(){
  let options = ["Rock","Paper","Scissors"];
  let choice = Math.floor(Math.random()*3); //Random * (max-min+1)+min
  return(options[choice]);
}

function playRound(playerSelection){
  //TODO: see if keep_score can be combined into this if you have time.
  let computerSelection = computerPlay();
  Result_display.textContent = `You chose: ${playerSelection}, Computer chose: ${computerSelection}`;
  if(
    (playerSelection === "Rock" && computerSelection === "Scissors") ||
    (playerSelection === "Paper" && computerSelection === "Rock") ||
    (playerSelection === "Scissors" && computerSelection ==="Paper")
  ) {
    keep_score("playerWin");
  }
  else if (playerSelection == computerSelection){
    keep_score("draw");
  } else {
    keep_score("computerWin");
  }
}

//This function is basically a remodeled version of game() from last week
function keep_score(result){
  if(playerScore < 5 && computerScore < 5)
  {
    switch(result){
      case "playerWin":
        playerScore++;
        Player_score_display.textContent = playerScore;
        Result_display.textContent += `, You win!`;
        break;
    
      case "computerWin":
        computerScore++;
        Computer_score_display.textContent = computerScore;
        Result_display.textContent += `, You lose`;
        break;
    
      case "draw":
        Result_display.textContent += `, It's a draw`;
        break;

      default:
        console.log(`ERROR: Round ${(i+1)}, result: ${result}`);
        break;
    }
    //If the score changed and has caused someone to win, end the game
    if(playerScore >= 5 || computerScore >=5){
      Set_win_State();
    }
  }
  else {
    //If a player has a score over 5 someone has won, so end the game
    Set_win_State();
  }
}
function Set_win_State(){
  //find and declare the winner
  const Winner_display = document.getElementById("Winner_display");
  if (playerScore > computerScore){
    Winner_display.textContent = "Congratulations, you win!";
  }
  else{
    Winner_display.textContent = "Unfortunately you lost.";
  }
  //Disable the rock, paper and scissors buttons once the game is over.
  for (i = 0; i <Controls.length; i++){
    Controls[i].disabled = true;
    Controls[i].setAttribute("style","color:black; background-color:#a9abaf; border-color:#556c8d;")
  }
}
setup();