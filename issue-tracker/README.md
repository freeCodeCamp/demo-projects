# Issue Tracker

## User stories:

1. I can `POST` `/api/issues/{projectName}` with form data containing required `issue_title`, `issue_text`, and `created_by` fields. In addition to the required fields, I can optionally send `assigned_to` and `status_text`.
1. The object saved (and returned) will include all of those fields (blank if there was no input) and also include `created_on` (date/time), `updated_on` (date/time), `open` (boolean -- true for open, false for closed), and `_id`.
1. I can `PUT` `/api/issues/{projectName}` with an `_id` and any fields in the object I want to update. Return the message `'Successfully updated'` if the update was successful, or `'Could not update {_id}'` if it was not. Successfully updating an object should also update the `updated_on` field. If no fields are sent, return `'No updated fields sent'`.
1. I can `DELETE` `/api/issues/{projectName}` with an `_id` to completely delete an issue. If no `_id` is sent return `'_id error'`. Return `'Deleted {_id}'` if you successfully delete an issue, and `'Could not delete {_id}'` if you could not.
1. I can `GET` `/api/issues/{projectName}` for an array of all issues on that specific project with all the information for each issue as was returned when posted.
1. I can filter my `GET` request by also passing along any field and value in the query (for example, `/api/issues/{project}?open=false`). I can pass along as many fields/values as I want.
1. All 11 functional tests are complete and passing.

## Additional notes:

- Set `NODE_ENV` to `test` without quotes and set DB to your Mongo connection string in .env file
- Complete the project in `routes/api.js` or by creating a handler/controller
- You will create all of the functional tests in `tests/2_functional-tests.js`
