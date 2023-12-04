require('dotenv').config();
const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  let id = '';
  const username = `fcc_test_${Date.now()}`.substring(0, 29);

  suite('/api/users', function () {
    test('POST', function (done) {
      chai
        .request(server)
        .post('/api/users')
        .send({ username })
        .end(function (err, res) {
          id = res.body._id;
          assert.isTrue(res.ok);
          assert.equal(res.body.username, username);
          done();
        });
    });

    test('GET', function (done) {
      chai
        .request(server)
        .get('/api/users')
        .end(function (err, res) {
          assert.isArray(res.body);
          const myUser = res.body.find(user => user._id === id);
          assert.exists(myUser);
          assert.exists(myUser.username);
          assert.exists(myUser._id);
          assert.equal(myUser.username, username);
          done();
        });
    });
  });

  suite('/api/users/:_id/exercises', function () {
    test('POST', function (done) {
      chai
        .request(server)
        .post(`/api/users/${id}/exercises`)
        .send({
          description: 'test',
          duration: '10',
          date: '1990-01-01'
        })
        .end(function (err, res) {
          assert.isTrue(res.ok);
          assert.equal(res.body.username, username);
          assert.equal(res.body._id, id);
          assert.equal(res.body.description, 'test');
          assert.equal(res.body.duration, 10);
          // timezones are fun!
          assert.include(['Mon Jan 01 1990', 'Sun Dec 31 1989'], res.body.date);
          done();
        });
    });
  });

  suite('/api/users/:_id/logs', function () {
    test('GET', function (done) {
      chai
        .request(server)
        .get(`/api/users/${id}/logs`)
        .end(function (err, res) {
          assert.isTrue(res.ok);
          assert.equal(res.body.username, username);
          assert.equal(res.body._id, id);
          assert.isArray(res.body.log);
          assert.equal(res.body.count, res.body.log.length);
          assert.equal(res.body.log[0].description, 'test');
          assert.equal(res.body.log[0].duration, 10);
          // timezones are fun!
          assert.include(
            ['Mon Jan 01 1990', 'Sun Dec 31 1989'],
            res.body.log[0].date
          );
          done();
        });
    });

    test('GET with limits', function (done) {
      chai
        .request(server)
        .get(`/api/users/${id}/logs?from="2000-01-01"`)
        .end(function (err, res) {
          assert.isTrue(res.ok);
          assert.equal(res.body.username, username);
          assert.equal(res.body._id, id);
          assert.isArray(res.body.log);
          assert.equal(res.body.count, res.body.log.length);
          assert.equal(res.body.log.length, 0);
          done();
        });
    });
  });
});
