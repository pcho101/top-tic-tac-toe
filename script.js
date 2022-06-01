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

const gameController = (() => {
    const player1 = Player('p1', 'x');
    const player2 = Player('p2', 'o');
    return {

    };
})();