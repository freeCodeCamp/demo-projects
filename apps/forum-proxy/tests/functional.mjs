import chaiHttp from 'chai-http';
import chai from 'chai';

import server from '../server.mjs';

const assert = chai.assert;

chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  test('Get forum data', function (done) {
    chai
      .request(server)
      .get('/latest')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body.users);
        done();
      });
  });
});
