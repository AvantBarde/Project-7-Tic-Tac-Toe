//CHECK CTR F FOR WHAT I NEED TO EDIT (REFACTOR)
const singlePlayerMode = document.getElementById('onePlayerMode');
// const realPlayer = document.getElementById('second-player');


//When i press the restart button in the 1 player mode, I want all of my settings to default back to 2 player mode
const singlePlayerRestart = () => {
  let myPlayer1 = player1.value;
  console.log('restart');
  // realPlayer.style = `display: block;`;
  player1.placeholder = "Enter Player O Name"; 
  playerOSubmit.addEventListener('click', function(){
    let myPlayer1 = player1.value;
    if(myPlayer1 === ''){
     // playText.style = `font-size: 100px;`
     playText.innerText = 'Enter Player O Username';
  }
});
  restart();
}

//When i click single player mode, I want all the settings to defer to single player mode 
const clickedOnePlayerMode = singlePlayerMode.addEventListener('click', (e) => {
  player1.placeholder = "Computer Player"; 
  
  gameboard.style = `display: flex;`
  buttonContainer.style = 'display:none';
  playerInput.style = 'display:block';
  restartButton.style = `display: block`;
  playText.innerText = `Player vs Computer`;
  //if i press restart: 
  restartButton.addEventListener('click', singlePlayerRestart);

//This is how I know im in the one player mode now by using the computer player placeholder as an anchor
if(player1.placeholder === "Computer Player"){
  console.log("COMPUTER");
  console.log(spaces);
  player1.value = "Computer";
  playerOSubmit.addEventListener('click', function(){
    let myPlayer1 = player1.value;
    if(myPlayer1 === ''){
     // playText.style = `font-size: 100px;`
     playText.innerText = 'Enter Computer Name';
  }//EDIT
  if(myPlayer1 !== `` && myPlayer1 !== `Computer`){
    myPlayer1 = myPlayer1 + " (Computer)";
  }
});

}


});


