'use strict';

const {
  chai,
  describe,
  it,
  before,
  mockApp,
} = require('./testSetup');

const newRequestsPath = '/requests/new';
const createRequestsPath = '/requests/create';
const selectGivesPath = '/books/select/gives';
const selectTakesPath = '/books/select/takes';

describe(`GET ${newRequestsPath}`, () => {
  let res;
  before(() =>
    chai.request(mockApp)
      .get(newRequestsPath)
      .then((response) => { res = response; }),
  );
  it('should show a form to submit the request', () => {
    res.text.should.contain(`action="${createRequestsPath}"`);
  });
  it('should show a link to books to give', () => {
    res.text.should.contain(`href="${selectGivesPath}"`);
  });
  it('should show a link to books to take', () => {
    res.text.should.contain(`href="${selectTakesPath}"`);
  });
});

describe('Select books to give', () => {
  describe(`GET ${selectGivesPath}`, () => {
    let res;
    before(() =>
      chai.request(mockApp)
        .get(selectGivesPath)
        .then((response) => { res = response; }),
    );
    it('should show a form', () => {
      res.text.should.contain('type="submit"');
      res.text.should.contain('form');
    });
  });
});
