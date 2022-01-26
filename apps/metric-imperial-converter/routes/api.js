/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);

      // Check for invalid inputs
      if(!initNum || !initUnit) {
        if(!initUnit && initNum) {
          return res.send("invalid unit")
        } else if(!initNum && initUnit) {
          return res.send("invalid number")
        }
        return res.send('invalid number and unit')
      }


      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      res.json({ initNum, initUnit, returnNum, returnUnit, string: toString});
    });
    
};
