
//This object creates a 3x3 array and pushes Cell() values into it.
function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = []

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell())
        }
    }
    //this method gets the entire board to render it later.
    const getBoard = () => board;

    //dropToken method for giving available fields as well as adding player marks.


    //this method prints the board to the console to see the state of the game.
    //only needed before ui is made.
    const printBoard = () => {
        const getBoard = board.map(row => row.map(cell => cell.getValue()))
        console.log(getBoard)
    }
    return {
        getBoard,
        printBoard,

    }
}

//values for the board
function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player
    }
    const getValue = () => value;

    return {
        getValue,
        addToken

    };
}

//controller for the flow of the game
function gameController(playerOneName = "Player One", playerTwoName = "Player Two") {

    const board = gameBoard()
    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ]
    //set active player to player 1
    let activePlayer = players[0]
    //method for switching players between rounds
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const getActivePlayer = () => activePlayer;

    //prints player turn info
    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    //main function for playing rounds, run it with game.playRound
    const playRound = (position) => {
        board.dropToken(position, getActivePlayer().token)
        switchPlayerTurn()
        printNewRound()
    }
    printNewRound()

    return {
        playRound,
        getActivePlayer,
    }
}


const game = gameController();


