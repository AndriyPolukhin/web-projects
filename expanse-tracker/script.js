const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 2200 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Course', amount: -150 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// * @fn: to Generate an Id
const generateId = () => {
  return Math.floor(Math.random() * 1000000);
};

// * @fn: Add transactions to DOM List
const addTransactionDOM = (transaction) => {
  // * Get Sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // * Add class based on the value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>`;

  list.appendChild(item);
};

// * @fn: UPdate the balance, inccome and expence
const updateValues = () => {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expence = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expence}`;
};

// * @fn: Add a transaction
const addTransaction = (e) => {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
};

// * @fn: remove the transaction
const removeTransaction = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();
  init();
};

// * @fn: update the localStorage
const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

// * Init app
const init = () => {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
};

init();

// * Add EventListeners
form.addEventListener('submit', addTransaction);
