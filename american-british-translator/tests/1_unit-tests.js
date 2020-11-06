/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
  suite('American to British English', () => {

    test('Mangoes are my favorite fruit. --> Mangoes are my favourite fruit.', done => {
      const input = 'Mangoes are my favorite fruit.';
      const output = 'Mangoes are my favourite fruit.';
      const translation = Translator.translateAmericanToBritish(input)
      assert.equal(translation, output)
      done();
    });

    test('I ate yogurt for breakfast. --> I ate yoghurt for breakfast.', done => {
      const input = 'I ate yogurt for breakfast.';
      const output = 'I ate yoghurt for breakfast.';
      const translation = Translator.translateAmericanToBritish(input);
      assert.equal(translation, output)
      done();
    });

    test("We had a party at my friend's condo. --> We had a party at my friend's flat.", done => {
      const input = "We had a party at my friend's condo.";
      const output = "We had a party at my friend's flat.";
      const translation = Translator.translateAmericanToBritish(input);
      assert.equal(translation, output)
      done();
    });

    test('Can you toss this in the trashcan for me? --> Can you toss this in the bin for me?', done => {
      const input = 'Can you toss this in the trashcan for me?';
      const output = 'Can you toss this in the bin for me?';
      const translation = Translator.translateAmericanToBritish(input);
      assert.equal(translation, output)
      done();
    });

    test('The parking lot was full. --> The car park was full.', done => {
      const input = 'The parking lot was full.';
      const output = 'The car park was full.';
      const translation = Translator.translateAmericanToBritish(input);
      assert.equal(translation, output)
      done();
    });

    test('Like a high tech Rube Goldberg machine. --> Like a high tech Heath Robinson device.', done => {
      const input = 'Like a high tech Rube Goldberg machine.';
      const output = 'Like a high tech Heath Robinson device.';
      const translation = Translator.translateAmericanToBritish(input);
      assert.equal(translation, output)
      done();
    });
    
    test('To play hooky means to skip class or work. --> To bunk off means to skip class or work.', done => {
      const input = 'To play hooky means to skip class or work.';
      const output = 'To bunk off means to skip class or work.';
      const translation = Translator.translateAmericanToBritish(input);
      assert.equal(translation, output)
      done();
    });

    test('No Mr. Bond, I expect you to die. --> No Mr Bond, I expect you to die. ', done => {
      const input = 'No Mr. Bond, I expect you to die.';
      const output = 'No Mr Bond, I expect you to die.';
      const translation = Translator.translateAmericanToBritish(input);
      assert.equal(translation, output)
      done();
    });

    test('Dr. Grosh will see you now. --> Dr Grosh will see you now. ', done => {
      const input = 'Dr. Grosh will see you now.';
      const output = 'Dr Grosh will see you now.';
      const translation = Translator.translateAmericanToBritish(input);
      assert.equal(translation, output)
      done();
    });

    test('Lunch is at 12:15 today. --> Lunch is at 12.15 today.', done => {
      const input = 'Lunch is at 12:15 today.';
      const output = 'Lunch is at 12.15 today.';
      const translation = Translator.translateAmericanToBritish(input);
      assert.equal(translation, output)
      done();
    });

  });

  suite('British to American English', () => {

    test('We watched the footie match for a while. --> We watched the soccer match for a while.', done => {
      const input = 'We watched the footie match for a while.';
      const output = 'We watched the soccer match for a while.';
      const translation = Translator.translateBritishToAmerican(input);
      assert.equal(translation, output)
      done();
    });

    test('Paracetamol takes up to an hour to work. --> Tylenol takes up to an hour to work.', done => {
      const input = 'Paracetamol takes up to an hour to work.';
      const output = 'Tylenol takes up to an hour to work.';
      const translation = Translator.translateBritishToAmerican(input);
      assert.equal(translation, output)
      done();
    });

    test('First, caramelise the onions. --> First, caramelize the onions.', done => {
      const input = 'First, caramelise the onions.';
      const output = 'First, caramelize the onions.';
      const translation = Translator.translateBritishToAmerican(input);
      assert.equal(translation, output)
      done();
    });

    test('I spent the bank holiday at the funfair. --> I spent the public holiday at the carnival.', done => {
      const input = 'I spent the bank holiday at the funfair.';
      const output = 'I spent the public holiday at the carnival.';
      const translation = Translator.translateBritishToAmerican(input);
      assert.equal(translation, output)
      done();
    });

    test('I had a bicky then went to the chippy. --> I had a cookie then went to the fish-and-chip shop.', done => {
      const input = 'I had a bicky then went to the chippy.';
      const output = 'I had a cookie then went to the fish-and-chip shop.';
      const translation = Translator.translateBritishToAmerican(input);
      assert.equal(translation, output)
      done();
    });

    test("I've just got bits and bobs in my bum bag. --> I've just got odds and ends in my fanny pack.", done => {
      const input = "I've just got bits and bobs in my bum bag.";
      const output = "I've just got odds and ends in my fanny pack.";
      const translation = Translator.translateBritishToAmerican(input);
      assert.equal(translation, output)
      done();
    });
    
    test("The car boot sale at Boxted Airfield was called off. --> The swap meet at Boxted Airfield was called off.", done => {
      const input = "The car boot sale at Boxted Airfield was called off.";
      const output = "The swap meet at Boxted Airfield was called off.";
      const translation = Translator.translateBritishToAmerican(input);
      assert.equal(translation, output)
      done();
    });

    test("Have you met Mrs Kalyani? --> Have you met Mrs. Kalyani?", done => {
      const input = "Have you met Mrs Kalyani?";
      const output = "Have you met Mrs. Kalyani?";
      const translation = Translator.translateBritishToAmerican(input);
      assert.equal(translation, output)
      done();
    });

    test("Prof Joyner of King's College, London. --> Prof. Joyner of King's College, London.", done => {
      const input = "Prof Joyner of King's College, London.";
      const output = "Prof. Joyner of King's College, London.";
      const translation = Translator.translateBritishToAmerican(input);
      assert.equal(translation, output)
      done();
    });

    test('Tea time is usually around 4 or 4.30. --> Tea time is usually around 4 or 4:30.', done => {
      const input = 'Tea time is usually around 4 or 4.30 today.';
      const output = 'Tea time is usually around 4 or 4:30 today.';
      const translation = Translator.translateBritishToAmerican(input);
      assert.equal(translation, output)
      done();
    });

  });

  suite('Highlight Translated Text', () => { 
    suite('Highlight American to British English', () => {
      test('Highlight "Mangoes" in the "Mangoes are my favorite fruit." translation', done => {
        const input = 'Mangoes are my favorite fruit.';
        const output = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
      const translation = Translator.translateAmericanToBritish(input, true);
      assert.equal(translation, output)
      done();
      });

      test('Highlight "yoghurt" in the "I ate yogurt for breakfast." translation', done => {
        const input = 'I ate yogurt for breakfast.';
        const output = 'I ate <span class="highlight">yoghurt</span> for breakfast.';
      const translation = Translator.translateAmericanToBritish(input, true);
      assert.equal(translation, output)
      done();
      });
    });

    suite('Highlight British to American English', () => {
      test('Highlight "soccer" in the "We watched the footie match for a while." translation', done => {
        const input = 'We watched the footie match for a while.';
        const output = 'We watched the <span class="highlight">soccer</span> match for a while.';
      const translation = Translator.translateBritishToAmerican(input, true);
      assert.equal(translation, output)
      done();
      });

      test('Highlight "Paracetamol" in the "Paracetamol takes up to an hour to work." translation"', done => {
        const input = 'Paracetamol takes up to an hour to work.';
        const output = '<span class="highlight">Tylenol</span> takes up to an hour to work.';
      const translation = Translator.translateBritishToAmerican(input, true);
      assert.equal(translation, output)
      done();
      });
    });
  });
});
