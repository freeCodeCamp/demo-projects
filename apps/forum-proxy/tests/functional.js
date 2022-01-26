const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);
  test("Get forum data", function (done) {
    chai
      .request(server)
      .get("/latest")
      .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body.users);
        done();
      });
  });
});
