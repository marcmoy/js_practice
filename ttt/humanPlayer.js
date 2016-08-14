const reader = require('./reader');

class HumanPlayer {
  constructor(name) {
    this.name = name;
    this.mark = null;
  }

  getMove(board, callback){

    this.board = board;
    this.displayBoard();

    reader.question("Enter move in 'x,y' format:", (input) => {
      let pos = [parseInt(input[0]),parseInt(input[2])];
      callback(pos);
    });
    
  }

  displayBoard() {
    console.log(JSON.stringify(this.board.grid[0]));
    console.log(JSON.stringify(this.board.grid[1]));
    console.log(JSON.stringify(this.board.grid[2]));
  }
}

module.exports = HumanPlayer;
