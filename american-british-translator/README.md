**freeCodeCamp** - Quality Assurance 5: American / British English Translator
------

[![Run on Repl.it](https://repl.it/badge/github/freeCodeCamp/boilerplate-project-american-british-english-translator)](https://repl.it/github/freeCodeCamp/boilerplate-project-american-british-english-translator)

### User stories:

 1. I can `POST` to `/api/translate` with a body containing `text` with the text to translate and `locale` with either `american-to-british` or `british-to-american`, The returned object should contain the submitted `text` and `translation` with the translated text.
 1. The `/api/translate` route should handle the way time is written in American and British English. For example, ten thirty is written as "10.30" in British English and "10:30" in American English.
 1. The `/api/translate` route should also handle the way titles/honorifics are abbreviated in American and British English. For example, Doctor Wright is abbreviated as "Dr Wright" in British English and "Dr. Wright" in American English. See `/public/american-to-british-titles.js` for the different titles your application should handle.
 1. Wrap any translated spelling or terms with `<span class="highlight">...</span>` tags so they appear in green.
 1. If one or more of the required fields is missing, return `{ error: 'Required field(s) missing' }`.
 1. If `text` is empty, return `{ error: 'No text to translate' }`
 1. If `locale` does not match one of the two specified locales, return `{ error: 'Invalid value for locale field' }`.
 1. If `text` requires no translation, return `"Everything looks good to me!"` for the `translation` value.
 1. All 24 unit tests are complete and passing. See `/tests/1_unit-tests.js` for the sentences you should write tests for.
 1. All 6 functional tests are complete and passing. See `/tests/2_functional-tests.js` for the functionality you should write tests for.
