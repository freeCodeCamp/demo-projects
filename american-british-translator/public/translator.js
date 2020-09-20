import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';

// Handle British equivalents for spelling
let americanToBritishDict = { ...americanToBritishSpelling };

const reverseDictionary = obj => {
  return Object.keys(obj).reduce((acc, curr) => {
    acc[obj[curr]] = curr;
    return acc;
  }, {});
}

// Get British versions of spelling and titles
let britishToAmericanDict = reverseDictionary({ ...americanToBritishDict });
let britishToAmericanTitles = reverseDictionary({...americanToBritishTitles });

// Append American only phrases and titles
americanToBritishDict = { ...americanToBritishDict, ...americanOnly }

// Append British only phrases
britishToAmericanDict = { ...britishToAmericanDict, ...britishOnly }

const objUpperCase = obj => {
  return Object.keys(obj).reduce((acc, curr) => {
    const upperKey = curr[0].toUpperCase() + curr.slice(1);
    acc[upperKey] = upperKey.includes('.') ? upperKey.replace('.', '') : `${upperKey}.`;

    return acc;
  }, {});
}
const upLowAmericanToBritishTitles = { ...americanToBritishTitles, ...objUpperCase(americanToBritishTitles) }
const upLowBritishToAmericanTitles = { ...britishToAmericanTitles, ...objUpperCase(britishToAmericanTitles) }

const textArea = document.getElementById('text-input');
const translationDiv = document.getElementById('translated-sentence');
const errorDiv = document.getElementById('error-msg');

const clearAll = () => {
  return textArea.value = '', translationDiv.textContent = '', errorDiv.textContent = '';
}

const translateSentence = (str, targetLocale) => {
  const translatedWordsOrTerms = [];
  const targetTitles = targetLocale === 'british' ? upLowAmericanToBritishTitles : upLowBritishToAmericanTitles;
  // Deal with titles early by replacing instances
  // of them in the current string
  const handleTitles = str => {
    return str.split(' ').map(s => {
      const match = targetTitles[s];
      if (match) {
        translatedWordsOrTerms.push(match);
        return match;
      } else {
        return s;
      }
    }).join(' ');
  }

  const fixTimes = arr => arr.reduce((acc, curr, i, arr) => {
    const currNumber = parseInt(curr);
    const timeSeparator = targetLocale === 'british' ? arr[i + 1] === ':' : arr[i + 1] === '.';
    const followingNumber = parseInt(arr[i + 2]);
    if (currNumber && timeSeparator && followingNumber) {
      const time = targetLocale === 'british' ? `${currNumber}.${followingNumber}` : `${currNumber}:${followingNumber}`;
      acc.push(time);
      translatedWordsOrTerms.push(time);
      // Remove the next two values
      arr.splice(i + 1, 2);
    } else {
      acc.push(curr);
    }

    return acc;
  }, []);

  const titleStr = handleTitles(str);
  let lowerStrArr = titleStr.toLowerCase().split(/([\s,.;:?])/).filter(el => el !== '');
  let preservedCapsArr = titleStr.split(/([\s,.;:?])/).filter(el => el !== '');
  const targetDict = targetLocale === 'british' ? americanToBritishDict : britishToAmericanDict;

  lowerStrArr = fixTimes(lowerStrArr);
  preservedCapsArr = fixTimes(preservedCapsArr);

  Object.keys(targetDict).forEach(currWordOrTerm => {
    // Create clean, updated string to test for words/terms
    const testStr = lowerStrArr.join('').replace(/[,.;?]/g, '');

    // Check whole string to handle longer terms
    if (testStr.includes(currWordOrTerm)) {
      const newWordOrTerm = targetDict[currWordOrTerm];
      const currWordOrTermArr = currWordOrTerm.split(/(\s)/);
      const isPresent = (str) => lowerStrArr.indexOf(str) >= 0;

      /* 
        Check that the whole word or term from the dictionary is
        in the original string array, and not a shorter
        version like favor --> favorite.
        Store changes to lowerStrArr and preservedCapsArr
      */
      if (currWordOrTermArr.every(isPresent)) {
        // Single word or no spaces
        if (currWordOrTermArr.length === 1) {
          preservedCapsArr[lowerStrArr.indexOf(currWordOrTerm)] = newWordOrTerm;
          lowerStrArr[lowerStrArr.indexOf(currWordOrTerm)] = newWordOrTerm;

          translatedWordsOrTerms.push(newWordOrTerm);
        } else {
          const targetIndex = lowerStrArr.indexOf(...currWordOrTermArr);
          lowerStrArr.splice(targetIndex, currWordOrTermArr.length, newWordOrTerm);
          // Handle cases where the original term was capitalized
          const firstWordOfTerm = preservedCapsArr.slice(targetIndex, targetIndex + currWordOrTermArr.length)
          const capitalTerm = firstWordOfTerm[0].toUpperCase() === firstWordOfTerm[0];
          preservedCapsArr.splice(targetIndex, currWordOrTermArr.length, capitalTerm ? newWordOrTerm[0].toUpperCase() + newWordOrTerm.slice(1) : newWordOrTerm);
          
          translatedWordsOrTerms.push(newWordOrTerm);
        }
      }
    }
  });

  // console.log(lowerStrArr, preservedCapsArr);

  const translatedStr = collapseSentenceArr(preservedCapsArr);
  const translationObj = {
    translatedStr: translatedStr,
    translatedStrArr: preservedCapsArr,
    translatedWordsOrTerms: translatedWordsOrTerms
  }

  // console.log(translationObj);
  displayTranslation(translationObj);
  return translationObj;
}

const collapseSentenceArr = arr => {
  return arr.reduce((acc, curr) => {
    return acc += curr;
  }, '');
}

const displayTranslation = obj => {
  const { translatedStr, translatedStrArr, translatedWordsOrTerms } = obj;

  translatedWordsOrTerms.forEach(wordOrTerm => {
    // Handle cases where the capitalization of a translated word
    // or term might be upper or lowercase
    const upperWordOrTerm = wordOrTerm[0].toUpperCase() + wordOrTerm.slice(1);
    // console.log(upperWordOrTerm, obj);
    if (translatedStrArr.indexOf(upperWordOrTerm) >= 0) {
      translatedStrArr[translatedStrArr.indexOf(upperWordOrTerm)] = `<span class='highlight'>${upperWordOrTerm}</span>`;
    } else {
      translatedStrArr[translatedStrArr.indexOf(wordOrTerm)] = `<span class='highlight'>${wordOrTerm}</span>`;
    }
  });

  const htmlStr = collapseSentenceArr(translatedStrArr);

  if (translatedStr === '' || textArea.value === '') {
    translationDiv.textContent = '';
    errorDiv.textContent =  "Error: No text to translate.";
  } else {
    errorDiv.textContent = '';
    return translatedWordsOrTerms.length === 0 ? translationDiv.innerHTML = 'Everything looks good to me!' : translationDiv.innerHTML = htmlStr;
  }
}

// Handle buttons
const translateBtn = document.getElementById('translate-btn');
translateBtn.addEventListener('click', () => {
  const targetLocale = document.getElementById('locale-select').value === 'american-to-british' ? 'british' : 'american';
  translateSentence(textArea.value, targetLocale);
});

const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', () => {
  clearAll();
});

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    clearAll,
    translateSentence,
    displayTranslation
  }
} catch (e) {}
