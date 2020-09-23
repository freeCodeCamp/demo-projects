# Stock Price Checker

## User stories:

1. Set the content security policies to only allow loading of scripts and CSS from your server.
1. I can `GET` `/api/stock-prices` with form data containing a Nasdaq `stock` ticker and receive back an object `stockData`.
1. In `stockData`, I can see the `stock` (the ticker as a string), `price` (decimal in string format), and `likes` (int).
1. I can also pass along the field `like` as `true` (boolean) to have my like added to the stock(s). Only 1 like per IP should be accepted.
1. If I pass along 2 stocks, the return object will be an array with information about both stocks. Instead of `likes`, it will display `rel_likes` (the difference between the likes) on both.
1. A good way to receive current prices is through our stock price proxy (replacing 'GOOG' with your stock symbol): `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/GOOG/quote`
1. All 5 functional tests are complete and passing.

## Example usage:

- `/api/stock-prices?stock=GOOG`
- `/api/stock-prices?stock=GOOG&amp;like=true`
- `/api/stock-prices?stock=GOOG&amp;stock=MSFT`
- `/api/stock-prices?stock=GOOG&amp;stock=MSFT&amp;like=true`

## Example return:

- `{ "stockData": { "stock": "GOOG", "price": "786.90", "likes": 1 } }`
- `{ "stockData": [{"stock": "MSFT", "price": "62.30", "rel_likes": -1 }, { "stock": "GOOG", "price": "786.90", "rel_likes": 1 }] }`

## Additional notes:

- SET NODE_ENV to `test` without quotes and set DB to your Mongo connection string
- You will add any security features to `server.js`
- You will create all of the functional/unit tests in `tests/2_functional-tests.js` and `tests/1_unit-tests.js`

