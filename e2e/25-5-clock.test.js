const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const portMap = require('../port-map.json');

const name = fs
  .readdirSync(path.join(__dirname, '../apps'))
  .filter(name => name === '25--5--clock')[0];

const portNum = portMap[name];

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(`http://localhost:${portNum}`);
  global.document = await page.evaluate(() => document);
  // Do something before any test suites start
});

test.describe('#Content', () => {
  test('I can see an element with id="break-label" that contains a string (e.g. "Break Length").', async ({
    page
  }) => {
    const breakTitle = await page.$('#break-label');
    expect((await breakTitle?.innerText())?.length).toBeGreaterThan(0);
  });

  test('I can see an element with id="session-label" that contains a string (e.g. "Session Length").', async ({
    page
  }) => {
    const sessionTitle = await page.$('#session-label');
    expect((await sessionTitle?.innerText())?.length).toBeGreaterThan(0);
  });

  test('I can see two clickable elements with corresponding IDs: id="break-decrement" and id="session-decrement".', async ({
    page
  }) => {
    expect(await page.$('#break-decrement')).toBeDefined();
    expect(await page.$('#session-decrement')).toBeDefined();
  });

  test('I can see two clickable elements with corresponding IDs: id="break-increment" and id="session-increment".', async ({
    page
  }) => {
    expect(await page.$('#break-increment')).toBeDefined();
    expect(await page.$('#session-increment')).toBeDefined();
  });

  test('I can see an element with a corresponding id="timer-label", that contains a string indicating a session is initialized (e.g. "Session")', async ({
    page
  }) => {
    const timerLabel = await page.$('#timer-label');
    expect((await timerLabel?.innerText())?.length).toBeGreaterThan(0);
  });
});
