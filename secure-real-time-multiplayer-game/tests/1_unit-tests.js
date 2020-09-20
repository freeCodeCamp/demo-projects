/*
*       
*       To run the tests on Repl.it, set `NODE_ENV` to `test` 
*       without quotes in the `.env` file. 
*       To run the tests in the console, open the terminal 
*       with [Ctrl + `] (backtick) and run the command `npm run test`.
*
*/

import Player from '../public/Player.mjs';
import Collectible from '../public/Collectible.mjs';
const chai = require('chai');
const assert = chai.assert;
const { JSDOM } = require('jsdom');

suite('Unit Tests', () => {
  suiteSetup(() => {
    // Mock the DOM for testing and load Solver
    return JSDOM.fromFile('./views/index.html')
      .then((dom) => {

        global.window = dom.window;
        global.document = dom.window.document;
      });
  });

  suite('Collectible class', () => {
    test('Collectible class generates a collectible item object.', done => {
      const testItem = new Collectible({ x: 100, y: 100, id: Date.now() });

      assert.isObject(testItem);
      done();
    });

    test('Collectible item object contains x and y coordinates and a unique id.', done => {
      const testItem = new Collectible({ x: 100, y: 100, id: Date.now() });

      assert.typeOf(testItem.x, 'Number');
      assert.typeOf(testItem.y, 'Number');
      assert.exists(testItem.id);
      done();
    });
  });

  suite('Player class', () => {
    test('Player class generates a player object.', done => {
      const testPlayer = new Player({ x: 100, y: 100, score: 0, id: Date.now() });

      assert.isObject(testPlayer);
      done();
    });

    test('Player object contains a score, x and y coordinates, and a unique id.', done => {
      const testPlayer = new Player({ x: 100, y: 100, score: 0, id: Date.now() });

      assert.typeOf(testPlayer.x, 'Number');
      assert.typeOf(testPlayer.y, 'Number');
      assert.typeOf(testPlayer.score, 'Number');
      assert.exists(testPlayer.id);
      done();
    });

    test("movePlayer(str, num) adjusts a player's position.", done => {
      // Note: Only testing movement along the x axis in case
      // the game is a 2D platformer
      const testPlayer = new Player({ x: 100, y: 100, score: 0, id: Date.now() });
      testPlayer.movePlayer('right', 5);
      const testPos1 = { x: testPlayer.x, y: testPlayer.y }
      const expectedPos1 = { x: 105, y: 100 }

      testPlayer.movePlayer('left', 10);
      const testPos2 = { x: testPlayer.x, y: testPlayer.y }
      const expectedPos2 = { x: 95, y: 100 }

      assert.deepEqual(testPos1, expectedPos1);
      assert.deepEqual(testPos2, expectedPos2);      
      done();
    });

    test("collision(obj) returns true when a player's avatar collides with a collectible item object.", done => {
      const testPlayer = new Player({ x: 100, y: 100, id: Date.now() });
      const testItem = new Collectible({ x: 100, y: 100, value: 1, id: Date.now() });

      assert.isTrue(testPlayer.collision(testItem));
      done();
    });

    test("calculateRank(arr) returns the player's rank string.", done => {
      const testPlayer1 = new Player({ x: 100, y: 100, id: 1 });
      const testPlayer2 = new Player({ x: 150, y: 150, id: 2 });
      testPlayer1.score = 5;
      testPlayer2.score = 3;
      const testArr = [ testPlayer1, testPlayer2 ];

      // Account for possible space
      assert.match(testPlayer1.calculateRank(testArr), /Rank\: 1\s?\/\s?2/);
      assert.match(testPlayer2.calculateRank(testArr), /Rank\: 2\s?\/\s?2/);
      done();
    });
  });

});
