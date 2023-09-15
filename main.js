/*-------- constants --------*/
const COLORS = {
  '0': 'white',
  '1': 'paleturquoise',
  '-1': 'pink'
};
const SHAPE = {
  '1': 'X',
  '-1': 'O'
}

/*----- state variables -----*/
// board: 2D array
let board; 
  // null to represent no player in particular cell
  // cell to hold 1 or -1
// turn: use 1 and -1
let turn;
  // winner: 
let winner;
  // null to represent no winner
  // 1 or -1 winner
  // 'T' for tie

/*----- cached elements -----*/
const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');
const boardEls = [...document.querySelectorAll('#board > div')];
// console.log(boardEls) // [div#c0, div#c1, div#c2, div#c3, div#c4, div#c5, div#c6, div#c7, div#c8]
/*----- event listeners -----*/
// In response to user interaction, update all impacted state, then call render()
// use event delegation
document.getElementById('board').addEventListener('click', selectBox) // provide selectBox as a callback function

/*-------- functions --------*/
// call the init function
init()
// initialize all state, then call render() to visualize the state in the DOM
function init() {
  // to visualize the board's mapping to the DOM,
  // rotate the board array 90 degrees counter-clockwise
  board = [ // no let or const to use the state variable above
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
  ];
  // when game starts, it will be player one 
  turn = 1;
  // when game starts, there is no winner
  winner = null;
  render();
}

// render to visialize all state in the DOM
function render() {
  renderBoard();
  renderMessage();
  // hide and show UI elements (controls)
  renderControls();
}

// interate over board array to visualize the board
function renderBoard() {
  board.forEach(function(boardEl, idx) { // board has 3 column elements
    // console.log(boardEl, idx) // 00 01 02 03 04 05 06 07 08
    // boardEl is 0, 1, or -1    
    const cellId = `c${idx}`;
    // console.log(cellId) // c0 c1 c2 c3 c4 c5 c6 c7 c8
    const cellEl = document.getElementById(cellId)
    // console.log(cellEl) // <div id="c0" style="background-color: paleturquoise;"></div>
    cellEl.style.backgroundColor = COLORS[boardEl] // use object to lookup color in constants above
  });
}

function selectBox(event) {
  // console.log(event.target)
  // column that was clicked
  const boardEl = boardEls.indexOf(event.target);
  // console.log(boardEl); // after click return 0 1 2 3 4 5 6 7
  board[boardEl] = turn; // update board array with turn in the index clicked
  // console.log(boardEl); // returns the index number and changes the color of the boardEl
  turn *= -1 // changes the player
  winner = getWinner(board)
  render()
}

// Check for winner in board state and return null if no winner, 1 or -1 if a player has won, else 'T'

// if index 0, 1, 2 === 1 or -1
function getWinner(board){
  return rowOneX(board) ||
    rowOneO(board) ||
    rowTwoX(board) ||
    rowTwoO(board) ||
    rowThreeX(board) ||
    rowThreeO(board) ||
    colOneX(board) ||
    colOneO(board) ||
    colTwoX(board) ||
    colTwoO(board) ||
    colThreeX(board) ||
    colThreeO(board)
}
function rowOneX(board){
  return (board[0] === 1 && board[1] === 1 && board[2] === 1) ? board[2] : null; 
}
function rowOneO(board){
  return (board[0] === -1 && board[1] === -1 && board[2] === -1) ? board[2] : null; 
}
function rowTwoX(board){
  return (board[3] === 1 && board[4] === 1 && board[5] === 1) ? board[5] : null; 
}
function rowTwoO(board){
  return (board[3] === -1 && board[4] === -1 && board[5] === -1) ? board[5] : null; 
}
function rowThreeX(board){
  return (board[6] === 1 && board[7] === 1 && board[8] === 1) ? board[8] : null; 
}
function rowThreeO(board){
  return (board[6] === -1 && board[7] === -1 && board[8] === -1) ? board[8] : null; 
}
function colOneX(board){
  return (board[0] === 1 && board[3] === 1 && board[6] === 1) ? board[6] : null; 
}
function colOneO(board){
  return (board[0] === -1 && board[3] === -1 && board[6] === -1) ? board[6] : null; 
}
function colTwoX(board){
  return (board[1] === 1 && board[4] === 1 && board[7] === 1) ? board[7] : null; 
}
function colTwoO(board){
  return (board[1] === -1 && board[4] === -1 && board[7] === -1) ? board[7] : null; 
}
function colThreeX(board){
  return (board[2] === 1 && board[5] === 1 && board[8] === 1) ? board[8] : null; 
}
function colThreeO(board){
  return (board[2] === -1 && board[5] === -1 && board[8] === -1) ? board[8] : null; 
}


function renderMessage() {
  if (winner === 'T') {
    messageEl.innerText = 'It\'s a Tie!!!';
  } else if (winner) {
    messageEl.innerHTML = `<span style="color: ${COLORS[winner]}">${SHAPE[winner]}</span> Wins!!!`;
  } else {
    // game is in play
    messageEl.innerHTML = `<span style="color: ${COLORS[turn]}">${SHAPE[turn]}</span>'s Turn`;
  }
}

function renderControls() {
  // Ternary expression is the go to when you want 1 of 2 values returned
  // <conditional expression> ? '<truthy exp>' : '<false exp>'
  playAgainBtn.style.visibility = winner ? 'visible' : 'hidden'
  // don't use display none because it would delete the button and jitter the DOM
}
