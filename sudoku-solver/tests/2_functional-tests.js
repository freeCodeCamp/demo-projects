/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chai = require("chai");
const assert = chai.assert;

let Solver;

suite('Functional Tests', () => {
  suiteSetup(() => {
    // DOM already mocked -- load sudoku solver then run tests
    Solver = require('../public/sudoku-solver.js');
  });

  suite('Text area and sudoku grid update automatically', () => {
    // Entering a valid number in the text area populates 
    // the correct cell in the sudoku grid with that number
    test('Valid number in text area populates correct cell in grid', done => {
      const textArea = document.getElementById('text-input');
      textArea.value = '123';
      Solver.setGrid(textArea.value);
      const testArr = Array.from(document.querySelectorAll('.sudoku-input')).map(cell => cell.value).filter(str => str);
      const expected = ['1', '2', '3'];

      assert.deepStrictEqual(testArr, expected);
      done();
    });

    // Entering a valid number in the grid automatically updates
    // the puzzle string in the text area
    test('Valid number in grid updates the puzzle string in the text area', done => {
      const textArea = document.getElementById('text-input');
      const gridCells = Array.from(document.querySelectorAll('.sudoku-input')).map(cell => cell);
      gridCells[0].value = '5';
      gridCells[1].value = '4';
      gridCells[2].value = '3';
      const expected = '543..............................................................................';

      // Run function now that grid cells have changed
      Solver.setTextArea();

      assert.strictEqual(textArea.value, expected);
      done();
    });
  });
  
  suite('Clear and solve buttons', () => {
    // Pressing the "Clear" button clears the sudoku 
    // grid and the text area
    test('Function clearInput()', done => {
      // Populate text area and sudoku grid
      const puzzleStr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const textArea = document.getElementById('text-input');
      textArea.value = puzzleStr;
      Solver.setGrid(puzzleStr);
      
      // Invoke function and grab array of grid values to test
      Solver.clearInput();
      const gridValues = Array.from(document.querySelectorAll('.sudoku-input')).map(cell => cell).filter(cell => cell.value);
      
      assert.strictEqual(textArea.value, '');
      assert.deepStrictEqual(gridValues, []);
      done();
    });
    
    // Pressing the "Solve" button solves the puzzle and
    // fills in the grid with the solution
    test('Function showSolution(solve(input))', done => {
      const puzzleStr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

      Solver.showSolution(Solver.solve(puzzleStr));

      const rowA = Array.from(document.querySelectorAll('.sudoku-input')).filter((cell, i) => i < 9).map(cell => cell.value);
      const rowAExpected = ["7", "6", "9", "2", "3", "5", "4", "1", "8"];

      assert.deepStrictEqual(rowA, rowAExpected);
      done();
    });
  });
});
