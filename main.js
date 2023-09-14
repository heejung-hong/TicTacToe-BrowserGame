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
const boardEls = [...document.querySelectorAll('#board > div:nth-child(-n+3)')];
// console.log(boardEls)
/*----- event listeners -----*/
// In response to user interaction, update all impacted state, then call render()
// use event delegation
// document.getElementById('board').addEventListener('click', selectBox) // provide selectBox as a callback function

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
  // renderMessage();
  // // hide and show UI elements (controls)
  // renderControls();
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


// function selectBox(event) {
//   // console.log(event.target)
//   // column that was clicked
//   const colIdx = boardEls.indexOf(event.target);
//   // console.log(colIdx);
//   const colArr = board[colIdx]; // Shortcut to column array 
//   // find the index of the first 0 in colArr
//   const rowIdx = colArr.indexOf(0);
//   // Update the board state with the current player value (turn)
//   // board[colIdx][rowIdx] = turn;
//   colArr[rowIdx] = turn;
//   turn *= -1 // changes the player
//   render()
// }