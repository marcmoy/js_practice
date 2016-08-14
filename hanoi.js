const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdin
});

class Game {
  constructor() {
    this.stacks = [[3,2,1],[],[]];
  }

  promptMove(callback) {
    this.printStacks();
    reader.question('From which stack?', (fromTower) => {
      reader.question('To which stack?', (toTower) => {
        callback(fromTower, toTower);
      });
    });
  }

  move(fromTower, toTower) {
    if (this.validMove(fromTower, toTower)){
      this.stacks[toTower].push(this.stacks[fromTower].pop());
      return true;
    } else {
      return false;
    }
  }

  validMove(fromTower, toTower) {
    // checks to see if tower is is valid
    let towers = [0,1,2];
    if (!towers.includes(fromTower) || !towers.includes(toTower)) {
      return false;
    }

    let fromStack = this.stacks[fromTower];
    let toStack = this.stacks[toTower];

    if (fromStack.length === 0) {
      return false;
    } else if (toStack.length === 0) {
      return true;
    } else {
      let fromDisc = fromStack[fromStack.length - 1];
      let toDisc = toStack[toStack.length - 1];
      return fromDisc < toDisc;
    }
  }

  printStacks() {
    console.log(JSON.stringify(this.stacks));
  }

  isWon() {
    return this.stacks[1].length === 3 || this.stacks[2] === 3;
  }

  run(completionCallback) {
    this.promptMove((fromTower, toTower) => {
      if (!this.move(fromTower, toTower)) {
        console.log("Invalid move.");
      }

      if (this.isWon()) {
        completionCallback(this.stacks);
      } else {
        this.run(completionCallback);
      }
    });
  }

}

let game = new Game();
game.run(() => {
  console.log("You win!");
  reader.close();
});
