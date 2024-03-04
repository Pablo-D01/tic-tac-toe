const gameBoard = (function() {
    let board = new Array(9);
    for(let i = 0; i < board.length; i++) {
        board[i] = i;
    }
    console.log(board);



    function resetBoard() {
        for(let i = 0; i < board.length; i++) {
            board[i] = i;
        }
        console.log(board);
    }



    function emptyIndexies(emptyBoard){
        return  emptyBoard.filter(s => s != "O" && s != "X");
    }

    let huPlayer = "X";
    let aiPlayer = "O";

    function winning(board, player){
        if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
        ) {
        return true;

        } else {
        return false;
        }
    }

    return {
        resetBoard,
        aiPlayer,
        huPlayer,
        board,
        emptyIndexies,
        winning
    };
})();


const mainMinMax = (function(){
    function minmax(newBoard, player) { 
        var availSpots = gameBoard.emptyIndexies(newBoard);
    
    /* checks who is closer to win */
        if (gameBoard.winning(newBoard, gameBoard.huPlayer)){
            return {score:-10};
        }
            else if (gameBoard.winning(newBoard, gameBoard.aiPlayer)){
            return {score:10};
        }
        else if (availSpots.length === 0){
            return {score:0};
        }
    
// an array to collect all the objects
        var moves = [];
// loop through available spots
        for (var i = 0; i < availSpots.length; i++){
//create an object for each and store the index of that spot 
        var move = {};
        move.index = newBoard[availSpots[i]];

// set the empty spot to the current player
        newBoard[availSpots[i]] = player;

/*collect the score resulted from calling minimax on the opponent of the current player*/
        if (player == gameBoard.aiPlayer){
        var result = minmax(newBoard, gameBoard.huPlayer);
        move.score = result.score;
        }
        else{
        var result = minmax(newBoard, gameBoard.aiPlayer);
        move.score = result.score;
        }

// reset the spot to empty
        newBoard[availSpots[i]] = move.index;

// push the object to the array
        moves.push(move);
  }
  // if it is the computer's turn loop over the moves and choose the move with the highest score
        var bestMove;
        if(player === gameBoard.aiPlayer){
            var bestScore = -10000;
            for(var i = 0; i < moves.length; i++){
            if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
      }
    }
  }         else{
// else loop over the moves and choose the move with the lowest score
                var bestScore = 10000;
                for(var i = 0; i < moves.length; i++){
                if(moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                    }
                }
            }

// return the chosen move (object) from the moves array
    return moves[bestMove];
}
return {
    minmax: minmax
};
})();




const gameplay = (function(){

    function playerMove(place) {
        if (place >= 0 && place < gameBoard.board.length) {
            gameBoard.board[place] = "X";
            console.log(gameBoard.board); 
        } else {
            console.log("out of reach");
        }
        checkWinner();
        aiMove();
    }

    function aiMove() {
        let bestMove = mainMinMax.minmax(gameBoard.board, gameBoard.aiPlayer);
        let place = bestMove.index;
        console.log(bestMove)
        if (place >= 0 && place < gameBoard.board.length) {
            gameBoard.board[place] = "O";
            console.log(gameBoard.board); 
        } else {
            console.log("out of reach");
        }
        checkWinner();
    }

    function whoStarts(player){
        if (player =='aiPlayer') {
            gameplay.aiMove();
        }
        else{
           alert('You start! Use console!')
        }
    }

    function checkWinner() {
        const isHumanWinning = gameBoard.winning(gameBoard.board, gameBoard.huPlayer);
        const isAiWinning = gameBoard.winning(gameBoard.board, gameBoard.aiPlayer);
        
        if (isHumanWinning) {
            alert('You won, congrats!');
            gameBoard.resetBoard();
        }
        else if(isAiWinning){
            alert('Ai beat you!');
            gameBoard.resetBoard();
            }
        else if(gameBoard.emptyIndexies(gameBoard.board).length === 0){
            alert('DRAW');
            gameBoard.resetBoard();
        }
        else{
            console.log('Game on...')
        }
        }

    return{
        aiMove,
        playerMove,
        whoStarts
    };
})()

// gameplay.playerMove(0);

console.log(gameBoard.emptyIndexies(gameBoard.board))
// gameBoard.winning(gameBoard.board, gameBoard.huPlayer)
let bestMove = mainMinMax.minmax(gameBoard.board, gameBoard.aiPlayer);
console.log(bestMove)