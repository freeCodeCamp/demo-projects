const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const portMap = require('../port-map.json');

const name = fs
  .readdirSync(path.join(__dirname, '../apps'))
  .filter(name => name === 'cash-register')[0];

const portNum = portMap[name];

test('has title', async ({ page }) => {
  await page.goto(`http://localhost:${portNum}`);
  await expect(page).toHaveTitle(/Cash Register/);
});
