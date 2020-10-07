**freeCodeCamp** - Quality Assurance 4: Sudoku Solver
------

[![Run on Repl.it](https://repl.it/badge/github/freeCodeCamp/boilerplate-project-sudoku-solver)](https://repl.it/github/freeCodeCamp/boilerplate-project-sudoku-solver)

### User stories:

1. I can `POST` `/api/solve` with form data containing `puzzle` which will be a string containing a combination of numbers (1-9) and periods `.` to represent empty spaces. The returned object will contain `solution` with the solved puzzle.
1. If the object submitted to `/api/solve` is missing `puzzle`, the returned value will be `{ error: 'Required field missing' }`
1. If the puzzle submitted to `/api/solve` contains values which are not numbers or periods, the returned value will be `{ error: 'Invalid characters in puzzle' }`
1. If the puzzle submitted to `/api/solve` is greater or less than 81 characters, the returned value will be `{ error: 'Expected puzzle to be 81 characters long' }`
1. If the puzzle submitted to `/api/solve` is invalid or cannot be solved, the returned value will be `{ error: 'Puzzle cannot be solved' }`
1. I can `POST` to `/api/check` an object containing `puzzle`, `coordinate`, and `value` where the `coordinate` is the letter A-I indicating the row, followed by a number 1-9 indicating the column, and `value` is a number from 1-9.
1. The return value will be an object containing `valid`, which is `true` if the number may be placed at the provided coordinate and `false` if the number may not. If false, the returned object will also contain `conflict` which is an array containing the strings `"row"`, `"column"`, and/or `"region"` depending on which makes the placement invalid. 
1. If the submitted puzzle contains values which are not numbers or periods, the returned value will be `{ error: 'Invalid characters in puzzle' }`
1. If the puzzle submitted to `/api/check` is greater or less than 81 characters, the returned value will be `{ error: 'Expected puzzle to be 81 characters long' }`
1. If the object submitted to `/api/check` is missing `puzzle`, `coordinate` or `value`, the returned value will be `{ error: 'Required field(s) missing' }`
1. If the coordinate does not point to an existing grid cell, the returned value will be `{ error: 'Invalid coordinate'}`
1. If the `value` is not a number between 1 and 9, the returned values will be `{ error: 'Invalid value' }`
1. All 12 unit tests are complete and passing. See `/tests/1_unit-tests.js` for the expected behavior you should write tests for.
1. All 14 functional tests are complete and passing. See `/tests/2_functional-tests.js` for the functionality you should write tests for.