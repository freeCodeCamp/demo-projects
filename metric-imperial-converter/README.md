# Metric Imperial Converter

## User stories:

1. I can `GET` `/api/convert` with a single parameter containing an accepted number and unit and have it converted. Hint: Split the input by looking for the index of the first character.
1. I can convert 'gal' to 'L' and vice versa. *(1 gal to 3.78541 L)*
1. I can convert 'lbs' to 'kg' and vice versa. *(1 lbs to 0.453592 kg)*
1. I can convert 'mi' to 'km' and vice versa. *(1 mi to 1.60934 km)*
1. If my unit of measurement is invalid, returned will be `'invalid unit'`.
1. If my number is invalid, returned with will `'invalid number'`.
1. If both are invalid, return will be `'invalid number and unit'`.
1. I can use fractions, decimals or both in my parameter (i.e. 5, 1/2, 2.5/6), but if nothing is provided it will default to 1.
1. My return will consist of the initNum, initUnit, returnNum, returnUnit, and string spelling out units in format `{initNum} {initial_Units} converts to {returnNum} {return_Units}` with the result rounded to 5 decimals.
1. All 16 unit tests are complete and passing.
1. All 5 functional tests are complete and passing.

## Example usage:

- `/api/convert?input=4gal`
- `/api/convert?input=1/2km`
- `/api/convert?input=5.4/3lbs`
- `/api/convert?input=kg`
      
## Example return:

```json
{
  "initNum": 3.1,
  "initUnit": "mi",
  "returnNum": 4.98895,
  "returnUnit": "km",
  "string": "3.1 miles converts to 4.98895 kilometers"
}
```

## Additional notes:

- Set `NODE_ENV` to `test` without quotes
- Most logic will need done in `controllers/convertHandler.js`, but do complete `routes/api.js`
- You will create all of the functional/unit tests in `tests/2_functional-tests.js` and `tests/1_unit-tests.js`
