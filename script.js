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
    const isEmpty = () => {
        for (let i = 0; i < 9; i++) {
            if (board[i] != undefined) {
                return false;
            }
        }
        return true;
    };
    return {
        setMarker, getMarker, resetBoard, isFull, isEmpty,
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
    const gameDisplay = document.querySelector('.game-display');
    const turnDisplay = document.querySelector('.turn-display');
    const checkBox = document.querySelector('#robot');
    const playerProfile1 = document.querySelector('.player-1');
    const playerProfile2 = document.querySelector('.player-2');
    const modal = document.querySelector('.modal');
    const nameField = document.querySelector('.name-textbox');
    let editPlayer = 1;

    for (let i = 0; i < grids.length; i++) {
        grids[i].addEventListener('click', placeMarker);
    }
    function placeMarker(e) {
        if (gameBoard.getMarker(e.target.id) == undefined && !gameController.isGameOver()) {
            playerMove(e);
            nextTurn();
            if (checkBox.checked && !gameController.isGameOver()) {
                computerMove();
                nextTurn();
            }
        }
    }
    const playerMove = (e) => {
        gameBoard.setMarker(e.target.id, gameController.getCurrentPlayer().marker);
        e.target.textContent = gameBoard.getMarker(e.target.id);
        e.target.classList.remove('empty');
    }
    const computerMove = () => {
        let move = gameController.findBestMove();
        gameBoard.setMarker(move, gameController.getCurrentPlayer().marker);
        grids[move].textContent = gameBoard.getMarker(move);
        grids[move].classList.remove('empty');
    }
    const nextTurn = () => {
        gameController.checkWinner();
        playerProfile1.classList.toggle('cur-turn');
        playerProfile2.classList.toggle('cur-turn');
        if (gameController.isGameOver()) {
            displayWinner(gameController.getWinner());
        }
        else {
            gameController.switchTurns();
            turnDisplay.textContent = `It is ${gameController.getCurrentPlayer().name}'s move (${gameController.getCurrentPlayer().marker}) pieces`;
        }
    }
    const displayWinner = (winner) => {
        gameDisplay.innerHTML = 'Game Over! Click <span>Reset Game</span> to try again'
        if (winner == undefined) {
            turnDisplay.textContent = 'Tie Game';
            playerProfile1.classList.add('cur-turn');
            playerProfile2.classList.add('cur-turn');
        }
        else {
            turnDisplay.textContent = `${winner.name} is the winner with the (${winner.marker}) pieces`;
            for (let i = 0; i < grids.length; i++) {
                if(gameBoard.getMarker(i) == winner.marker) {
                    grids[i].classList.add('winner');
                }
                else if(gameBoard.getMarker(i) != winner.marker && gameBoard.getMarker(i) != undefined) {
                    grids[i].classList.add('loser');
                }
            }
            if (winner.marker == 'x') {
                playerProfile1.classList.add('winner');
                playerProfile2.classList.add('loser');
                
            }
            else {
                playerProfile1.classList.add('loser');
                playerProfile2.classList.add('winner');
            }
        }
    };

    function openModal() {
        modal.style.display = 'block';
        nameField.value = editPlayer == 1 ? playerName1.textContent : playerName2.textContent;
        nameField.select();
    }
    
    function closeModal() {
        modal.style.display = 'none';
        if (nameField.value == '') {
            return;
        }
        if (editPlayer == 1) {
            gameController.setPlayerName1(nameField.value);
            playerName1.textContent = nameField.value;
        }
        else {
            gameController.setPlayerName2(nameField.value);
            playerName2.textContent = nameField.value;
        }
    }
    
    window.addEventListener('click', function(e) {
        if (e.target == modal) {
            closeModal();
        }
    });
    
    changeBtn1.addEventListener('click', () => {
        editPlayer = 1;
        openModal();
    });
    changeBtn2.addEventListener('click', () => {
        editPlayer = 2;
        openModal();
    });

    resetBtn.addEventListener('click', () => {
        gameController.resetGame();
        for (let i = 0; i < grids.length; i++) {
            grids[i].textContent = undefined;
            grids[i].classList.remove('winner');
            grids[i].classList.remove('loser');
            grids[i].classList.add('empty');
        }
        resetBtn.textContent = 'Reset Game';
        playerProfile1.classList.remove('winner');
        playerProfile2.classList.remove('winner');
        playerProfile1.classList.remove('loser');
        playerProfile2.classList.remove('loser');
        playerProfile1.classList.remove('cur-turn');
        playerProfile2.classList.remove('cur-turn');
        if (gameController.getCurrentPlayer().marker == 'x') {
            playerProfile1.classList.add('cur-turn');
        }
        else {
            playerProfile2.classList.add('cur-turn');
        }
        gameDisplay.textContent = 'Tic Tac Toe Match';
        turnDisplay.textContent = `It is ${gameController.getCurrentPlayer().name}'s move (${gameController.getCurrentPlayer().marker}) pieces`;
    });
})();

const gameController = (() => {
    let player1 = Player('P1 Name', 'x');
    let player2 = Player('P2 Name', 'o');
    let currentPlayer = Math.floor(Math.random()*2) ? player1 : player2;
    let gameOver = true;
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
    const getOtherPlayer = () => {
        return currentPlayer == player1 ? player2 : player1;
    }
    const isGameOver = () => {
        return gameOver;
    };
    const checkWinner = () => {
        if (eval() == 10) {
            gameOver = true;
            winner = currentPlayer;
        }
        else if (gameBoard.isFull()) {
            gameOver = true;
            winner = undefined;
        }
    };
    const getWinner = () => {
        return winner;
    };
    const switchTurns = () => {
        currentPlayer = currentPlayer == player1 ? player2 : player1;
    };
    const resetGame = () => {
        gameBoard.resetBoard();
        currentPlayer = Math.floor(Math.random()*2) ? player1 : player2;
        gameOver = false;
        winner = undefined;
    };

    const findBestMove = () => {
        let bestVal = -100;
        let bestMove = -1;
        for (let i = 0; i < 9; i++) {
            if (gameBoard.getMarker(i) == undefined) {
                const mark = getCurrentPlayer().marker;
                gameBoard.setMarker(i, mark);
                let moveVal = minimax(0, false);
                gameBoard.setMarker(i, undefined);
                if (moveVal > bestVal) {
                    bestMove = i;
                    bestVal = moveVal;
                }
            }
        }
        return bestMove;
    }
    const minimax = (depth, isMax) => {
        let best;
        let score = eval();
        if (score >= 7) {
            return score - depth;
        }
        if (score <= -7) {
            return score + depth;
        }
        if (gameBoard.isFull()) {
            return 0;
        }
        if (isMax) {
            best = -100;
            for (let i = 0; i < 9; i++) {
                if (gameBoard.getMarker(i) == undefined) {
                    gameBoard.setMarker(i, getCurrentPlayer().marker);
                    best = Math.max(best, minimax(depth + 1, !isMax));
                    gameBoard.setMarker(i, undefined);
                }
            }
        }
        else {
            best = 100;
            for (let i = 0; i < 9; i++) {
                if (gameBoard.getMarker(i) == undefined) {
                    gameBoard.setMarker(i, getOtherPlayer().marker);
                    best = Math.min(best, minimax(depth + 1, !isMax));
                    gameBoard.setMarker(i, undefined);
                }
            }
        }
        return best;
    };
    const eval = () => {
        for (let row = 0; row < 3; row++) {
            if (gameBoard.getMarker(row*3) == gameBoard.getMarker(row*3+1) && 
                gameBoard.getMarker(row*3+1) == gameBoard.getMarker(row*3+2) &&
                gameBoard.getMarker(row*3) != undefined) {
                if (gameBoard.getMarker(row*3) == getCurrentPlayer().marker) {
                    return 10;
                }
                else if (gameBoard.getMarker(row*3) == getOtherPlayer().marker) {
                    return -10;
                }
            }
        }
        for (let col = 0; col < 3; col++) {
            if (gameBoard.getMarker(col) == gameBoard.getMarker(col+3) && 
                gameBoard.getMarker(col+3) == gameBoard.getMarker(col+6) &&
                gameBoard.getMarker(col) != undefined) {
                if (gameBoard.getMarker(col) == getCurrentPlayer().marker) {
                    return 10;
                }
                else if (gameBoard.getMarker(col) == getOtherPlayer().marker) {
                    return -10;
                }
            }
        }
        if (gameBoard.getMarker(0) == gameBoard.getMarker(4) && 
            gameBoard.getMarker(4) == gameBoard.getMarker(8) &&
            gameBoard.getMarker(0) != undefined) {
            if (gameBoard.getMarker(0) == getCurrentPlayer().marker) {
                return 10;
            }
            else if (gameBoard.getMarker(0) == getOtherPlayer().marker) {
                return -10;
            }
        }
        if (gameBoard.getMarker(2) == gameBoard.getMarker(4) && 
            gameBoard.getMarker(4) == gameBoard.getMarker(6) &&
            gameBoard.getMarker(2) != undefined) {
            if (gameBoard.getMarker(2) == getCurrentPlayer().marker) {
                return 10;
            }
            else if (gameBoard.getMarker(2) == getOtherPlayer().marker) {
                return -10;
            }
        }
        return 0;
    };
    return {
        setPlayerName1, setPlayerName2, getCurrentPlayer, isGameOver, checkWinner, getWinner, switchTurns, resetGame, findBestMove,
    };
})();