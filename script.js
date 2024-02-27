const gameBoard = (function() {
    let board = new Array(9).fill(null);
    console.log(board);

function playerMove(place) {
    if (place >= 0 && place < board.length) {
        board[place] = "X";
        console.log(board); 
    } else {
        console.log("out of reach");
    }
}

function resetBoard() {
    board = new Array(9).fill(null);
    console.log(board); 
}

return {
    makeMove: playerMove,
    reset: resetBoard
};
})();


gameBoard.makeMove(2);

