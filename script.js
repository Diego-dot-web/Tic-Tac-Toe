(function GameBoard (){
    const board = [];
    const row = 3;
    const columns = 3;

    for (let i = 0; i < row; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(0);
        };
    };

    console.log(board)
})();

function Player(name, symbol) {
    const PlayerName = name;
    const PlayerSymbol = symbol;

    return{
        PlayerName, PlayerSymbol
    }
}

const player1 = Player("Player One", "X");
const player2 = Player("Player Two", "O");

function GameFlow (){
    
}