'use strict';

function fromBooks(books, user) {
  if (!user) return 0;
  return 5;
}

function fromRequests(requests, user) {
  if (!user) return 0;
  const requestsForUsersBooks = requests.filter(request =>
    request.takes.map(book => book.owner.id).includes(user.id));
  return requestsForUsersBooks.length;
}

module.exports = {
  fromBooks,
  fromRequests,
};
