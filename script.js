//querry selectors

const buttons = document.querySelectorAll(".cell")
const buttonsArray = Array.from(buttons)
const body = document.querySelector(".main")
const newGame = document.querySelector(".newGame")

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
        const { row, column } = position;

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

    return {
        dropToken,
        getBoard,


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

    buttonsArray.forEach(button => {
        button.addEventListener('click', function () {
            const currentPlayer = game.getActivePlayer().token;
            if (checkWinner() || checkDraw()) {
                return
            }
            if (currentPlayer === 1 && button.textContent == "") {
                button.textContent = "X";
            } else if (currentPlayer === 2 && button.textContent == "") {
                button.textContent = "O"
            }

            game.playRound({ row: button.getAttribute("data-row"), column: button.getAttribute("data-column") })
        })
    })

    const resetActivePlayer = () => {
        activePlayer = players[0];
    }

    //main function for playing rounds, run it with game.playRound
    const playRound = (position) => {
        board.dropToken(position, getActivePlayer().token);
        buttonsArray.textContent = getActivePlayer().token;
        if (checkWinner()) {
            alert(`${getActivePlayer().name} wins!`);

            return true;  // Game is over
        } else if (checkDraw()) {
            alert(`It's a Draw!`)
            return true
        }
        switchPlayerTurn();

    }
    return {
        playRound,
        getActivePlayer,
        switchPlayerTurn,
        resetActivePlayer,
        board,
    }
}


let game = gameController();

newGame.addEventListener("click", function () {
    buttonsArray.forEach(button => {
        button.textContent = "";
        // Reset board values to 0
        const currentBoard = game.board.getBoard(); // Recreate the board
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                currentBoard[i][j].addToken(0);
            }
        }
        // Reset active player
        game.resetActivePlayer();
    })
});

