let price = 19.5;
let cid = [
  ['PENNY', 0.5],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
];

const displayChangeDue = document.getElementById('change-due');
const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');

const formatResults = (status, change) => {
  displayChangeDue.innerHTML = `Status: ${status}`;
  change.map(
    money => (displayChangeDue.innerHTML += `<p>${money[0]}: $${money[1]}</p>`)
  );
  return;
};

const checkCashRegister = () => {
  if (Number(cash.value) < price) {
    alert('Customer does not have enough money to purchase the item');
    cash.value = '';
    return;
  }

  if (Number(cash.value) === price) {
    displayChangeDue.innerHTML =
      'No change due - customer paid with exact cash';
    cash.value = '';
    return;
  }

  let changeDue = Number(cash.value) - price;
  let reversedCid = [...cid].reverse();
  let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  let result = { status: 'OPEN', change: [] };
  let totalCID = parseFloat(
    cid
      .map(total => total[1])
      .reduce((prev, curr) => prev + curr)
      .toFixed(2)
  );

  if (totalCID < changeDue) {
    return (displayChangeDue.innerHTML = 'Status: INSUFFICIENT_FUNDS');
  }

  if (totalCID === changeDue) {
    formatResults('CLOSED', cid);
  }

  for (let i = 0; i <= reversedCid.length; i++) {
    if (changeDue > denominations[i] && changeDue > 0) {
      let count = 0;
      let total = reversedCid[i][1];
      while (total > 0 && changeDue >= denominations[i]) {
        total -= denominations[i];
        changeDue = parseFloat((changeDue -= denominations[i]).toFixed(2));
        count++;
      }
      result.change.push([reversedCid[i][0], count * denominations[i]]);
    }
  }
  if (changeDue > 0) {
    return (displayChangeDue.innerHTML = 'Status: INSUFFICIENT_FUNDS');
  }

  formatResults(result.status, result.change);
  cash.value = '';
  return;
};

const checkResults = () => {
  if (!cash.value) {
    return;
  }
  checkCashRegister();
};

purchaseBtn.addEventListener('click', checkResults);
cash.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    checkResults();
  }
});
