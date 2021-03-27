const User = require('../app/models/User');
const Book = require('../app/models/Book');
const Request = require('../app/models/Request');

// Users
const alice = {
  username: 'alice',
  google: {
    id: '1',
    username: 'googleAlice',
    displayName: 'Alice B. Google',
  },
  city: 'Atlanta',
  address: '123 Something A',
};

const bob = {
  username: 'bob',
  github: {
    id: '1',
    username: 'githubBob',
    displayName: 'Robert J. Github',
  },
  city: 'Boston',
  address: '123 Something B',
};

const charlie = {
  username: 'charlie',
  github: {
    id: '2',
    username: 'githubChuck',
    displayName: 'Charles Q. Github',
  },
  city: 'Charleston',
  address: '123 Something C',
};

// Books
const artichoke = {
  name: 'Artickoke',
  description: 'Mary Washingtom heirloom',
};

const butternut = {
  name: 'Butternut',
  description: '20 books',
};

const carrot = {
  name: 'Carrot',
  description: '100 Danvers half long',
};

const cookies = {
  name: 'Cookies',
  description: '24 Chocolate Chip',
};

const figJam = {
  name: 'Fig Jam',
  description: 'Organic, local, 1 pint',
};

const users = [alice, bob, charlie];
const books0 = [artichoke, butternut, carrot];
const books1 = [cookies, figJam];

function seedDb() {
  return User.remove({})
    .then(() => Book.remove({}))
    .then(() => Request.remove({}))
    .then(() => User.create(users))
    .then((savedUsers) => {
      const testBooks0 = books0.map(book => ({
        name: book.name,
        description: book.description,
        // eslint-disable-next-line no-underscore-dangle
        owner: savedUsers[0]._id,
      }));
      const testBooks1 = books1.map(book => ({
        name: book.name,
        description: book.description,
        // eslint-disable-next-line no-underscore-dangle
        owner: savedUsers[1]._id,
      }));
      return Book.create(testBooks0.concat(testBooks1));
    })
    .then(books => Request.create({
      requester: books[0].owner,
      // eslint-disable-next-line no-underscore-dangle
      gives: [books[0]._id],
      // eslint-disable-next-line no-underscore-dangle
      takes: [books[books.length - 1]._id],
    }))
    .catch(console.error);
}

module.exports = {
  users,
  books0,
  books1,
  seedDb,
};
