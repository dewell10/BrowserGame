// query selectors
const tiles = Array.from(document.querySelectorAll(".tile"));
const playerDisplay = document.querySelector(".display-player");
const resetButton = document.querySelector("#reset");
const announcer = document.querySelector(".announcer");

// data
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// messages
const PLAYERX_WON = "PLAYERX_WON";
const PLAYERO_WON = "PLAYERO_WON";
const TIE = "TIE";

// helper functions
function isValidAction(tile) {
  if (tile.innerText === "X" || tile.innerText === "O") {
    return false;
  }
  return true;
}

function addMarker(tile) {
  tile.innerText = currentPlayer;
  tile.classList.add(`player${currentPlayer}`);
}

function updateBoard(index) {
  board[index] = currentPlayer;
}

function checkWinOrTie() {
  for (let i = 0; i < winConditions.length; i++) {
    const winCondition = winConditions[i];
    const playerMarkA = board[winCondition[0]];
    const playerMarkB = board[winCondition[1]];
    const playerMarkC = board[winCondition[2]];
    // prevent bug of 3 empty strings declaring gameOver is true
    if (playerMarkA === "" || playerMarkB === "" || playerMarkC === "") {
      continue; // skip this interation of the for loop
    }
    // if 3 X's or O's in a row, declare gameOver is true
    if (playerMarkA === playerMarkB && playerMarkB === playerMarkC) {
      gameOver = true;
      break; // ends the for loop
    }
  }
  // check for tie
  if (!board.includes('')) gameOver = true
}

function announceWinnerOrTie() {
  if (gameOver) {
   (currentPlayer === "X" ? announcer.innerHTML = 'Player <span class="playerX">X</span> Won': announcer.innerHTML = 'Player <span class="playerO">O</span> Won')
    announcer.classList.remove("hide");
    if (!board.includes(''))  announcer.innerHTML = "Tie";
  }
}


function changePlayer() {
  playerDisplay.classList.remove(`player${currentPlayer}`);
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  playerDisplay.innerText = currentPlayer;
  playerDisplay.classList.add(`player${currentPlayer}`);
}

function playerClick(tile, index) {
  if (isValidAction(tile) && !gameOver) {
    addMarker(tile);
    updateBoard(index);
    checkWinOrTie();
    announceWinnerOrTie();
    changePlayer();
  }
}

function resetBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  announcer.classList.add("hide");
  if (currentPlayer === "O") {
    changePlayer();
  }
  tiles.forEach((tile) => {
    tile.innerText = "";
    tile.classList.remove("playerX");
    tile.classList.remove("playerO");
  });
}

// event listeners
tiles.forEach((tile, index) => {
  tile.addEventListener("click", () => playerClick(tile, index));
});
resetButton.addEventListener("click", resetBoard);