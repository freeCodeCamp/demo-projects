const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  
  static replaceCurry(word, replacement, highlight, adjustCase = false)  {
    if(adjustCase) {
      replacement = replacement.replace(/^([a-z])/ig, letter => letter.toUpperCase());
    }
    return (word) => {
      if(highlight) {
        return `<span class="highlight">${replacement}</span>`.replace(/\s/g,"\0");
      } else {
        return '~' + replacement.replace(/\s/g,"\0") + '~';
      }
    }
  }

  static translateAmericanToBritish(input, highlight=false) {
    let american, british;

    // Phrases
    for([american, british] of Object.entries(americanOnly) ) {
      input = input.replace(new RegExp(`\\b${american}\\b`,'gi'),
        Translator.replaceCurry(american,british,highlight));
    }

    // Spelling
    for([american, british] of Object.entries(americanToBritishSpelling) ) {
      input = input.replace(new RegExp(`\\b${american}\\b`,'gi'),
        Translator.replaceCurry(american,british,highlight));
    }

    // Title Replacement
    for([american, british] of Object.entries(americanToBritishTitles) ) {
      american = american.replace('.', '\.');
      input = input.replace(new RegExp(`\\b${american}`,'gi'),
        Translator.replaceCurry(american,british,highlight, true));
    }

    // Time Replacement, colon to period replacement
    if(highlight) {
      input = input.replace(/(\d{1,2}):(\d{1,2})/gi, '<span class="highlight">\$1.\$2</span>');
    } else {
      input = input.replace(/(?<=\d{1,2}):(?=\d{1,2})/gi, '.');
    }

    // Uppercase start of sentence
    input = input.replace(/^([a-z])/ig, letter => letter.toUpperCase());

    return input.replace(/~/g, '').replace(/\0/g, ' ');
  }

  static translateBritishToAmerican(input, highlight=false) {
    let american, british;

    // Phrases
    for([british, american] of Object.entries(britishOnly) ) {
      input = input.replace(new RegExp(`\\b${british}\\b`,'gi'),
        Translator.replaceCurry(british,american,highlight));
    }

    // Spelling
    for([american, british] of Object.entries(americanToBritishSpelling) ) {
      input = input.replace(new RegExp(`\\b${british}\\b`,'gi'),
        Translator.replaceCurry(british,american,highlight));
    }

    // Title Replacement
    for([american, british] of Object.entries(americanToBritishTitles) ) {
      input = input.replace(new RegExp(`\\b${british}\\b`,'gi'),
        Translator.replaceCurry(british,american,highlight, true));
    }

    // Time Replacement, period to colon replacement
    if(highlight) {
      input = input.replace(/(\d{1,2}).(\d{1,2})/gi, '<span class="highlight">\$1:\$2</span>');
    } else {
      input = input.replace(/(?<=\d{1,2})\.(?=\d{1,2})/gi, ':');
    }

    // Uppercase start of sentence
    input = input.replace(/^([a-z])/ig, letter => letter.toUpperCase());

    return input.replace(/~/g, '').replace(/\0/g, ' ');
  }
}

module.exports = Translator;
