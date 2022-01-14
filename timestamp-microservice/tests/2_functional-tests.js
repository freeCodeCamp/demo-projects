const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);
  test("/api/:date? with date string", function (done) {
    chai
      .request(server)
      .get("/api/2016-12-25")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.unix, 1482624000000);
        assert.equal(res.body.utc, "Sun, 25 Dec 2016 00:00:00 GMT");
        done();
      });
  });
  test("/api/:date? with timestamp", function (done) {
    chai
      .request(server)
      .get("/api/1451001600000")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.unix, 1451001600000);
        assert.equal(res.body.utc, "Fri, 25 Dec 2015 00:00:00 GMT");
        done();
      });
  });
  test("/api/:date? with timezone", function (done) {
    chai
      .request(server)
      .get("/api/05 October 2011, GMT")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.unix, 1317772800000);
        assert.equal(res.body.utc, "Wed, 05 Oct 2011 00:00:00 GMT");
      });
    done();
  });
  test("/api/:date? with bad string", function (done) {
    chai
      .request(server)
      .get("/api/this-is-not-a-date")
      .end(function (err, res) {
        assert.equal(res.body.error.toLowerCase(), "invalid date");
      });
    done();
  });
  test("/api", function (done) {
    chai
      .request(server)
      .get("/api")
      .end(function (err, res) {
        const now = Date.now();
        assert.equal(res.status, 200);
        assert.approximately(res.body.unix, now, 20000);
        assert.approximately(new Date(res.body.utc).getTime(), now, 20000);
        done();
      });
  });
});
