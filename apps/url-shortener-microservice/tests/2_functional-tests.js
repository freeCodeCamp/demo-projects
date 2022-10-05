require("dotenv").config();
const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  const url = `http://google.com/?v=${Date.now()}`;
  let shortUrl = "";
  this.timeout(5000);
  test("POST url", function (done) {
    chai
      .request(server)
      .post("/api/shorturl")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ url })
      .end(function (err, res) {
        shortUrl = res.body.short_url;
        assert.equal(res.status, 200);
        assert.equal(res.body.original_url, url);
        assert.exists(res.body.short_url);
        done();
      });
  });
  test("GET short_url", function (done) {
    chai
      .request(server)
      .get(`/api/shorturl/${shortUrl}`)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.redirects[0], url);
        done();
      });
  });
  test("POST Bad URL", function () {
    chai
      .request(server)
      .post("/api/shorturl")
      .send({ url: "bad url" })
      .end(function (err, res) {
        assert.equal(res.body.error.toLowerCase(), "invalid url");
      });
  });
});
