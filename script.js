const gameBoard = (() => {
    const board = new Array(9);
    const setMarker = (num, marker) => {
        board[num] = marker;
    }
    const resetBoard = () => {
        for (let i=0; i<gameBoardSize; i++) {
            board[i] = undefined;
        }
    };
    return {
        setMarker, resetBoard,
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
        grid.textContent = 'x';
        gameGrid.appendChild(grid);
    }
    return {
        
    };
})();

const gameController = (() => {
    const player1 = Player('p1', 'x');
    const player2 = Player('p2', 'o');
    return {

    };
})();