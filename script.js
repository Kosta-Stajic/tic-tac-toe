
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
    const dropToken = (position, playerMark) => {
        const {row, column} = position;

  // Check if the position is within bounds and the cell is empty (value is 0)
  if (row >= 0 && row < rows && column >= 0 && column < columns) {
    const cell = board[row][column];
    if (cell.getValue() === 0) { // Check if the cell is empty
        cell.addToken(playerMark); // Add the player's token to the cell
    } else {
        console.log("This cell is already taken!");
        game.switchPlayerTurn()
    }
} else {
    console.log("Invalid position!");
}
};
    //this method prints the board to the console to see the state of the game.
    //only needed before ui is made.
    const printBoard = () => {
        const getBoard = board.map(row => row.map(cell => cell.getValue()))
        console.log(getBoard)
    }
    return {
        dropToken,
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

 

    //check for winner
    const checkWinner = () => {
        const gameBoard = board.getBoard();
        
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (gameBoard[i][0].getValue() !== 0 &&
                gameBoard[i][0].getValue() === gameBoard[i][1].getValue() &&
                gameBoard[i][0].getValue() === gameBoard[i][2].getValue()) {
                return true;
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (gameBoard[0][i].getValue() !== 0 &&
                gameBoard[0][i].getValue() === gameBoard[1][i].getValue() &&
                gameBoard[0][i].getValue() === gameBoard[2][i].getValue()) {
                return true;
            }
        }

        // Check diagonals
        if (gameBoard[0][0].getValue() !== 0 &&
            gameBoard[0][0].getValue() === gameBoard[1][1].getValue() &&
            gameBoard[0][0].getValue() === gameBoard[2][2].getValue()) {
            return true;
        }

        if (gameBoard[0][2].getValue() !== 0 &&
            gameBoard[0][2].getValue() === gameBoard[1][1].getValue() &&
            gameBoard[0][2].getValue() === gameBoard[2][0].getValue()) {
            return true;
        }

        return false;
    };

    const checkDraw = () => {
        const gameBoard = board.getBoard();
        return gameBoard.every(row => 
            row.every(cell => cell.getValue() !== 0)
        );
    };
   

    //main function for playing rounds, run it with game.playRound
    const playRound = (position) => {
        board.dropToken(position, getActivePlayer().token);
        printNewRound();
        if (checkWinner()) {
            console.log(`${getActivePlayer().name} wins!`);
            return true;  // Game is over
        }
        switchPlayerTurn();
          
    
    }
    
    printNewRound()

    return {
        playRound,
        getActivePlayer,
        switchPlayerTurn,
        
    }
}


const game = gameController();