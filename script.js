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

    return{getBoard, dropToken, printBoard, }
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
        getBoard: board.getBoard,
        evaluatesTheResult: board.evaluatesTheResult,
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
        evaluatesTheResult();
    }

    function evaluatesTheResult(){
        const board = game.getBoard()

        if (board[0][0].getValue() === "X" && board[0][1].getValue() === "X" && board[0][2].getValue() === "X"|| 
            board[1][0].getValue() === "X" && board[1][1].getValue() === "X" && board[1][2].getValue() === "X"||
            board[2][0].getValue() === "X" && board[2][1].getValue() === "X" && board[2][2].getValue() === "X"||
            board[0][0].getValue() === "X" && board[1][0].getValue() === "X" && board[2][0].getValue() === "X"||
            board[0][1].getValue() === "X" && board[1][1].getValue() === "X" && board[2][1].getValue() === "X"||
            board[0][2].getValue() === "X" && board[1][2].getValue() === "X" && board[2][2].getValue() === "X"||
            board[0][0].getValue() === "X" && board[1][1].getValue() === "X" && board[2][2].getValue() === "X"||
            board[0][2].getValue() === "X" && board[1][1].getValue() === "X" && board[2][0].getValue() === "X") {
                console.log("player 1")
                stop("Player1")
        } else if (board[0][0].getValue() === "O" && board[0][1].getValue() === "O" && board[0][2].getValue() === "O"||
                    board[1][0].getValue()=== "O" && board[1][1].getValue() === "O" && board[1][2].getValue() === "O"|| 
                    board[2][0].getValue()=== "O" && board[2][1].getValue() === "O" && board[2][2].getValue() === "O"||
                    board[0][0].getValue()=== "O" && board[1][0].getValue() === "O" && board[2][0].getValue() === "O"||
                    board[0][1].getValue()=== "O" && board[1][1].getValue() === "O" && board[2][1].getValue() === "O"||
                    board[0][2].getValue()=== "O" && board[1][2].getValue() === "O" && board[2][2].getValue() === "O"||
                    board[0][0].getValue()=== "O" && board[1][1].getValue() === "O" && board[2][2].getValue() === "O"||
                    board[0][2].getValue()=== "O" && board[1][1].getValue() === "O" && board[2][0].getValue() === "O"){
            console.log("player 2")
            stop("Player2")
        } else if (board[0][0].getValue() !== undefined && board[0][1].getValue() !== undefined && board[0][2].getValue() !== undefined &&
                    board[1][0].getValue() !== undefined && board[1][1].getValue() !== undefined && board[1][2].getValue() !== undefined &&
                    board[2][0].getValue() !== undefined && board[2][1].getValue() !== undefined && board[2][2].getValue() !== undefined){
            console.log("tie")
            stop("Tie")
        }

        

    }

    boardDiv.addEventListener("click", clickHandlerBoard); 

    function stop(str){
        boardDiv.removeEventListener("click", clickHandlerBoard)
        const winnerDiv = document.createElement("div");
        const container = document.querySelector(".container")

        if (str === "Player1"){
            winnerDiv.textContent = "Player One has Won"
        } else if (str === "Player2"){
            winnerDiv.textContent = "Player Two has Won"
        } else if (str === "Tie") {
            winnerDiv.textContent = "It's a Tie"
        }
        container.appendChild(winnerDiv)
    }
    

    updateScreen();
    
}

ScreenController();