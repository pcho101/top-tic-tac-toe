const gameBoard = (() => {
    const board = new Array(9);
    // for (let i = 0; i < 9; i++) {
    //     board[i] = Math.floor(Math.random()*2) ? 'x' : 'o';
    // }
    const setMarker = (num, marker) => {
        board[num] = marker;
    };
    const getMarker = (num) => {
        return board[num];
    };
    const resetBoard = () => {
        for (let i = 0; i < 9; i++) {
            board[i] = undefined;
        }
    };
    const isFull = () => {
        for (let i = 0; i < 9; i++) {
            if (board[i] == undefined) {
                return false;
            }
        }
        return true;
    };
    return {
        setMarker, getMarker, resetBoard, isFull,
    };
})();

const Player = (name, marker) => {
    return {name, marker}
};

const displayController = (() => {
    const gridSize = 3;
    const gameGrid = document.querySelector('.game-grid');
    gameGrid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    gameGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize * gridSize; i++) {
        let grid = document.createElement('div');
        grid.classList.add('grid');
        grid.id = `${i}`;
        grid.textContent = gameBoard.getMarker(i);
        gameGrid.appendChild(grid);
    }
    return {
        
    };
})();

const gameController = (() => {
    const player1 = Player('p1', 'x');
    const player2 = Player('p2', 'o');
    let currentPlayer = Math.floor(Math.random()*2) ? player1 : player2;
    console.log('New Game!');
    console.log(`Player ${currentPlayer.name} starts with ${currentPlayer.marker}.`);

    const grids = document.querySelectorAll('.grid');
    for (let i = 0; i < grids.length; i++) {
        grids[i].addEventListener('click', placeMarker);
    }
    function placeMarker(e) {
        if (gameBoard.getMarker(e.target.id) == undefined && !gameOver) {
            gameBoard.setMarker(e.target.id, currentPlayer.marker);
            e.target.textContent = gameBoard.getMarker(e.target.id);
            checkWinner(currentPlayer.marker);
            switchTurns();
        }
    }
    let gameOver = false;
    const checkWinner = (marker) => {
        if (gameBoard.getMarker(0) == marker && gameBoard.getMarker(1) == marker && gameBoard.getMarker(2) == marker ||
            gameBoard.getMarker(3) == marker && gameBoard.getMarker(4) == marker && gameBoard.getMarker(5) == marker ||
            gameBoard.getMarker(6) == marker && gameBoard.getMarker(7) == marker && gameBoard.getMarker(8) == marker ||
            gameBoard.getMarker(0) == marker && gameBoard.getMarker(3) == marker && gameBoard.getMarker(6) == marker ||
            gameBoard.getMarker(1) == marker && gameBoard.getMarker(4) == marker && gameBoard.getMarker(7) == marker ||
            gameBoard.getMarker(2) == marker && gameBoard.getMarker(5) == marker && gameBoard.getMarker(8) == marker ||
            gameBoard.getMarker(0) == marker && gameBoard.getMarker(4) == marker && gameBoard.getMarker(8) == marker ||
            gameBoard.getMarker(2) == marker && gameBoard.getMarker(4) == marker && gameBoard.getMarker(6) == marker) {
            console.log('Winner!');
            gameOver = true;
        }
        if (gameBoard.isFull()) {
            console.log('Tie!');
            gameOver = true;
        }
    };
    const changeBtn1 = document.querySelector('.change-name-1');
    const changeBtn2 = document.querySelector('.change-name-2');
    const playerName1 = document.querySelector('.player-1-name');
    const playerName2 = document.querySelector('.player-2-name');
    changeBtn1.addEventListener('click', changeName);
    changeBtn2.addEventListener('click', changeName);
    function changeName(e) {
        if (e.target.classList == 'change-name-1') {
            const newName = prompt('Enter new name for p1', 'p1');
            player1.name = newName;
            playerName1.textContent = newName;
        }
        else if (e.target.classList == 'change-name-2') {
            const newName = prompt('Enter new name for p2', 'p1')
            player2.name = newName;
            playerName2.textContent = newName;
        }
    }
    const resetBtn = document.querySelector('.game-reset');
    resetBtn.addEventListener('click', () => {
        gameBoard.resetBoard();
        gameOver = false;
        for (let i = 0; i < grids.length; i++) {
            grids[i].textContent = undefined;
        }
    });
    const switchTurns = () => {
        console.log(`Previous player ${currentPlayer.name} with ${currentPlayer.marker}.`);
        currentPlayer = currentPlayer == player1 ? player2 : player1;
        console.log(`Current player ${currentPlayer.name} with ${currentPlayer.marker}.`);
    };
    return {

    };
})();