const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  test('File upload', function (done) {
    chai
      .request(server)
      .post('/api/fileanalyse')
      .attach('upfile', './tests/camperbot.png')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.name, 'camperbot.png');
        assert.equal(res.body.type, 'image/png');
        assert.equal(res.body.size, 20446);
        done();
      });
  });
});
