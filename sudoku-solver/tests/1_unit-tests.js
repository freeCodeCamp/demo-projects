/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

const { JSDOM } = require('jsdom');
let Solver;

suite('UnitTests', () => {
  suiteSetup(() => {
    // Mock the DOM for testing and load Solver
    return JSDOM.fromFile('./views/index.html')
      .then((dom) => {
        global.window = dom.window;
        global.document = dom.window.document;

        Solver = require('../public/sudoku-solver.js');
      });
  });

  // Only the digits 1-9 are accepted
  // as valid input for the puzzle grid
  suite('Function validSudokuInput(input)', () => {
    test('Valid "1-9" characters', (done) => {
      const input = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
      input.forEach((el, i) => {
        assert.strictEqual(Solver.validSudokuInput(el), input[i]);
      });
      done();
    });

    // Invalid characters or numbers are not accepted 
    // as valid input for the puzzle grid
    test('Invalid characters (anything other than "1-9") are not accepted', (done) => {
      const input = ['!', 'a', '/', '+', '-', '0', '10', 0, '.'];
      input.forEach((el, i) => {
        assert.strictEqual(Solver.validSudokuInput(el), false);
      });
      done();
    });
  });
  
  suite('Function parsePuzzle(input)', () => {
    test('Parses a valid puzzle string into an object', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const output = {
        A1: ".",A2: ".",A3: "9",A4: ".",A5: ".",A6: "5",A7: ".",A8: "1",A9: ".",
        B1: "8",B2: "5",B3: ".",B4: "4",B5: ".",B6: ".",B7: ".",B8: ".",B9: "2",
        C1: "4",C2: "3",C3: "2",C4: ".",C5: ".",C6: ".",C7: ".",C8: ".",C9: ".",
        D1: "1",D2: ".",D3: ".",D4: ".",D5: "6",D6: "9",D7: ".",D8: "8",D9: "3",
        E1: ".",E2: "9",E3: ".",E4: ".",E5: ".",E6: ".",E7: ".",E8: "6",E9: ".",
        F1: "6",F2: "2",F3: ".",F4: "7",F5: "1",F6: ".",F7: ".",F8: ".",F9: "9",
        G1: ".",G2: ".",G3: ".",G4: ".",G5: ".",G6: ".",G7: "1",G8: "9",G9: "4",
        H1: "5",H2: ".",H3: ".",H4: ".",H5: ".",H6: "4",H7: ".",H8: "3",H9: "7",
        I1: ".",I2: "4",I3: ".",I4: "3",I5: ".",I6: ".",I7: "6",I8: ".",I9: "."
      };
      
      assert.deepStrictEqual(Solver.parsePuzzle(input), output);
      done();
    });
    
    // Puzzles that are not 81 numbers/periods long show the message 
    // "Error: Expected puzzle to be 81 characters long." in the
    // `div` with the id "error-msg"
    test('Shows an error for puzzles that are not 81 numbers long', done => {
      const shortStr = '83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const longStr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...';
      const errorMsg = 'Error: Expected puzzle to be 81 characters long.';
      const errorDiv = document.getElementById('error-msg');
      
      Solver.parsePuzzle(shortStr);
      assert.strictEqual(errorDiv.innerText, errorMsg);

      Solver.parsePuzzle(longStr);
      assert.strictEqual(errorDiv.innerText, errorMsg);
      done();
    });
  });

  suite('Function validatePuzzle(input)', () => {
    // Valid complete puzzles pass
    test('Valid puzzles pass', done => {
      const input = Solver.parsePuzzle('769235418851496372432178956174569283395842761628713549283657194516924837947381625');

      assert.equal(Solver.validatePuzzle(input), true);
      done();
    });

    // Invalid complete puzzles fail
    test('Invalid puzzles fail', done => {
      const input = Solver.parsePuzzle('779235418851496372432178956174569283395842761628713549283657194516924837947381625');

      assert.equal(Solver.validatePuzzle(input), false);
      done();
    });
  });
  
  
  suite('Function solve(input)', () => {
    // Returns the expected solution for a valid, incomplete puzzle
    test('Returns the expected solution for an incomplete puzzle', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const solution = {
        A1: "7",A2: "6",A3: "9",A4: "2",A5: "3",A6: "5",A7: "4",A8: "1",A9: "8",
        B1: "8",B2: "5",B3: "1",B4: "4",B5: "9",B6: "6",B7: "3",B8: "7",B9: "2",
        C1: "4",C2: "3",C3: "2",C4: "1",C5: "7",C6: "8",C7: "9",C8: "5",C9: "6",
        D1: "1",D2: "7",D3: "4",D4: "5",D5: "6",D6: "9",D7: "2",D8: "8",D9: "3",
        E1: "3",E2: "9",E3: "5",E4: "8",E5: "4",E6: "2",E7: "7",E8: "6",E9: "1",
        F1: "6",F2: "2",F3: "8",F4: "7",F5: "1",F6: "3",F7: "5",F8: "4",F9: "9",
        G1: "2",G2: "8",G3: "3",G4: "6",G5: "5",G6: "7",G7: "1",G8: "9",G9: "4",
        H1: "5",H2: "1",H3: "6",H4: "9",H5: "2",H6: "4",H7: "8",H8: "3",H9: "7",
        I1: "9",I2: "4",I3: "7",I4: "3",I5: "8",I6: "1",I7: "6",I8: "2",I9: "5"
      };
      
      assert.deepStrictEqual(Solver.solve(input), solution);
      done();
    });
  });
});
