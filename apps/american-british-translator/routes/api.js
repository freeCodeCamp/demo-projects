/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  app.route('/api/translate')
    .post((req, res) => {
      let text = req.body.text;
      if(!req.body.hasOwnProperty('text') || !req.body.locale) {
        return res.json({ error: 'Required field(s) missing' });
      }

      if(text === "") {
        return res.json({ error: 'No text to translate' });
      }

      let translation;
      switch(req.body.locale) {
        case 'american-to-british':
          translation = Translator.translateAmericanToBritish(text, true);
          break;
        case 'british-to-american':
          translation = Translator.translateBritishToAmerican(text, true);
          break;
        default:
          return res.json({ error: 'Invalid value for locale field' });
      }

      if(translation === text) {
          translation = "Everything looks good to me!"
      }

      return res.json({ text, translation });
      
    });
};