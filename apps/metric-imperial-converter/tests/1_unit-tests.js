/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  suite('Function convertHandler.getNum(input)', function() {

    test('Whole number input', function(done) {
      let input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      input = '1060934km';
      assert.equal(convertHandler.getNum(input), 1060934);
      input = '00123lbs';
      assert.equal(convertHandler.getNum(input), 123);
      done();
    });

    test('Decimal Input', function(done) {
      let input = "4.3km";
      assert.equal(convertHandler.getNum(input), 4.3);
      done();
    });

    test('Fractional Input', function(done) {
      let input = "3/4mi";
      assert.equal(convertHandler.getNum(input), 3/4);
      input = "3/0km";
      assert.isNull(convertHandler.getNum(input), "Divide by zero should return null");
      input = "1/3lbs";
      assert.equal(convertHandler.getNum(input), 1/3);
      done();
    });

    test('Fractional Input w/ Decimal', function(done) {
      let input = "1.5/3lbs";
      assert.equal(convertHandler.getNum(input), 0.5);
      input = "9.9/1.1in";
      assert.equal(convertHandler.getNum(input), 9);
      input = "8/1.4lbs";
      assert.equal(convertHandler.getNum(input), 8/1.4);
      input = "3.2/0km";
      assert.isNull(convertHandler.getNum(input), "Divide by zero should return null");
      done();
    });

    test('Invalid Input (double fraction)', function(done) {
      let input = "1/2/3lbs";
      assert.isNull(convertHandler.getNum(input), "Double fractions should return null");
      input = "1//3lbs";
      assert.isNull(convertHandler.getNum(input), "Double divide sign should return null");
      done();
    });

    test('No Numerical Input', function(done) {
      let input = "lbs";
      assert.equal(convertHandler.getNum(input), 1);
      input = "lbs";
      assert.equal(convertHandler.getNum(input), 1);
      input = "km";
      assert.equal(convertHandler.getNum(input), 1);
      input = "lbs";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });

  });

  suite('Function convertHandler.getUnit(input)', function() {

    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      let output = ['gal','L','mi','km','lbs','kg','gal','L','mi','km','lbs','kg'];
      input.forEach(function(ele,index) {
        assert.equal(convertHandler.getUnit(1 + ele), output[index])
      });
      done();
    });

    test('Unknown Unit Input', function(done) {
      assert.isNull(convertHandler.getUnit('123kgm'));
      assert.isNull(convertHandler.getUnit('123kmg'));
      assert.isNull(convertHandler.getUnit('123lkg'));
      assert.isNull(convertHandler.getUnit('123lb'));
      assert.isNull(convertHandler.getUnit('123k'));
      done();
    });

  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function() {

    test('For Each Valid Unit Inputs', function(done) {
      let input =  ['gal','l'  ,'L',   'mi', 'km', 'lbs','kg'];
      let expect = ['L'  ,'gal','gal', 'km', 'mi', 'kg' ,'lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });

  });

  suite('Function convertHandler.spellOutUnit(unit)', function() {

    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal','l','mi','km','lbs','kg'];
      let expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });

  });

  suite('Function convertHandler.convert(num, unit)', function() {

    test('Gal to L', function(done) {
      let input = [5, 'gal'];
      let expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });

    test('L to Gal', function(done) {
      let input = [5, 'l'];
      let expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });

    test('Mi to Km', function(done) {
      let input = [5, 'mi'];
      let expected = 8.04672;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });

    test('Km to Mi', function(done) {
      let input = [5, 'km'];
      let expected = 3.10686;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });

    test('Lbs to Kg', function(done) {
      let input = [5, 'lbs'];
      let expected = 2.26796;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });

    test('Kg to Lbs', function(done) {
      let input = [5, 'kg'];
      let expected = 11.0231;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });

  });

});