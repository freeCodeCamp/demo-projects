const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);
  test("/api/whoami", function (done) {
    chai
      .request(server)
      .get("/api/whoami")
      .set("accept-language", "dothraki")
      .set("user-agent", "uss enterprise")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.exists(res.body.ipaddress);
        assert.isAtLeast(res.body.ipaddress.length, 1);
        assert.equal(res.body.language, "dothraki");
        assert.equal(res.body.software, "uss enterprise");
        done();
      });
  });
});
