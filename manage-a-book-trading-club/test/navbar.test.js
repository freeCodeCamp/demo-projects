'use strict';

const {
  describe,
  it,
  before,
  chai,
  mockApp,
  app,
  testData,
} = require('./testSetup');

const user = testData.users[0];
const loggedInNavText = [
  'Logout',
  `>${user.username}</a>`,
  'href="/users/',
  'My Books',
];

const notLoggedInNavText = [
  'Login',
];

const alwaysNavText = [
  'href="/books"',
  // 'href="/requests"',
];


describe('Navbar', () => {
  describe('Logged in', () => {
    let response;
    before(() =>
      chai.request(mockApp)
        .get('/')
        .then((res) => { response = res; }),
    );
    loggedInNavText.concat(alwaysNavText).forEach((text) => {
      it(`should contain ${text}`, () =>
        response.text.should.contain(text));
    });
    notLoggedInNavText.forEach((text) => {
      it(`should not contain ${text}`, () =>
        response.text.should.not.contain(text));
    });
  });

  describe('Not Logged in', () => {
    let response;
    before(() =>
      chai.request(app)
        .get('/')
        .then((res) => { response = res; }),
    );
    notLoggedInNavText.concat(alwaysNavText).forEach((text) => {
      it(`should contain ${text}`, () =>
        response.text.should.contain(text));
    });
    loggedInNavText.forEach((text) => {
      it(`should not contain ${text}`, () =>
        response.text.should.not.contain(text));
    });
  });
});
