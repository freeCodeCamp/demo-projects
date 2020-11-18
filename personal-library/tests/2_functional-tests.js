/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");
const assertionAnalyser = require("../assertion-analyser");

chai.use(chaiHttp);

let id1, id2;
const idFake = "5f665eb46e296f6b9b6a504d"

suite("Functional Tests", function () {
  /*
   * ----[EXAMPLE TEST]----
  test("#example Test GET /api/books", function (done) {
    chai
      .request(server)
      .get("/api/books")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body, "response should be an array");
        assert.property(
          res.body[0],
          "commentcount",
          "Books in array should contain commentcount"
        );
        assert.property(
          res.body[0],
          "title",
          "Books in array should contain title"
        );
        assert.property(
          res.body[0],
          "_id",
          "Books in array should contain _id"
        );
        done();
      });
  });
   * ----[END of EXAMPLE TEST]----
   */



  suite("Routing tests", function () {
    suite(
      "POST /api/books with title => create book object/expect book object",
      function () {
        test("Test POST /api/books with title", function (done) {
          chai
            .request(server)
            .post("/api/books")
            .send({ title: "POST with title" })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.property(res.body, "title");
              assert.equal(res.body.title, "POST with title");
              assert.property(res.body, "_id");
              id1 = res.body._id;
              done();
            });
        });

        test("Test POST /api/books with no title given", function (done) {
          chai
            .request(server)
            .post("/api/books")
            .end((err, res) => {
              console.log(res.text);
              assert.equal(res.status, 200);
              assert.isString(res.text);
              assert.equal(res.text, "missing required field title");
              done();
            });
        });
      }
    );

    suite("GET /api/books => array of books", function () {
      test("Test GET /api/books", function (done) {
        chai
          .request(server)
          .get("/api/books")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body, "response should be an array");
            assert.property(
              res.body[0],
              "commentcount",
              "Books in array should contain commentcount"
            );
            assert.property(
              res.body[0],
              "title",
              "Books in array should contain title"
            );
            assert.property(
              res.body[0],
              "_id",
              "Books in array should contain _id"
            );
            done();
          });
      });
    });

    suite("GET /api/books/[id] => book object with [id]", function () {
      test("Test GET /api/books/[id] with id not in db", function (done) {
        chai.request(server).get(`/api/books/${idFake}`).end((err, res) => {
          assert.equal(res.status, 200);
          assert.isString(res.text);
          assert.equal(res.text, "no book exists");
          done();
        })
      });

      test("Test GET /api/books/[id] with valid id in db", function (done) {
        chai.request(server).get(`/api/books/${id1}`).end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, "title");
          assert.equal(res.body.title, "POST with title");
          assert.property(res.body, "_id");
          assert.equal(res.body._id, id1);
          assert.property(res.body, "commentcount");
          assert.isNumber(res.body.commentcount);
          assert.property(res.body, "comments");
          assert.isArray(res.body.comments);
          done();
        })
      });
    });

    suite(
      "POST /api/books/[id] => add comment/expect book object with id",
      function () {
        test("Test POST /api/books/[id] with comment", function (done) {
          chai.request(server).post(`/api/books/${id1}`).send({comment: "POST with comment"}).end((err, res) => {
            assert.equal(res.status, 200);
            assert.property(res.body, 'title');
            assert.equal(res.body.title, "POST with title");
            assert.property(res.body, "_id");
            assert.equal(res.body._id, id1);
            assert.property(res.body, "comments");
            assert.isArray(res.body.comments);
            assert.isTrue(res.body.comments.includes("POST with comment"));
            assert.property(res.body, "commentcount");
            assert.equal(res.body.commentcount, res.body.comments.length);
            done();
          })
        });

        test("Test POST /api/books/[id] without comment field", function (done) {
          chai.request(server).post(`/api/books/${id1}`).end((err, res) =>{
            assert.equal(res.status, 200);
            assert.isString(res.text);
            assert.equal(res.text, "missing required field comment");
            done();
          })
        });

        test("Test POST /api/books/[id] with comment, id not in db", function (done) {
          chai.request(server).post(`/api/books/${idFake}`).send({comment: "You'll never see me!"}).end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.text);
            assert.equal(res.text, "no book exists");
            done();
          })
        });
      }
    );

    suite("DELETE /api/books/[id] => delete book object id", function () {
      test("Test DELETE /api/books/[id] with valid id in db", function (done) {
        chai.request(server).delete(`/api/books/${id1}`).end((err, res) => {
          assert.equal(res.status, 200);
          assert.isString(res.text);
          assert.equal(res.text, "delete successful");
          done();
        })
      });

      test("Test DELETE /api/books/[id] with  id not in db", function (done) {
        chai.request(server).delete(`/api/books/${idFake}`).end((err, res) => {
          assert.equal(res.status, 200);
          assert.isString(res.text);
          assert.equal(res.text, "no book exists");
          done();
        })
      });
    });
  });
});
