# File Metadata Microservice

## User stories:

1. I can submit a form that includes a file upload.
1. The form file input field has the `name` attribute set to `upfile`. We rely on this in testing.
1. When I submit something, I will receive the file name and size in bytes within the JSON response

## Usage:

- Go to the main page, and upload a file using the provided form.

## Hint:

- To handle the file uploading you should use the [multer](https://www.npmjs.com/package/multer) npm package.
