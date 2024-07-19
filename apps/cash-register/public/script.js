let price = 3.26;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const displayChangeDue = document.getElementById('change-due');
const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const priceScreen = document.getElementById('price-screen');
const cashDrawerDisplay = document.getElementById('cash-drawer-display');

const formatResults = (status, change) => {
  displayChangeDue.innerHTML = `<p>Status: ${status}</p>`;
  displayChangeDue.innerHTML += change
    .map(
      ([denominationName, amount]) => `<p>${denominationName}: $${amount}</p>`
    )
    .join('');
};

const checkCashRegister = () => {
  const cashInCents = Math.round(Number(cash.value) * 100);
  const priceInCents = Math.round(price * 100);
  if (cashInCents < priceInCents) {
    alert('Customer does not have enough money to purchase the item');
    cash.value = '';
    return;
  }

  if (cashInCents === priceInCents) {
    displayChangeDue.innerHTML =
      '<p>No change due - customer paid with exact cash</p>';
    cash.value = '';
    return;
  }

  let changeDue = cashInCents - priceInCents;
  const reversedCid = [...cid]
    .reverse()
    .map(([denominationName, amount]) => [
      denominationName,
      Math.round(amount * 100)
    ]);
  const denominations = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
  const result = { status: 'OPEN', change: [] };
  const totalCID = reversedCid.reduce((prev, [_, amount]) => prev + amount, 0);

  if (totalCID < changeDue) {
    displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
    return;
  }

  if (totalCID === changeDue) {
    result.status = 'CLOSED';
  }

  for (let i = 0; i <= reversedCid.length; i++) {
    if (changeDue >= denominations[i] && changeDue > 0) {
      const [denominationName, total] = reversedCid[i];
      const possibleChange = Math.min(total, changeDue);
      const count = Math.floor(possibleChange / denominations[i]);
      const amountInChange = count * denominations[i];
      changeDue -= amountInChange;

      if (count > 0) {
        result.change.push([denominationName, amountInChange / 100]);
      }
    }
  }
  if (changeDue > 0) {
    displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
    return;
  }

  formatResults(result.status, result.change);
  updateUI(result.change);
};

const checkResults = () => {
  if (!cash.value) {
    return;
  }
  checkCashRegister();
};

const updateUI = change => {
  const currencyNameMap = {
    PENNY: 'Pennies',
    NICKEL: 'Nickels',
    DIME: 'Dimes',
    QUARTER: 'Quarters',
    ONE: 'Ones',
    FIVE: 'Fives',
    TEN: 'Tens',
    TWENTY: 'Twenties',
    'ONE HUNDRED': 'Hundreds'
  };
  // Update cid if change is passed in
  if (change) {
    change.forEach(([changeDenomination, changeAmount]) => {
      const targetArr = cid.find(
        ([denominationName]) => denominationName === changeDenomination
      );
      targetArr[1] =
        (Math.round(targetArr[1] * 100) - Math.round(changeAmount * 100)) / 100;
    });
  }

  cash.value = '';
  priceScreen.textContent = `Total: $${price}`;
  cashDrawerDisplay.innerHTML = `<p><strong>Change in drawer:</strong></p>
    ${cid
      .map(
        ([denominationName, amount]) =>
          `<p>${currencyNameMap[denominationName]}: $${amount}</p>`
      )
      .join('')}
  `;
};

purchaseBtn.addEventListener('click', checkResults);

cash.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    checkResults();
  }
});

updateUI();
