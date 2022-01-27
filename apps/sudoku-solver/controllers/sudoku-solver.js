const WIDTH = 9;
const HEIGHT = 9;

class SudokuSolver {
  constructor() {
    this._puzzle = [];
  }

  static validInput(input) {
    return typeof (input) === 'string' && input.length === 1 && !!input.match(/[1-9]/);
  }

  validate(puzzleString) {
    if(puzzleString.length !== 81) {
      return [true, "Expected puzzle to be 81 characters long"];
    }

    if(puzzleString.match(/[^1-9.]/gi)) {
      return [true, "Invalid characters in puzzle"];
    }

    // No invalid data returns false and empty error string
    return [false, ""];
  }

  checkRowPlacement(puzzleString, row, value) {
    this.importString(puzzleString);
    return !this.usedInRow(this._puzzle, row, value);
  }

  checkColPlacement(puzzleString, column, value) {
    this.importString(puzzleString);
    return !this.usedInCol(this._puzzle, column, value);
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    this.importString(puzzleString);
    return !this.usedInBox(this._puzzle, row - row % 3, column - column % 3, value)
  }

  getCoordinate(coord) {
    let row;
    let col;
    coord = coord.toUpperCase();

    // Check that it's a string and exactly 2 character long
    if(typeof coord != 'string' || coord.length !== 2) {
      return [true, null, null];
    }

    // Row is 'A' minus the row letter's ascii value
    // only if it's A-I
    if(coord[0].match(/[A-I]/)) {
      row = coord.charCodeAt(0) - 'A'.charCodeAt(0);
    } else {
      return [true, null, null]
    }

    // Parse number into integer, validate it's 1-9
    if( parseInt(coord[1]) > 0 && parseInt(coord[1]) < 10) {
      col = parseInt(coord[1]) - 1;
    } else {
      return [true, null, null]
    }

    return [false, row, col];
  }

  clearTargetCellInPuzzle(puzzleString, row, col) {
    this.importString(puzzleString);
    this._puzzle[row][col] = 0;
    return this.exportString();
  }

  importString(input) {
    this._puzzle = [];
    for (let row = 0; row < WIDTH; row++) {
      this._puzzle.push([]);
      for (let col = 0; col < HEIGHT; col++) {
        let val = input.charAt(row * WIDTH + col);
        if (SudokuSolver.validInput(val)) {
          this._puzzle[row][col] = parseInt(val);
        } else {
          this._puzzle[row][col] = 0;
        }
      }
    }
  }

  exportString(input) {
    let output = "";
    for (let row = 0; row < WIDTH; row++) {
      for (let col = 0; col < HEIGHT; col++) {
        output += this._puzzle[row][col] ? this._puzzle[row][col].toString() : ".";
      }
    }
    return output;
  }

  solve(puzzleString) {
    this.importString(puzzleString);
    // Check if the puzzle contains any empty squares
    if(puzzleString.match(/\./gi)) {
      // If so, use the solver.
      return this.solveSudoku(this._puzzle)
    } else {
      // If no, validate the solution
      return this.solutionCheck();
    }
  }

  // Solving Code
  // Source: https://medium.com/@george.seif94/solving-sudoku-using-a-simple-search-algorithm-3ac44857fee8
  // Translated by from C++ by me

  // Returns a boolean which indicates whether any assigned entry
  // in the specified row matches the given number.
  usedInRow(grid, row, num) {
    for (let col = 0; col < WIDTH; col++) {
      if (grid[row][col] === num) {
        return true;
      }
    }
    return false;
  }

  // Returns a boolean which indicates whether any assigned entry
  // in the specified column matches the given number.
  usedInCol(grid, col, num) {
    for (let row = 0; row < HEIGHT; row++) {
      if (grid[row][col] === num) {
        return true;
      }
    }
    return false;
  }

  // Returns a boolean which indicates whether any assigned entry
  // within the specified 3x3 box matches the given number.
  usedInBox(grid, boxStartRow, boxStartCol, num) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (grid[row + boxStartRow][col + boxStartCol] === num) {
          return true;
        }
      }
    }
    return false;
  }

  // Returns a boolean which indicates whether it will be legal to assign
  // num to the given row,col location.
  isSafe(grid, row, col, num) {
    // Check if 'num' is not already placed in current row,
    // current column and current 3x3 box
    return !this.usedInRow(grid, row, num) &&
      !this.usedInCol(grid, col, num) &&
      !this.usedInBox(grid, row - row % 3, col - col % 3, num);
  }


  // Searches the grid to find an entry that is still unassigned. If
  // found, the reference parameters row, col will be set the location
  // that is unassigned, and true is returned. If no unassigned entries
  // remain, false is returned.
  getUnassignedLocation(grid) {
    for (let row = 0; row < HEIGHT; row++) {
      for (let col = 0; col < WIDTH; col++) {
        if (grid[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return [10, 10];
  }

  // Check an existing complete solution to see if it's correct/complete
  solutionCheck() {
    for (let row = 0; row < HEIGHT; row++) {
      for (let col = 0; col < WIDTH; col++) {
        let num = this._puzzle[row][col];
        this._puzzle[row][col] = 0;
        if(num === 0 || !this.isSafe(this._puzzle,row, col, num)) {
          this._puzzle[row][col] = num;
          return false;
        }
        this._puzzle[row][col] = num;
      }
    }
    return true;
  }

  // Takes a partially filled-in grid and attempts to assign values to
  // all unassigned locations in such a way to meet the requirements
  // for Sudoku solution (non-duplication across rows, columns, and boxes)
  solveSudoku(grid) {
    // If the sudoku grid has been filled, we are done
    let [row, col] = this.getUnassignedLocation(grid)
    if (row === 10 || col === 10) {
      return true;
    }

    // Consider digits 1 to 9
    for (let num = 1; num <= 9; num++) {
      // If placing the current number in the current
      // unassigned location is valid, go ahead
      if (this.isSafe(grid, row, col, num)) {
        // Make tentative assignment
        grid[row][col] = num;

        // Do the same thing again recursively. If we go
        // through all of the recursions, and in the end
        // return true, then all of our number placements
        // on the sudoku grid are valid and we have fully
        // solved it
        if (this.solveSudoku(grid)) {
          return true;
        }

        // As we were not able to validly go through all
        // of the recursions, we must have an invalid number
        // placement somewhere. Lets go back and try a
        // different number for this particular unassigned location
        grid[row][col] = 0;
      }
    }

    // If we have gone through all possible numbers for the current unassigned
    // location, then we probably assigned a bad number early. Lets backtrack
    // and try a different number for the previous unassigned locations.
    return false;
  }

  tryToSolve() {

  }
}

module.exports = SudokuSolver;

