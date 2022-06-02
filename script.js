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
    return {
        setMarker, getMarker, resetBoard, 
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
        if (gameBoard.getMarker(e.target.id) == undefined) {
            gameBoard.setMarker(e.target.id, currentPlayer.marker);
            e.target.textContent = gameBoard.getMarker(e.target.id);
            switchTurns();
        }
    }
    const switchTurns = () => {
        console.log(`Previous player ${currentPlayer.name} with ${currentPlayer.marker}.`);
        currentPlayer = currentPlayer == player1 ? player2 : player1;
        console.log(`Current player ${currentPlayer.name} with ${currentPlayer.marker}.`);
    };
    return {

    };
})();