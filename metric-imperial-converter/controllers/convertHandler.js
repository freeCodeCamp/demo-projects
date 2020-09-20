/*
*
*
*       Complete the handler logic below
*
*
*/

const math = require('mathjs');

function ConvertHandler() {

  this.getNum = function(input) {
    if (!input) return 'invalid number and unit'
    const numReg = /[\d./]+/g;
    // Input has no number, only a unit
    if (input.match(numReg) === null) return 1;
    
    // Strip input of valid/invalid units
    const unitRegex = /([^\d]+$)/;
    const numOrEq = input.replace(unitRegex, '');
    // console.log(input);
    
    const letterRegex=/[a-zA-Z]+/;
    // Input is something like '1a3lbs' or 'a4gal'
    if (numOrEq.match(letterRegex)) return 'invalid number';
    
    const result = math.evaluate(numOrEq);
    
    return result.toFixed(5);
  };

  this.getUnit = function(input) {
    if (!input) return 'invalid number and unit'
    const allowedUnits=['gal','l','mi','km','lbs','kg','L'];
    var result;
    let unitReg=/[a-zA-Z]+$/
    result=input.match(unitReg)
    if (!result) return 'no unit'
    let unit=result[0].toLowerCase();
    if (allowedUnits.indexOf(unit)===-1){
      return 'invalid unit'
    }
    return unit;
  };

  this.getReturnUnit = function(initUnit) {

    const unitMappings={
      'gal':'l',
      'l':'gal',
      'lbs':'kg',
      'kg':'lbs',
      'mi':'km',
      'km':'mi'
    }
    return unitMappings[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    const spellMappings={
      'gal':'gallons',
      'l':'liters',
      'lbs':'pounds',
      'kg':'kilograms',
      'mi':'miles',
      'km':'kilometers'
    }
    return spellMappings[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    switch (this.getUnit(initUnit)){
      case 'gal':
        result=initNum*galToL;
        break;
      case 'l':
        result=initNum/galToL;
        break;
      case 'lbs':
        result=initNum*lbsToKg;
        break;
      case 'kg':
        result=initNum/lbsToKg;
        break;
      case 'mi':
        result=initNum*miToKm;
        break;
      case 'km':
        result=initNum/miToKm;
        break;
    }

    return Number(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    result=`${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    return result;
  };

}

module.exports = ConvertHandler;
