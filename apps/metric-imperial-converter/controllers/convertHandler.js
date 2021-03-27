/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;

  const units = {
    'gal': {
      convert_to: 'L',
      factor: galToL,
      name: 'gallons'
    },
    'l': {
      convert_to: 'gal',
      factor: 1/galToL,
      name: 'liters'
    },
    'L': {
      convert_to: 'gal',
      factor: 1/galToL,
      name: 'liters'
    },
    'mi': {
      convert_to: 'km',
      factor: miToKm,
      name: 'miles'
    },
    'km': {
      convert_to: 'mi',
      factor: 1/miToKm,
      name: 'kilometers'
    },
    'lbs': {
      convert_to: 'kg',
      factor: lbsToKg,
      name: 'pounds'
    },
    'kg': {
      convert_to: 'lbs',
      factor: 1/lbsToKg,
      name: 'kilograms'
    }};

  // Takes a string in, gives a true/false out
  this.numberChecker= function (num){
    // Check for non-digits and non-periods
    if(num.match(/[^0-9.]/gi)) {
      return false;
    }

    // Check for doubled periods
    let result = num.match(/\./gi);
    return !(result && result.length > 1);
  }

  let re_units = /(?<=^|[^a-z])([a-z]+)$/ig
  this.getNum = function(input) {
    // get and remove units
    let noUnits = input.replace(re_units,'')

    // No number passed
    if(noUnits.length === 0) {
      return 1;
    }

    // Check for division
    // Valid division is a slash with a number
    // before and after
    let parts = noUnits.split(/(?<=\d)\/(?=\d)/ig);
    if(parts.length === 2) {
      if(!this.numberChecker(parts[0]) || !this.numberChecker(parts[1])) {
        return null;
      }
      // Division Present
      try {
        let numerator = parseFloat(parts[0]);
        let denominator = parseFloat(parts[1]);

        // Catch divide by zero
        if(denominator === 0) {
          return null;
        }
        return numerator/denominator;
      } catch(e) {
        return null;
      }
    } else {
      if(this.numberChecker(noUnits)) {
        try {
          return parseFloat(noUnits)
        } catch(e) {
          return null;
        }
      }
      return null;
    }
  };

  this.getUnit = function(input) {
    let match = input.match(re_units);

    if(match) {
      let unit = match[0].toLowerCase();
      // No unit has length greater than 3
      if(unit.length > 3) {
        return null;
      }

      // If unit exists, return it
      if(units.hasOwnProperty(unit)) {
        if(unit === "l") {
          return "L";
        }
        return unit;
      }
    }

    // Fall-though is invalid unit
    return null;
  };

  this.getReturnUnit = function(initUnit) {
    return units[initUnit].convert_to;
  };

  this.spellOutUnit = function(unit) {
    return units[unit].name;
  };

  this.convert = function(initNum, initUnit) {
    // After converting, round to 5 digits
    return parseFloat(( initNum * units[initUnit].factor).toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

    return `${initNum} ${units[initUnit.toLowerCase()].name} ` +
      `converts to ${returnNum.toFixed(5)} ${units[returnUnit].name}`;
  };

}

module.exports = ConvertHandler;
