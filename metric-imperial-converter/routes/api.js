/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      var initNum = Number(convertHandler.getNum(input));
      var initUnit = convertHandler.getUnit(input);
      let unitInvalid=initUnit.match(/invalid/);
      let noUnit=initUnit.match(/no/);
    
      if (typeof(initNum)!='number' || !initNum) {
        if (unitInvalid) return res.status(400).json({error:'invalid number and unit'})
        return res.status(400).json({error:'invalid number'})
      } else if (unitInvalid) return res.status(400).json({error:'invalid unit'})
      else if (noUnit) return res.status(400).json({error:'no unit'});

      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      return res.json({initNum,initUnit,returnNum,returnUnit,string:toString})
    });

};
