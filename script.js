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

    const dropToken = (column, player) => {
        const availableCells = board.filter((row) => row[column].getValue() === 0).map(row => row[column]);
  
        if (!availableCells.length) return;
    
        const lowestRow = availableCells.length - 1;
        board[lowestRow][column].addToken(player);
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues)
    }

    return{getBoard, dropToken, printBoard}
};

function Cell() {
    let value = 0;
  
    const addToken = (player) => {
      value = player;
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

    const playRound = (column) => {
        console.log(`Player has changed token in ${column}`)
        board.dropToken(column, getActivePlayer().token)

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

        board.forEach(row => {
            row.forEach((cell, index) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");

                cellButton.dataset.column = index
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            })
        });
    }

    function clickHandlerBoard(e) {
        const selectedColumn = e.target.dataset.column;
    
        if (!selectedColumn) return;
    
        game.playRound(selectedColumn);
        updateScreen();
    }
    
    boardDiv.addEventListener("click", clickHandlerBoard)
    
    updateScreen()
}

ScreenController();