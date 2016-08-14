class Board {
  constructor() {
    this.grid = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
  }

  isWon() {
    let possibleRows = this.possibleRows();

    let winner = false;

    possibleRows.forEach((row) => {
      if (row.every((mark) => mark === 'X' )) {
        winner =  true;
      } else if (row.every((mark) => mark === 'O' )) {
        winner = true;
      }
    });

    return winner;
  }

  possibleRows() {
    let columns = this.columns();
    let diagonals = this.diagonals();
    let possibleRows = this.grid.concat(columns, diagonals);

    return possibleRows;
  }

  columns() {
    let cols = [];

    for (var i = 0; i < this.grid[0].length; i++) {
      let row = [];
      for (var j = 0; j < this.grid.length; j++) {
        row.push(this.grid[j][i]);
      }
      cols.push(row);
    }

    return cols;
  }

  diagonals() {
    let diagonalOne = [this.grid[0][0],this.grid[1][1],this.grid[2][2]];
    let diagonalTwo = [this.grid[0][2],this.grid[1][1],this.grid[2][0]];

    return [diagonalOne, diagonalTwo];
  }

  empty(pos) {
    return this.grid[pos[0]][pos[1]] === ' ';
  }

  placeMark(pos, mark) {
    if (this.empty(pos)) {
      this.grid[pos[0]][pos[1]] = mark;
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Board;
