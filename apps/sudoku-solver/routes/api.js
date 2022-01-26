/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      if(!req.body.puzzle || !req.body.coordinate || !req.body.value) {
        return res.json({ error: 'Required field(s) missing' });
      }

      let [err, errorString] = solver.validate(req.body.puzzle);
      if(err) {
        return res.json( { error: errorString });
      }

      let value = parseInt(req.body.value);
      if(!Number.isInteger(value) || value < 0 || value > 9) {
        return res.json({ error: 'Invalid value' });
      }

      let [coord_err, row, col] = solver.getCoordinate(req.body.coordinate);
      if(coord_err) {
        return res.json({error: 'Invalid coordinate'})
      }

      const puzzle = solver.clearTargetCellInPuzzle(req.body.puzzle, row, col);

      let rowCheck = solver.checkRowPlacement(puzzle, row, value);
      let colCheck = solver.checkColPlacement(puzzle, col, value);
      let regionCheck = solver.checkRegionPlacement(puzzle,
        row - row % 3,
        col - col % 3,
        value);

      if(rowCheck && colCheck && regionCheck) {
        return res.json( { valid: true });
      } else {
        let result = [];
        
        if(!rowCheck) result.push('row');
        if(!colCheck) result.push('column');
        if(!regionCheck) result.push('region');

        return res.json( {
          valid: false,
          conflict: result
        });
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      if(!req.body.puzzle) {
        return res.json({ error: 'Required field missing' });
      }

      let [err, errorString] = solver.validate(req.body.puzzle);
      if(err) {
        return res.json( { error: errorString });
      }

      if(solver.solve(req.body.puzzle)) {
        return res.json( { solution: solver.exportString() });
      } else {
        return res.json( { error: 'Puzzle cannot be solved' });
      }
    });
};
