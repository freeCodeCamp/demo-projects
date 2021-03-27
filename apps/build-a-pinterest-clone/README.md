# Build a Pinterest clone

## User stories:

1. As an unauthenticated user, I can login with Github.
1. As an authenticated user, I can link to images.
1. As an authenticated user, I can delete images that I've linked to.
1. As an authenticated user, I can see a Pinterest-style wall of all the images I've linked to.
1. As an unauthenticated user, I can browse other users' walls of images.
1. As an authenticated user, if I upload an image that is broken, it will be replaced by a placeholder image. (can use jQuery broken image detection)

## Usage:

Log in with github and add some nice pic links.
There is a bonus picture liking feature.

## Tools:

- Mongoose
- React (no Flux)
- Bootstrap
- Masonry
- ~~SCSS~~ CSS
- passport, github oAuth
- Babelify express middleware

## TODO

Manage loading states for single images, and like.

## Notes

It supports front-end `require()` via **express-babelify-middleware**,
which allows bundling and transpiling react components and helpers in the server, on client request.
