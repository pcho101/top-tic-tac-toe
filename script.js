const gameBoard = (() => {
    const board = new Array(9);
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
    const grids = document.querySelectorAll('.grid');
    const changeBtn1 = document.querySelector('.change-name-1');
    const changeBtn2 = document.querySelector('.change-name-2');
    const playerName1 = document.querySelector('.player-1-name');
    const playerName2 = document.querySelector('.player-2-name');
    const resetBtn = document.querySelector('.game-reset');
    
    for (let i = 0; i < grids.length; i++) {
        grids[i].addEventListener('click', placeMarker);
    }
    function placeMarker(e) {
        if (gameBoard.getMarker(e.target.id) == undefined && !gameController.isGameOver()) {
            const mark = gameController.getCurrentPlayer().marker;
            gameBoard.setMarker(e.target.id, mark);
            e.target.textContent = gameBoard.getMarker(e.target.id);
            gameController.checkWinner();
            gameController.switchTurns();
        }
    }

    changeBtn1.addEventListener('click', () => {
        const newName = prompt('Enter new name for p1', 'p1');
        gameController.setPlayerName1(newName);
        playerName1.textContent = newName;
    });
    changeBtn2.addEventListener('click', () => {
        const newName = prompt('Enter new name for p2', 'p1')
        gameController.setPlayerName2(newName);
        playerName2.textContent = newName;
    });

    resetBtn.addEventListener('click', () => {
        gameController.resetGame();
        for (let i = 0; i < grids.length; i++) {
            grids[i].textContent = undefined;
        }
    });
})();

const gameController = (() => {
    let player1 = Player('p1', 'x');
    let player2 = Player('p2', 'o');
    let currentPlayer = Math.floor(Math.random()*2) ? player1 : player2;
    let gameOver = false;
    let winner = undefined;

    console.log('New Game!');

    const setPlayerName1 = (name) => {
        player1.name = name;
    };
    const setPlayerName2 = (name) => {
        player2.name = name;
    };
    const getCurrentPlayer = () => {
        return currentPlayer;
    };
    const isGameOver = () => {
        return gameOver;
    };
    const checkWinner = () => {
        const marker = currentPlayer.marker;
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
            winner = currentPlayer;
        }
        if (gameBoard.isFull()) {
            console.log('Tie!');
            gameOver = true;
            winner = 'tie';
        }
    };
    const switchTurns = () => {
        currentPlayer = currentPlayer == player1 ? player2 : player1;
    };
    const resetGame = () => {
        gameBoard.resetBoard();
        gameOver = false;
        winner = undefined;
    };
    return {
        setPlayerName1, setPlayerName2, getCurrentPlayer, isGameOver, checkWinner, switchTurns, resetGame,
    };
})();