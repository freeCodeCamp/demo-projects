# Personal Library

## User stories:

1. I can `POST` a `title` to `/api/books` to add a book and returned will be the object with the `title` and a unique `_id`.
1. I can `GET` `/api/books` to retrieve an array of all books containing `title`, `_id`, and `commentcount`.
1. I can `GET` `/api/books/{_id}` to retrieve a single object of a book containing `title`, `_id`, and an array of `comments` (or an empty array if no comments present).
1. I can `POST` a `comment` to `/api/books/{_id}` to add a comment to a book and returned will be the books object similar to `get` `/api/books/{_id}`.
1. I can `DELETE` `/api/books/{_id}` to delete a book from the collection. Returned will be `'delete successful'` if successful.
1. If I try to request a book that doesn't exist I will get a `'no book exists'` message.
1. I can send a `DELETE` request to `/api/books` to delete all books in the database. Returned will be `'complete delete successful'` if successful.
1. All 6 functional tests required are complete and passing.

|                   | `GET`          | `POST`              | `DELETE`         |
| :---------------: | :------------: | :-----------------: | :--------------: |
| `/api/books`      | list all books | add new book        | delete all books |
| `/api/books/1234` | show book 1234 | add comment to 1234 | delete 1234      |

## Additional notes:

- Add your MongoDB connection string to .env without quotes as `DB_URI`, for example: `mongodb://admin:pass@1234.mlab.com:1234/fccpersonallib`
- Set `NODE_ENV` to `test` without quotes
- You need to create all routes within `routes/api.js`
- You will create all of the functional tests in `tests/2_functional-tests.js`
