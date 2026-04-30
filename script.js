const GAME_RESULT = Object.freeze({
    PLAYER1_WINS: "PLAYER1_WINS",
    PLAYER2_WINS: "PLAYER2_WINS",
    DRAW: "DRAW"
});

const TURN = Object.freeze({
    PLAYER1: "PLAYER1",
    PLAYER2: "PLAYER2"
});

const GAME_STATE = Object.freeze({
    IDLE: "IDLE",
    ONGOING: "ONGOING",
    OVER: "OVER"
});

function newGame(player1, player2){
    let board = new Array(9);
    this.player1 = player1;
    let player1Action = "X";
    this.player2 = player2;
    let player2Action = "O";
    let gameResult = "";
    let turn = Object.values(TURN)[Math.floor(Math.random() * Object.values(TURN).length)];
    let gameState = GAME_STATE.IDLE;

    const getWinner = () => {
        return gameResult === GAME_RESULT.PLAYER1_WINS ? this.player1.getPlayerName() : this.player2.getPlayerName();
    }

    const getGameResult = () => {
        return gameResult;
    }

    const getGameState = () => {
        return gameState;
    }

    const reset = () => {
        board = new Array(9);
        gameResult = "";
        turn = Object.values(TURN)[Math.floor(Math.random() * Object.values(TURN).length)];
        gameState = GAME_STATE.IDLE;
    };

    function play(boardIndex) {
        if(gameState === GAME_STATE.OVER){
            return;
        }

        if (gameState === GAME_STATE.IDLE) {
            gameState = GAME_STATE.ONGOING;
        }

        if (!board[boardIndex]) {
            board[boardIndex] = turn === TURN.PLAYER1 ? player1Action : player2Action;
            toggleTurn();
        }else{
            return;
        }

        let res = checkForWinner(player1Action, player2Action);
        if(res !== GAME_STATE.ONGOING){
            gameResult = res; 
            gameState = GAME_STATE.OVER;
        }
        console.log(res);
    }

    function toggleTurn() {
        turn = turn === TURN.PLAYER1 ? TURN.PLAYER2 : TURN.PLAYER1;
    }

    function checkForWinner(player1Action, player2Action) {

        let i = 0;

        // check for winner Horizontally
        while (i < board.length - 3) {

            if (!board[i]) {
                i += 3;
                continue;
            }

            if (board[i] === board[i + 1] && board[i + 1] === board[i + 2]) {
                if (board[i] === player1Action) {
                    return GAME_RESULT.PLAYER1_WINS;
                } else {
                    return GAME_RESULT.PLAYER2_WINS;
                }
            }

            i += 3;
        }

        // Check for winner Diagnoally from the left
        if (board[0] && board[0] === board[4] && board[4] === board[8]) {
            if (board[0] === player1Action) {
                return GAME_RESULT.PLAYER1_WINS;
            } else {
                return GAME_RESULT.PLAYER2_WINS;
            }
        }

        // Check for winner Diagnoally from the right
        if (board[2] && board[2] === board[4] && board[4] === board[6]) {
            if (board[2] === player1Action) {
                return GAME_RESULT.PLAYER1_WINS;
            } else {
                return GAME_RESULT.PLAYER2_WINS;
            }
        }

        // Check for winner Vertically
        for (let i = 0; i < 3; i++) {
            if (!board[i]) {
                continue;
            }

            if (board[i] === board[i + 3] && board[i + 3] === board[i + 6]) {
                if (board[i] === player1Action) {
                    return GAME_RESULT.PLAYER1_WINS;
                } else {
                    return GAME_RESULT.PLAYER2_WINS;
                }
            }
        }

        for (let i = 0; i < board.length; i++) {
            if (!board[i]) {
                return GAME_STATE.ONGOING;
            }
        }

        return GAME_RESULT.DRAW;
    }

    return {reset, play, getGameResult, getGameState, getWinner};
};

function player(name) {
    let playerName = name;
    let score = 0;

    function increaseScore() {
        score++;
    }

    function getScore() {
        return score;
    }

    function getPlayerName() {
        return playerName
    }

    return { increaseScore, getScore, getPlayerName };
}