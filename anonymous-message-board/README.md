# Anonymous Message Board

## User stories:

1. Only allow your site to be loading in an iFrame on your own pages.
1. Do not allow DNS prefetching.
1. Only allow your site to send the referrer for your own pages.
1. I can `POST` a thread to a specific message board by passing form data `text` and `delete_password` to `/api/threads/{board}`. (Recommend res.redirect to board page `/b/{board}`.) Saved will be `_id`, `text`, `created_on` (date and time), `bumped_on` (date and time, starts same as `created_on`), `reported` (boolean), `delete_password`, and `replies` (array).
1. I can `POST` a reply to a thead on a specific board by passing form data `text`, `delete_password`, and `thread_id` to `/api/replies/{board}` and it will also update the `bumped_on` date to the comment's date. (Recommend res.redirect to thread page `/b/{board}/{thread_id}`.) In the thread's `replies` array will be saved `_id`, `text`, `created_on`, `delete_password`, and `reported`.
1. I can `GET` an array of the most recent 10 bumped threads on the board with only the most recent 3 replies from `/api/threads/{board}`. The `reported` and `delete_passwords` fields will not be sent.
1. I can `GET` an entire thread with all its replies from `/api/replies/{board}?thread_id={thread_id}`. Also hiding the same fields.
1. I can delete a thread completely if I send a `DELETE` request to `/api/threads/{board}` and pass along the `thread_id` and `delete_password`. (Text response will be 'incorrect password' or 'success'.)
1. I can delete a post (just changing the text to '[deleted]') if I send a
`DELETE` request to `/api/replies/{board}` and pass along the `thread_id`, `reply_id`, and `delete_password`. (Text response will be 'incorrect password' or 'success')
1. I can report a thread and change its reported value to true by sending a `PUT` request to `/api/threads/{board}` and pass along the `thread_id`. (Text response will be 'success'.)
1. I can report a reply and change its reported value to true by sending a `PUT` request to `/api/replies/{board}` and pass along the `thread_id` and `reply_id`. (Text response will be 'success')
1. Complete functional tests that wholely test routes and pass.

|                        | `GET`                      | `POST`                 | `PUT`                  | `DELETE`                              |
| :--------------------: | :------------------------: | :--------------------: | :--------------------: | :-----------------------------------: |
| `/api/threads/{board}` | list recent threads        | create thread          | report thread          | delete thread with password           |
| `/api/replies/{board}` | show all replies on thread | create reply on thread | report reply on thread | change reply to '[deleted]' on thread |

## Additional notes:

- Set DB_URI to your Mongo connection string in the `.env` file
- It's recommended to create controllers/handlers in `controllers` and handle routing in `routes/api.js`
- Add security features to `server.js`
- Create all of the functional tests in `tests/2_functional-tests.js`
