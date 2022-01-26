/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");
chai.use(chaiHttp);

let _idToDelete;

suite("Functional Tests", function () {
  suite("POST /api/issues/{project}", function () {
    test("Every field filled in", function (done) {
      chai
        .request(server)
        .post("/api/issues/test")
        .send({
          issue_title: "Title",
          issue_text: "text",
          created_by: "Functional Test - Every field filled in",
          assigned_to: "Chai and Mocha",
          status_text: "In QA",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.equal(res.body.issue_title, "Title");
          assert.equal(res.body.issue_text, "text");
          assert.equal(
            res.body.created_by,
            "Functional Test - Every field filled in"
          );
          assert.equal(res.body.assigned_to, "Chai and Mocha");
          assert.equal(res.body.status_text, "In QA");
          assert.isTrue(res.body.open);
          assert.isNumber(Date.parse(res.body.created_at));
          assert.isNumber(Date.parse(res.body.updated_at));
          assert.property(res.body, "_id");
          _idToDelete = res.body._id;
          done();
        });
    });

    test("Required fields filled in, Optional Fields Blank", function (done) {
      const test_data = {
        issue_title: "Faux Issue Title",
        issue_text: "Functional Test - Required Fields Only",
        created_by: "fCC",
      };
      chai
        .request(server)
        .post("/api/issues/test")
        .send(test_data)
        .end(function (err, res) {
          assert.isObject(res.body);
          assert.nestedInclude(res.body, test_data);
          assert.isEmpty(res.body.assigned_to);
          assert.isEmpty(res.body.status_text);
          done();
        });
    });

    test('Missing required fields => { error: "required field(s) missing" }', function (done) {
      chai
        .request(server)
        .post("/api/issues/test")
        .send({ issue_title: "Missing required fields" })
        .end(function (req, res) {
          assert.isObject(res.body);
          assert.equal(res.body.error, "required field(s) missing");
          done();
        });
    });
  });

  suite("GET /api/issues/{project}", function () {
    test("No filter", function (done) {
      chai
        .request(server)
        .get("/api/issues/test")
        .query({})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], "issue_title");
          assert.property(res.body[0], "issue_text");
          assert.property(res.body[0], "created_on");
          assert.property(res.body[0], "updated_on");
          assert.property(res.body[0], "created_by");
          assert.property(res.body[0], "assigned_to");
          assert.property(res.body[0], "open");
          assert.property(res.body[0], "status_text");
          assert.property(res.body[0], "_id");
          done();
        });
    });

    test("One filter", function (done) {
      // Create a unique project name for filtering
      const url =
        "/api/issues/filter_test_" + Date.now().toString().substring(7);
      let item_template = {
        issue_title: "Single Field Filter",
        issue_text: "One is the loneliest number",
        created_by: "",
      };

      // Add items to the project
      let a = chai
        .request(server)
        .post(url)
        .send(Object.assign(item_template, { created_by: "Alfie" }));
      let b = chai
        .request(server)
        .post(url)
        .send(Object.assign(item_template, { created_by: "Bruce" }));
      let c = chai
        .request(server)
        .post(url)
        .send(Object.assign(item_template, { created_by: "Charlie" }));

      // Once added filter down
      Promise.all([a, b, c]).then(() => {
        chai
          .request(server)
          .get(url + "?created_by=Bruce")
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.lengthOf(res.body, 1);
            assert.equal(res.body[0].created_by, "Bruce");
            done();
          });
      });
    });

    test("Multiple filters (test for multiple fields you know will be in the db for a return)", function (done) {
      // Create a unique project name for filtering
      const url =
        "/api/issues/filter_test_" + Date.now().toString().substring(7);
      let item_template = {
        issue_title: "Multiple Field Filter",
        issue_text: "Two can make it better",
        created_by: "",
        assigned_to: "",
      };

      // Add items to the project
      let a = chai
        .request(server)
        .post(url)
        .send(
          Object.assign(item_template, {
            created_by: "Bruce",
            assigned_to: "Dave",
          })
        );
      let b = chai
        .request(server)
        .post(url)
        .send(
          Object.assign(item_template, {
            created_by: "Bruce",
            assigned_to: "Dave",
          })
        );
      let c = chai
        .request(server)
        .post(url)
        .send(
          Object.assign(item_template, {
            created_by: "Charlie",
            assigned_to: "Dave",
          })
        );
      let d = chai
        .request(server)
        .post(url)
        .send(
          Object.assign(item_template, {
            created_by: "Charlie",
            assigned_to: "Dave",
          })
        );

      // Once added filter down
      Promise.all([a, b, c, d]).then(() => {
        chai
          .request(server)
          .get(url + "?created_by=Bruce&assigned_to=Dave")
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.lengthOf(res.body, 2);
            assert.equal(res.body[0].created_by, "Bruce");
            assert.equal(res.body[0].assigned_to, "Dave");
            assert.equal(res.body[1].created_by, "Bruce");
            assert.equal(res.body[1].assigned_to, "Dave");
            done();
          });
      });
    });
  });

  suite("PUT /api/issues/{project}", function () {
    test('One field to update => {result: "successfully updated", _id: _id}', function (done) {
      const new_issue = {
        issue_title: "Title",
        issue_text: "text",
        created_by: "This Will be Changed",
        assigned_to: "Chai and Mocha",
        status_text: "In QA",
      };
      let issue_change = {
        _id: "",
        created_by: "a new user",
      };
      chai
        .request(server)
        .post("/api/issues/test")
        .send(new_issue)
        .end(function (err, res) {
          assert.equal(res.status, 200);
          issue_change._id = res.body._id;

          chai
            .request(server)
            .put("/api/issues/test")
            .send(issue_change)
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.deepEqual(res.body, {
                result: "successfully updated",
                "_id": issue_change._id});

              chai
                .request(server)
                .get("/api/issues/test?_id=" + issue_change._id)
                .send(issue_change)
                .end(function (err, res) {
                  assert.equal(res.status, 200);
                  assert.isArray(res.body);
                  assert.property(res.body[0], 'created_by')
                  assert.equal(res.body[0].created_by, "a new user");
                  done();
                });
            });
        });
    });

    test('Multiple fields to update => {result: "successfully updated", _id: _id}', function (done) {
            const new_issue = {
        issue_title: "Title",
        issue_text: "text",
        created_by: "This Will be Changed",
        assigned_to: "Chai and Mocha",
        status_text: "In QA",
      };
      let issue_change = {
        _id: "",
        created_by: "a new user",
        assigned_to: "SaintPeter",
      };
      chai
        .request(server)
        .post("/api/issues/test")
        .send(new_issue)
        .end(function (err, res) {
          assert.equal(res.status, 200);
          issue_change._id = res.body._id;

          chai
            .request(server)
            .put("/api/issues/test")
            .send(issue_change)
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.deepEqual(res.body, {
                result: "successfully updated",
                "_id": issue_change._id});

              chai
                .request(server)
                .get("/api/issues/test?_id=" + issue_change._id)
                .send(issue_change)
                .end(function (err, res) {
                  assert.equal(res.status, 200);
                  assert.isArray(res.body);
                  assert.property(res.body[0], 'created_by')
                  assert.equal(res.body[0].created_by, "a new user");
                  assert.equal(res.body[0].assigned_to, "SaintPeter")
                  done();
                });
            });
        });
    });

    test('No _id submitted => { error: "missing _id" }', function (done) {
      chai
        .request(server)
        .put("/api/issues/test")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: "missing _id" });
          done();
        });
    });

    test('No fields to update => { error: "no update field(s) sent", _id: _id }', function (done) {
      chai
        .request(server)
        .put("/api/issues/test")
        .send({ _id: _idToDelete })
        .end(function (err, res) {
          assert.isObject(res.body);
          assert.equal(res.body.error, "no update field(s) sent");
          assert.equal(res.body._id, _idToDelete);
          done();
        });
    });

    test('Invalid _id => { error: "could not update", _id: _id }', function (done) {
      const badId = "5f665eb46e296f6b9b6a504d";
      chai
        .request(server)
        .put("/api/issues/test")
        .send({ _id: badId, created_by: "nhcarrigan" })
        .end(function (req, res) {
          assert.isObject(res.body);
          assert.equal(res.body.error, "could not update");
          assert.equal(res.body._id, badId);
          done();
        });
    });

    suite("DELETE /api/issues/{project}", function () {
      test("Valid _id", function (done) {
        chai
          .request(server)
          .delete("/api/issues/test")
          .send({ _id: _idToDelete })
          .end(function (req, res) {
            assert.isObject(res.body);
            assert.equal(res.body.result, "successfully deleted");
            assert.equal(res.body._id, _idToDelete);
            done();
          });
      });
      test('Invalid _id => { error: "could not delete", "_id": _id }', function (done) {
        const badId = "5f665eb46e296f6b9b6a504d";
        chai
          .request(server)
          .delete("/api/issues/test")
          .send({ _id: badId })
          .end(function (req, res) {
            assert.isObject(res.body);
            assert.equal(res.body.error, "could not delete");
            assert.equal(res.body._id, badId);
            done();
          });
      });

      test('No _id => { error: "missing _id" }', function (done) {
        chai
          .request(server)
          .delete("/api/issues/test")
          .end(function (req, res) {
            assert.isObject(res.body);
            assert.equal(res.body.error, "missing _id");
            done();
          });
      });
    });
  });
});
