const HumanPlayer = require('./humanPlayer');
const Board = require('./board');
const reader = require('./reader');

class Game {
  constructor(player1, player2) {
    this.board = new Board ();
    player1.mark = 'X';
    player2.mark = 'O';
    this.players = [player1, player2];
  }

  play(completionCallback) {
    let currentPlayer = this.currentPlayer();

    currentPlayer.getMove(this.board, pos => {

      let mark = currentPlayer.mark;

      if (!this.board.placeMark(pos, mark)) {
        this.switchPlayers();
        console.log("Invalid move.");
      }

      if (this.board.isWon()) {
        completionCallback(currentPlayer);
      } else {
        this.switchPlayers();
        this.play(completionCallback);
      }
    });
  }

  currentPlayer() {
    return this.players[0];
  }

  switchPlayers() {
    let temp = this.players[0];
    this.players[0] = this.players[1];
    this.players[1] = temp;
  }
}


let p1 = new HumanPlayer('player1');
let p2 = new HumanPlayer('player2');
let game = new Game(p1, p2);
game.play((player) => {
  console.log(`${player.name} wins!`);
  reader.close();
});
