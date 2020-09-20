/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       If additional tests are added, keep them at the very end
*
*
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);

  suite('Routing tests', function() {
    
    let testId;
    
    suite('POST /api/books with title => Add a book to the collection and expect an object or message', function() {
      
      test('Add a book with a unique title', function(done) {
         chai.request(server)
          .post('/api/books')
          .send({ title: 'My test book' })
          .end((err, res) => {
            const bookObj = res.body;
            testId = bookObj._id; // store _id for later tests and deletion

            assert.property(bookObj, 'title', 'Book should contain a title');
            assert.property(bookObj, '_id', 'Book should contain an _id');
            assert.strictEqual(bookObj.title, 'My test book');
            done();
          });        
      });
      
      test('No title in request body', function(done) {
        chai.request(server)
        .post('/api/books')
        .end((err, res) => {
          assert.strictEqual(res.text, 'missing title');
          done();
        });          
      });

      test('Existing title in request body', function(done) {
        chai.request(server)
        .post('/api/books')
        .send({ title: 'My test book' })
        .end((err, res) => {
          assert.strictEqual(res.text, 'title already exists');
          done();
        });          
      });
      
    });
    
    suite('GET /api/books => Array of all book objects', function() {
      
      test('Return an array of all book objects',  function(done) {
         chai.request(server)
          .get('/api/books')
          .end((err, res) => {
            const booksArr = res.body;
            const firstBook = booksArr[0];
            
            assert.isArray(booksArr, 'Response should be an array');
            assert.property(firstBook, 'commentcount', 'Books in array should contain commentcount');
            assert.isNumber(firstBook.commentcount, 'commentcount should be a number');
            assert.property(firstBook, 'title', 'Books in array should contain a title');
            assert.property(firstBook, '_id', 'Books in array should contain an _id');
            done();
          });
      });      
      
    });

    suite('POST /api/books/[id] => Add a comment to an existing book and expect an object or message', function() {
      
      test('Add a comment to an existing book', function(done) {
         chai.request(server)
          .post(`/api/books/${testId}`)
          .send({ comment: 'test comment' })
          .end((err, res) => {
            const bookObj = res.body;

            assert.property(bookObj, 'comments', 'Book should contain comments');
            assert.isArray(bookObj.comments, 'Comments should be an array');
            assert.strictEqual(bookObj.comments[0], 'test comment', 'Comments should include test comment submitted');
            assert.property(bookObj, 'title', 'Book should contain title');
            assert.property(bookObj, '_id', 'Book should contain _id');
            done();
          });           
      });

      test('No comment in request body', function(done) {
        chai.request(server)
         .post(`/api/books/${testId}`)
         .end((err, res) => {
           assert.strictEqual(res.text, 'missing comment');
           done();
         });           
     });
      
    });

    suite('GET /api/books/[id] => Expect an object for [id] or a message for an unknown id', function() {

      test('Return a book object for an existing id',  function(done) {
         chai.request(server)
          .get(`/api/books/${testId}`)
          .end((err, res) => {
            const bookObj = res.body;

            assert.property(bookObj, 'comments', 'Book should contain comments');
            assert.isArray(bookObj.comments, 'Comments should be an array');
            assert.property(bookObj, 'title', 'Book should contain a title');
            assert.property(bookObj, '_id', 'Book should contain an _id');
            assert.equal(bookObj._id, testId);
            done();
          });
      });

      test('Search for an unknown id',  function(done) {
        chai.request(server)
         .get('/api/books/123412341234')
         .end((err, res) => {
           assert.equal(res.text, 'no book exists');
           done();
         });
      });

    });

    suite('DELETE /api/books/[id] => Success message', function() {

      test('Remove a book from the collection',  function(done) {
        chai.request(server)
          .delete(`/api/books/${testId}`)
          .end((err, res) => {
            assert.strictEqual(res.text, 'delete successful');
            done();
          });
      });

    });

  });

});
