'use strict';

const {
  chai,
  app,
  describe,
  it,
  before,
  testData,
  mockApp,
} = require('./testSetup');

describe('GET / the root', () =>
  it('should redirect to /books', () =>
    chai.request(app)
      .get('/')
      .then(res => res.req.path.should.equal('/books')),
  ),
);

describe('Books controller', () => {
  describe('GET /books', () => {
    it('should show a list of books in the exchange', () =>
      chai.request(app)
        .get('/books')
        .then((res) => {
          res.should.have.status(200);
          res.req.path.should.equal('/books');
          res.text.should.contain(testData.books0[0].name);
          const last = testData.books0.length - 1;
          res.text.should.contain(testData.books0[last].name);
        }),
    );
  });

  describe('GET /mybooks when logged in', () => {
    let res;
    before(() =>
      chai.request(mockApp)
        .get('/mybooks')
        .then((response) => { res = response; }),
    );

    it('should show a form', () => {
      res.should.have.status(200);
      // eslint-disable-next-line no-unused-expressions
      res.should.not.redirect;
      res.req.path.should.equal('/mybooks');
      res.text.should.contain('form');
    });
  });
});
