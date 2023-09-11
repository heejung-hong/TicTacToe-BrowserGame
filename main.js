/*-------- constants --------*/


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





/*----- event listeners -----*/





/*-------- functions --------*/
// call the init function
init()
// initialize all state, then call render() to visualize the state in the DOM
function init() {
  // to visualize the board's mapping to the DOM,
  // rotate the board array 90 degrees counter-clockwise
  board = [ // no let or const to use the state variable above
    [0, 0, 0], // col 0
    [0, 0, 0], // col 1
    [0, 0, 0]  // col 2
  ];
  // when game starts, it will be player one 
  turn = 1;
  // when game starts, there is no winner
  winner = null;
  render();
}

function render() {
  
}