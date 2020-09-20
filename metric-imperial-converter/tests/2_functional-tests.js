/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('Routing Tests', function() {
    
    suite('GET /api/convert => conversion object', function() {
      
      test('Convert 10L (valid input)', function(done) {
       chai.request(server)
        .get('/api/convert')
        .query({input: '10L'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit.toLowerCase(), 'l'); // Ignore case
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          done();
        });
      });
      
      test('Convert 32g (invalid input unit)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: '32g'})
        .end(function(err, res){
          assert.equal(res.status, 400);
          assert.equal(res.body.error, "invalid unit")
          done();
        });
      });
      
      // // Still discussing how to handle double fractions
      // test('Convert 3/7.2/4kg (invalid number)', function(done) {
      //   chai.request(server)
      //   .get('/api/convert')
      //   .query({input: '3/7.2/4kg'})
      //   .end(function(err, res){
      //     done();
      //   });
      // });  
      
      test('Convert 1a4kkg (invalid number and unit)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: '1a4kkg'})
        .end(function(err, res){
          assert.equal(res.status, 400);
          assert.equal(res.body.error, "invalid number and unit")
          done();
        });
      });
      
      test('Convert kg (no number)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: 'kg'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit.toLowerCase(), 'kg'); // Ignore case
          assert.approximately(res.body.returnNum, 2.20462, 0.1);
          assert.equal(res.body.returnUnit, 'lbs');
          done();
        });
      });
      
    });

  });

});
