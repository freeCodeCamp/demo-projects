/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  suite('POST to /api/solve', () => {
    test('Solvable puzzle posted returns completed puzzle', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const output = '769235418851496372432178956174569283395842761628713549283657194516924837947381625'

      chai.request(server)
        .post('/api/solve')
        .send({ puzzle: input })
        .end((err, res) =>{
          assert.isObject(res.body);
          assert.property(res.body, 'solution');
          assert.equal(res.body.solution, output);

          done();
        })
    });

    test('Puzzle Field Missing', done => {
      const error = { error: 'Required field missing' };

      chai.request(server)
        .post('/api/solve')
        .end((err, res) =>{
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.deepEqual(res.body, error);

          done();
        })
    });

    test('Invalid Characters in Puzzle', done => {
      const input = "..X..5.1.85.4....2432.. ...1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      const error = { error: 'Invalid characters in puzzle' };
      chai.request(server)
        .post('/api/solve')
        .send({ puzzle: input })
        .end((err, res) =>{
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.deepEqual(res.body, error);

          done();
        });
    });

    test('Puzzle incorrect length', done => {
      const shortStr = '83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const longStr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...';
      const error = { error: 'Expected puzzle to be 81 characters long' };

      chai.request(server)
        .post('/api/solve')
        .send({ puzzle: shortStr })
        .end((err, res) =>{
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.deepEqual(res.body, error);

          chai.request(server)
            .post('/api/solve')
            .send({ puzzle: longStr })
            .end((err, res) => {
              assert.isObject(res.body);
              assert.property(res.body, 'error');
              assert.deepEqual(res.body, error);
              done();
            });
        });
    });

    test('Puzzle Cannot be Solved', done => {
      const input = '779235418851496372432178956174569283395842761628713549283657194516924837947381625';
      const error = {error: 'Puzzle cannot be solved'};

      chai.request(server)
        .post('/api/solve')
        .send({puzzle: input})
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.deepEqual(res.body, error);
          done();
        });
    });
  });
  
  suite('POST to /api/check', () => {
    
    test('All fields filled in correctly, valid placement', done => {
      const input = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      const coordinate = "A1";
      const value = "7";
      const status = { valid: true };

      chai.request(server)
        .post('/api/check')
        .send({ puzzle: input, coordinate, value })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'valid');
          assert.deepEqual(res.body, status);
          done();
        });
    })

    test('All fields filled in correctly, invalid placement, single conflict', done => {
      const input = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      const coordinate = "A2";
      const value = "1";
      const status = {valid: false, conflict: [ 'row' ]};

      chai.request(server)
        .post('/api/check')
        .send({ puzzle: input, coordinate, value })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'valid');
          assert.property(res.body, 'conflict');
          assert.deepEqual(res.body, status);
          done();
        });
    })

    test('All fields filled in correctly, invalid placement, multiple conflicts', done => {
      const input = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      const coordinate = "A1";
      const value = "1";
      const status = {valid: false, conflict: [ 'row', 'column' ]};

      chai.request(server)
        .post('/api/check')
        .send({ puzzle: input, coordinate, value })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'valid');
          assert.property(res.body, 'conflict');
          assert.deepEqual(res.body, status);
          done();
        });
    })

    test('All fields filled in correctly, invalid placement, all conflicts', done => {
      const input = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      const coordinate = "A1";
      const value = "5";
      const status = {valid: false, conflict: [ 'row', 'column', 'region' ]};

      chai.request(server)
        .post('/api/check')
        .send({ puzzle: input, coordinate, value })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'valid');
          assert.property(res.body, 'conflict');
          assert.deepEqual(res.body, status);
          done();
        });
    })

    test('Required Field(s) Missing', done => {
      const input = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      const error = { error: 'Required field(s) missing' };

      chai.request(server)
        .post('/api/check')
        .send({ puzzle: input })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.deepEqual(res.body, error);
          done();
        });
    });

    test('Invalid Characters in Puzzle', done => {
      const input = "..9.X5.1.85.4....2432... ..1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      const error = { error: 'Invalid characters in puzzle' };

      chai.request(server)
        .post('/api/check')
        .send({ puzzle: input, coordinate: 'A1', value: '2' })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.deepEqual(res.body, error);
          done();
        });
    });

    test('Puzzle incorrect length', done => {
      const shortStr = '83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const longStr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...';
      const error = { error: 'Expected puzzle to be 81 characters long' };

      chai.request(server)
        .post('/api/check')
        .send({ puzzle: shortStr, coordinate: 'A1', value: '2' })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.deepEqual(res.body, error);

          chai.request(server)
            .post('/api/check')
            .send({ puzzle: longStr, coordinate: 'A1', value: '2' })
            .end((err, res) => {
              assert.isObject(res.body);
              assert.property(res.body, 'error');
              assert.deepEqual(res.body, error);
              done();
            });
        });
    });

    test('Coordinate Out of Bounds', done => {
      const input = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      const coordinate1 = "K1";
      const coordinate2 = "A11";
      const error = { error: 'Invalid coordinate'};

      chai.request(server)
        .post('/api/check')
        .send({ puzzle: input, coordinate: coordinate1, value: '2' })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.deepEqual(res.body, error);

          chai.request(server)
            .post('/api/check')
            .send({ puzzle: input, coordinate: coordinate2, value: '2' })
            .end((err, res) => {
              assert.isObject(res.body);
              assert.property(res.body, 'error');
              assert.deepEqual(res.body, error);
              done();
            });
        });
    })

    test('Invalid Value', done => {
      const input = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      const error = { error: 'Invalid value' };

      chai.request(server)
        .post('/api/check')
        .send({ puzzle: input, coordinate: "A1", value: 'X' })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, 'error');
          assert.deepEqual(res.body, error);
          done();
        });
    });

  });
});

