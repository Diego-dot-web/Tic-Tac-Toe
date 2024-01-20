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
};

function MakePlayer(name, token){
    this.name = name;
    this.token = token;
}

(function createPlayers(){
    const form = document.querySelector("form");
    const playerOneName = document.querySelector("#PlayerOneName");
    const playerTwoName = document.querySelector("#PlayerTwoName");
    
    form.addEventListener("submit", (e) => {
        e.preventDefault()

        startGame()
        ScreenController(playerOneName.value, playerTwoName.value)
    })
})()

function startGame(){
    const board = document.querySelector(".board");

    board.style.display = "grid"
}

function GameFlow (playerOneName = "One", playerTwoName = "Two"){
    const board = Gameboard();
    const players = [new MakePlayer(playerOneName, "X"), new MakePlayer(playerTwoName, "O")
    ];

    const getPlayers = () => players

    let activePlayer = players[0]

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;
    
    const printNewRound = () => {
        board.printBoard();
        console.log(`${activePlayer.name}'s turn.`);
    };

    const playRound = (column, row) => {
        console.log(`${activePlayer.name} has changed token in ${row} and ${column}`)
        board.dropToken(column ,row, activePlayer.token)

        switchPlayerTurn();
        printNewRound();
    }

    printNewRound()

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard,
        getPlayers
    }

}

function ScreenController(playerOneName, playerTwoName){
    const game = GameFlow(playerOneName, playerTwoName);
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

    boardDiv.addEventListener("click", clickHandlerBoard)

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

    function stop(str){
        boardDiv.removeEventListener("click", clickHandlerBoard)
        const winnerDiv = document.createElement("h3");
        winnerDiv.classList = "winner"
        const container = document.querySelector(".container");
        const winnerPlayer = game.getPlayers();

        if (str === "Player1"){
            winnerDiv.textContent = `${winnerPlayer[0].name} has Won`
        } else if (str === "Player2"){
            winnerDiv.textContent = `${winnerPlayer[1].name} has Won`
        } else if (str === "Tie") {
            winnerDiv.textContent = "It's a Tie"
        }
        container.appendChild(winnerDiv)
    }

    function restartGame(){
        const restarBtn = document.querySelector(".restart");
        const form = document.querySelector("form");
        
        restarBtn.addEventListener("click", ()=>{
            const winner = document.querySelector(".winner");
            form.reset()
            boardDiv.style.display = "none"
            playerTurnDiv.textContent = "" 
            winner.remove() 
            console.log("works");
        })
    }
    restartGame()
    updateScreen();
    
}

