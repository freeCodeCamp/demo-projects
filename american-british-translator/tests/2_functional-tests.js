/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

  suite('"POST" to /api/translate', () => {
    test('POST with text and locale fields populated', done => { 
      const text = "Mangoes are my favorite fruit.";
      const locale = 'american-to-british';
      const output = {
        text: "Mangoes are my favorite fruit.", 
        translation: 'Mangoes are my <span class="highlight">favourite</span> fruit.'
      };
      chai.request(server)
        .post('/api/translate/')
        .send({text, locale})
        .end((err, res) => {
          assert.property(res.body, "text");
          assert.equal(res.body.text, output.text);
          assert.property(res.body, 'translation');
          assert.equal(res.body.translation, output.translation);
          done();
        })
    });

    test('POST with text and invalid locale', done => {
      const text = "Mangoes are my favorite fruit.";
      const locale = 'russian-to-spanish';
      const error = { error: 'Invalid value for locale field' };
      chai.request(server)
        .post('/api/translate/')
        .send({text, locale})
        .end((err, res) => {
          assert.property(res.body, 'error');
          assert.equal(res.body.error, error.error);
          done();
        });
    });

    test('POST with missing text field', done => {
      const locale = "american-to-british";
      const error = { error: 'Required field(s) missing' }
      chai.request(server)
        .post('/api/translate')
        .send({locale})
        .end((err, res) => {
          assert.property(res.body, 'error');
          assert.equal(res.body.error, error.error);
          done();
        });
    });
    
    test('POST with missing locale field', done => {
      const text = "freeCodeCamp rocks!";
      const error = { error: 'Required field(s) missing' }
      chai.request(server)
        .post('/api/translate')
        .send({text})
        .end((err, res) => {
          assert.property(res.body, 'error');
          assert.equal(res.body.error, error.error);
          done();
        })
      
    });
    
    test('POST with missing text', done => {
      const text = "";
      const locale = "american-to-british";
      const error = { error: 'No text to translate' }
      
      chai.request(server)
        .post('/api/translate')
        .send({text, locale})
        .end((err, res) => {
          assert.property(res.body, 'error');
          assert.equal(res.body.error, error.error);
          done();
        });
    });

    test('POST with text that needs no translation', done => {
      const text = "SaintPeter and nhcarrigan say hello!";
      const locale = "british-to-american"
      const output = {
        text: "SaintPeter and nhcarrigan say hello!", 
        translation: "Everything looks good to me!"
        }
      chai.request(server)
        .post('/api/translate')
        .send({text, locale})
        .end((err, res) => {
          assert.property(res.body, 'text');
          assert.property(res.body, 'translation');
          assert.equal(res.body.text, output.text);
          assert.equal(res.body.translation, output.translation);
          done();
        })
    });
  });  
});
