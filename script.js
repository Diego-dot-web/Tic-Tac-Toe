function Gameboard (){
    const board = [];
    const rows = 3;
    const columns = 3;

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        };
    };

    const getBoard = () => board

    const dropToken = (column,row ,player) => {
       board[row][column].addToken(player) 
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues)
    }

    return{getBoard, dropToken, printBoard}
};

function Cell() {
    let value;

    const addToken = (player) => {
        if (value === undefined){
        value = player
        }
    };

    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}

function GameFlow (playerOneName = "Player One",playerTwoName = "Player Two"){
    const board = Gameboard();

    const players = [
        {
        name: playerOneName,
        token: "X"
        },
        {
        name: playerTwoName,
        token: "O"
        }
    ];

    let activePlayer = players[0]

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;
    
    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (column, row) => {
        console.log(`Player has changed token in ${row} and ${column}`)
        board.dropToken(column ,row, getActivePlayer().token)

        switchPlayerTurn();
        printNewRound();
    }

    printNewRound()

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    }
}

function ScreenController(){
    const game = GameFlow();
    const playerTurnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");

    const updateScreen = () => {
        boardDiv.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

        board.forEach((row, indexRow )=> {


            row.forEach((cell, indexColumn) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");

                cellButton.dataset.row = indexRow;
                cellButton.dataset.column = indexColumn;
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            });

            
        });
    }

    function clickHandlerBoard(e) {
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;
    
        if (!selectedColumn) return;
    
        game.playRound(selectedColumn, selectedRow);
        updateScreen();
    }
    
    boardDiv.addEventListener("click", clickHandlerBoard)
    
    updateScreen()
}

ScreenController();