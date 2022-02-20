window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer')

    let board = ['', '', '', '', '', '', '', '', '',];
    let currentPlayer = 'X';
    let gameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    //DECLARING WINNING CONDITIONS
    /*INDEX OF THE BOARD TO DETERMINE WINNING CONDITIONS
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
    */
    const winningConditions  = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            gameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }
    //CHANGES WHAT THE ANNOUNCER DISPLAYS
    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerHTML = 'Tie';
        }
        announcer.classList.remove('hide')
    }

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innertext === 'O'){
            return false;
        }
        return true;
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }
//REMOVE THE CURRENT PLAYER CLASS, THEN CHANGE IT TO O IF IT WAS X OR X OF IT WAS O AND ASSIGN THE NEW PLAYER CLASS
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }


//IF THE ACTION IS VALID AND THE GAME IS ACTIVE, THEN UPDATE THE TILE WITH THE CURRENT PLAYERS MARK, DETERMINE IF THERE IS A WINNER, AND CHANGE THE PLAYER IF NOT.
    const playerAction = (tile, index) => {
        if(isValidAction(tile) && gameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

//EVENT LISTENER FOR IF A TILE IS CLICKED
        tiles.forEach( (tile, index) =>{
            tile.addEventListener('click', () => playerAction(tile,index));
        });
    resetButton.addEventListener('click', resetBoard);
});


