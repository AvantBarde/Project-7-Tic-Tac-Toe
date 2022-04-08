///////////////////////////////////////////////////////////////////////////
//Grabbing from HTML
////////////////////////////////////////////////////////////////////////////
const boxes = Array.from(document.getElementsByClassName('box'));
const gameboard = document.getElementById('gameboard');
const playText = document.getElementById('playText');
const restartButton = document.getElementById('restartBtn');
const player1 = document.getElementById("player1");
const player2  = document.getElementById("player2");
// const playerOneButton = document.getElementById("secondPlayerButton")
const playerOSubmit = document.getElementById('submit1');
const playerXSubmit = document.getElementById('submit2');
const secondPlayerText = document.getElementById('second-player');
const twoPlayerMode = document.getElementById("twoPlayerMode");


///////////////////////////////////////////////////////////////////////////
//Some global scope variables i'll use
////////////////////////////////////////////////////////////////////////////
const spaces = [null,null,null,null,null,null,null,null,null];
const X_TEXT = "X";
const O_TEXT = "O";
let currentPlayer;

///////////////////////////////////////////////////////////////////////////
//RESTART BUTTON
////////////////////////////////////////////////////////////////////////////
const restart = () => {
  spaces.forEach((space, index)=>{
    spaces[index] = null;
  }) 
  boxes.forEach(box => {
    box.innerText = '';
  })
  playText.innerText = "Let's Play!"
  currentPlayer = X_TEXT;
  player1.value = '';
  player2.value = '';
  buttonContainer.style = 'display:block';
  playerInput.style = 'display:none';
  gameboard.style = `display: none`;
  restartButton.style = `display: none`;
  // body.style = `background-color: black`;
}
restartButton.addEventListener('click', restart);


///////////////////////////////////////////////////////////////////////////
//LINES FOR TIC TAC TOE BOARD
////////////////////////////////////////////////////////////////////////////

const board = () => {
   boxes.map((box, index) => {
    let addStyle = '';
    if(index < 3){
      addStyle += 'border-bottom: 3px solid var(--board-lines-color);';
    }
    if(index % 3 === 2){
      addStyle += 'border-left: 3px solid var(--board-lines-color);';
    }
    if(index % 3 === 0){
      addStyle += 'border-right: 3px solid var(--board-lines-color);';
    }
    if(index > 5){
      addStyle += 'border-top: 3px solid var(--board-lines-color);';
    }
    
    box.style = addStyle;
    
//////////////////////////////////////////////////////////////////////////
//TOGGLE THE MODE BUTTON TO BOARD
///////////////////////////////////////////////////////////////////////////
  const showBoard = () => {
      //if i click 2 player mode:
      gameboard.style = `display: flex;`
      buttonContainer.style = 'display:none';
      playerInput.style = 'display:block'
      restartButton.style = `display: block`
      playText.innerText = `Enter Player Names`
      inputStyles(playText);
      // console.log("clicked 2 player mode")
    }

    
    ///////////////////////////////////////////////////////////////////////////
    //O/X SUBMIT BUTTON FUNCTIONALITY / DESIGN
    ////////////////////////////////////////////////////////////////////////////

    const inputStyles = (elem) => {
      elem.style = `text-align: center; 
                font-size: 40px;
                color: var(--text-color);
                text-transform: uppercase;`;
    }

playerOSubmit.addEventListener('click', function(){
    const myPlayer1 = player1.value;
    const myPlayer2 = player2.value;
    
    if(player1.value === ''){
      inputStyles(playText);
      playText.innerText = 'Enter Player O username';
    }else if(myPlayer2 === ''){
      inputStyles(playText);
      playText.innerText = `Who dares challenge ${myPlayer1}?`
    }else {
      inputStyles(playText);
      playText.innerText =`${myPlayer1} vs ${myPlayer2}`
    }
  })
    

  playerXSubmit.addEventListener('click', function(){
    let myPlayer1 = player1.value;
    let myPlayer2 = player2.value;
    if(myPlayer2 === ''){
      // playText.style = `font-size: 100px;`
      inputStyles(playText);
      playText.innerText = 'Enter Player X username';
    }else if(myPlayer1 === ''){
      inputStyles(playText);
      playText.innerText = `Who dares challenge ${myPlayer2}?`
    }else {
      inputStyles(playText);
   playText.innerText =`${myPlayer1} vs ${myPlayer2}`
    }
    
  })
  //EVENT LISTENER FOR SHOW BOARD FUNCTION (2 player mode button)
         twoPlayerMode.addEventListener('click', showBoard);


///////////////////////////////////////////////////////////////////////////
//Detects if ID = clicked cell/if cell is null/Toggles X and O 
////////////////////////////////////////////////////////////////////////////
    
    const boxClicked = (e) => {
      const id = e.target.id;
      //when you click the current id and it does NOT equal null then it equals current player
      //For each box, if the element within the spaces array does not equal ID/assume it equals null
      //so if equals null:
      if(!spaces[id]){
        //then spaces ---> null ---> O in the array
        spaces[id] = currentPlayer;
        // console.log(spaces[id]);
        // using the .target when i click instead of showing if its an id if will change the inner text to currentPlayer
        e.target.innerText = spaces[id];
        //If the conditionals in my win function are true --> 
        if(playerHasWon(spaces,currentPlayer)){
          let myPlayer1 = player1.value;
          let myPlayer2 = player2.value;
          //if the winning value is x
          if(currentPlayer === X_TEXT){
            playText.innerText = `${myPlayer2} wins!`
                      //if the winning value is O
          }else if(currentPlayer === O_TEXT){
           playText.innerText = `${myPlayer1} wins!`
          }
          if(myPlayer2 === `` || myPlayer1 === ``){
            playText.innerText = 'No Player Entry - Press Restart';
            playText.style = 'font-size: 2rem';
          

          }
          return;
        }
        //Ternary Operater to toggle from X to O through each e.target.innertext click
        currentPlayer = currentPlayer === X_TEXT ? (currentPlayer = O_TEXT) : (currentPlayer = X_TEXT);
        //uses placeholder in single player to target single player mode and when currentPlayer is O which is after I move as X
        if(player1.placeholder === 'Computer Player' && currentPlayer === O_TEXT){
          //EDIT -- my computer AI
          //index will take the value of the first null element in the spaces array (check console)
          let index = spaces.indexOf(null);
          //checks for the first null element in the spaces array and uses the ternary within the function scope to make currentPlayer = O.
          if(spaces[index] === null){
            spaces[index] = currentPlayer;
            //the spaces array stores the values but i use the boxes[index].innertext to have the DOM input the value on the board
            boxes[index].innerText = currentPlayer;
            //use playerwon function to record when the computer wins or no player 
            if(playerHasWon(spaces, currentPlayer)){
              if(player2.value === ''){
                playText.innerText = `no player entry - please restart`;
              }else{
                playText.innerText = player1.value +  ' won';
              }
            };
          }        
          //CURRENT PLAYER IN TH EFUNCTION DEFAULTS AS X TEXT  
          currentPlayer = X_TEXT;
        }
      }
      //Records state of spaces array( or board)
      console.log(spaces);
    }
    box.addEventListener('click', boxClicked)
  })
};

//////////////////////////////////////////////////////////////////
///TIE GAME FUNCTION////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

//if the spaces array has  no 
const tieGame = () => {
  if(!spaces.includes(null)){
    playText.innerText = "Tie Game - Restart";
  }
}


//////////////////////////////////////////////////////////////////
///Winning combos FUNCTION////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

//WINNING COMBOS
// 0,1,2
// 0,3,6
// 0,4,8
// 8,2,5
// 8,6,7
// 4,3,5
// 4,1,7
// 4,2,6
//using a function declaration so i can invoke it before declared
//checks for the winning combos based on list above   
function playerHasWon(board, spot){
  if(board[0] === spot){
    if(board[1] === spot && board[2] === spot){
      console.log(`${spot} on the top`);
      return true;
    }
    if(board[3] === spot && board[6] === spot){
      console.log(`${spot} on the left`);
      return true;
    }
    if(board[4] === spot && board[8] === spot){
      console.log(`${spot} wins diagonally`);
      return true;
    }
  }
  if(board[8] === spot){
    if(board[2] === spot && board[5] === spot){
      console.log(`${spot} wins on the right`);
      return true;
    }
    if(board[6] === spot && board[7] === spot){
      console.log(`${spot} on the bottom`);
      return true;
    }
  }
  if(board[4] === spot){
    if(board[3] === spot && board[5] === spot){
      console.log(`${spot} wins horizontally`)
      return true;
    }
    if(board[1] === spot && board[7] === spot){
      console.log(`${spot} wins vertically`)
      return true;
    }
    if(board[2] === spot && board[6] === spot){
      console.log(`${spot} wins vertically`)
      return true;
    }
  }
  //invokes tie game function if no one wins
  tieGame();

  }



restart();
board();