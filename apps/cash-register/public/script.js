// Do not change code below this line
const cid = [
  ['Penny', 1.01],
  ['Nickel', 2.05],
  ['Dime', 3.1],
  ['Quarter', 4.25],
  ['One', 90],
  ['Five', 55],
  ['Ten', 20],
  ['Twenty', 60],
  ['One hundred', 100]
];
// Do not change code above this line

const message = document.getElementById('message');
const displayChangeDue = document.getElementById('change-due');
const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const newItemBtn = document.getElementById('new-btn');
let newItemPrice = 4.23;

const getNewPrice = () => {
  displayChangeDue.innerHTML = '';
  cash.value = '';
  newItemPrice = Number((Math.random() * 200 + 1).toFixed(2));
  message.innerHTML = `Total: $${newItemPrice}`;
};

const formatResults = (status, change) => {
  displayChangeDue.innerHTML = `Status: ${status}`;
  change.map(
    money => (displayChangeDue.innerHTML += `<p>${money[0]}: $${money[1]}</p>`)
  );
  return;
};

const checkCashRegister = () => {
  if (Number(cash.value) < newItemPrice) {
    alert('Customer does not have enough money to purchase item');
    cash.value = '';
    return;
  }

  if (Number(cash.value) === newItemPrice) {
    displayChangeDue.innerHTML = 'No change due. Customer paid with exact cash';
    cash.value = '';
    return;
  }

  let changeDue = Number(cash.value) - newItemPrice;
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

newItemBtn.addEventListener('click', getNewPrice);
