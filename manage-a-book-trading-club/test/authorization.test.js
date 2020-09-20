'use strict';

const {
  chai,
  app,
  describe,
  it,
  mockApp,
} = require('./testSetup');

// the following paths should require authorization or should redirect to /login
const Tests = [
  { path: '/requests/new', method: 'get' },
  // { path: '/requests/create', method: 'post', redirect: '/books' },
];

function notLoggedIn({ method, path }) {
  it(`${method} ${path} should redirect to /login`, () =>
    chai.request(app)[method](path)
      .then((res) => {
        // eslint-disable-next-line no-unused-expressions
        res.should.redirect;
        res.req.path.should.equal('/login');
      }),
  );
}

function loggedIn({ method, path, redirect }) {
  it(`${method} ${path} should be allowed`, () =>
    chai.request(mockApp)[method](path)
      .then((res) => {
        if (redirect) {
          // eslint-disable-next-line no-unused-expressions
          res.should.redirect;
          res.req.path.should.equal(redirect);
        } else {
          res.should.have.status(200);
          res.req.path.should.equal(path);
        }
      }),
  );
}

describe('Authorization:', () => {
  describe('When user *is not* logged in,', () => {
    Tests.forEach(notLoggedIn);
  });

  describe('When user is logged in,', () => {
    Tests.forEach(loggedIn);
  });
});
