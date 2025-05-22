// main.js

/**
 * @typedef {Object} Transaction
 * @property {string} transaction_id
 * @property {string} transaction_date - В формате YYYY-MM-DD
 * @property {number} transaction_amount
 * @property {'debit'|'credit'} transaction_type
 * @property {string} transaction_description
 * @property {string} merchant_name
 * @property {'debit'|'credit'} card_type
 */

// === Шаг 1. Пример массива транзакций ===

const transactions = [
  {
    transaction_id: 't1',
    transaction_date: '2025-05-01',
    transaction_amount: 100,
    transaction_type: 'debit',
    transaction_description: 'Grocery shopping',
    merchant_name: 'Supermarket A',
    card_type: 'debit'
  },
  {
    transaction_id: 't2',
    transaction_date: '2025-05-02',
    transaction_amount: 250,
    transaction_type: 'credit',
    transaction_description: 'Online subscription',
    merchant_name: 'Netflix',
    card_type: 'credit'
  },
  {
    transaction_id: 't3',
    transaction_date: '2025-04-28',
    transaction_amount: 300,
    transaction_type: 'debit',
    transaction_description: 'Electronics',
    merchant_name: 'Tech Store',
    card_type: 'debit'
  },
  {
    transaction_id: 't4',
    transaction_date: '2025-05-01',
    transaction_amount: 150,
    transaction_type: 'debit',
    transaction_description: 'Lunch',
    merchant_name: 'Cafe B',
    card_type: 'debit'
  }
];

// === Шаг 2. Реализация функций ===

/**
 * @param {Transaction[]} transactions
 * @returns {string[]}
 */
function getUniqueTransactionTypes(transactions) {
  return [...new Set(transactions.map(t => t.transaction_type))];
}

/**
 * @param {Transaction[]} transactions
 * @returns {number}
 */
function calculateTotalAmount(transactions) {
  return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
}

/**
 * @param {Transaction[]} transactions
 * @param {string} type
 * @returns {Transaction[]}
 */
function getTransactionByType(transactions, type) {
  return transactions.filter(t => t.transaction_type === type);
}

/**
 * @param {Transaction[]} transactions
 * @param {string} startDate
 * @param {string} endDate
 * @returns {Transaction[]}
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
  return transactions.filter(t =>
    t.transaction_date >= startDate && t.transaction_date <= endDate
  );
}

/**
 * @param {Transaction[]} transactions
 * @param {string} merchantName
 * @returns {Transaction[]}
 */
function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter(t => t.merchant_name === merchantName);
}

/**
 * @param {Transaction[]} transactions
 * @returns {number}
 */
function calculateAverageTransactionAmount(transactions) {
  if (transactions.length === 0) return 0;
  return calculateTotalAmount(transactions) / transactions.length;
}

/**
 * @param {Transaction[]} transactions
 * @param {number} min
 * @param {number} max
 * @returns {Transaction[]}
 */
function getTransactionsByAmountRange(transactions, min, max) {
  return transactions.filter(t => t.transaction_amount >= min && t.transaction_amount <= max);
}

/**
 * @param {Transaction[]} transactions
 * @returns {number}
 */
function calculateTotalDebitAmount(transactions) {
  return transactions
    .filter(t => t.transaction_type === 'debit')
    .reduce((sum, t) => sum + t.transaction_amount, 0);
}

/**
 * @param {Transaction[]} transactions
 * @returns {string} - формат YYYY-MM
 */
function findMostTransactionsMonth(transactions) {
  const freq = {};
  for (const t of transactions) {
    const month = t.transaction_date.slice(0, 7);
    freq[month] = (freq[month] || 0) + 1;
  }
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
}

/**
 * @param {Transaction[]} transactions
 * @returns {string} - формат YYYY-MM
 */
function findMostDebitTransactionMonth(transactions) {
  const freq = {};
  for (const t of transactions) {
    if (t.transaction_type === 'debit') {
      const month = t.transaction_date.slice(0, 7);
      freq[month] = (freq[month] || 0) + 1;
    }
  }
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
}

/**
 * @param {Transaction[]} transactions
 * @returns {'debit' | 'credit' | 'equal'}
 */
function mostTransactionTypes(transactions) {
  const debitCount = transactions.filter(t => t.transaction_type === 'debit').length;
  const creditCount = transactions.filter(t => t.transaction_type === 'credit').length;
  if (debitCount > creditCount) return 'debit';
  if (creditCount > debitCount) return 'credit';
  return 'equal';
}

/**
 * @param {Transaction[]} transactions
 * @param {string} date
 * @returns {Transaction[]}
 */
function getTransactionsBeforeDate(transactions, date) {
  return transactions.filter(t => t.transaction_date < date);
}

/**
 * @param {Transaction[]} transactions
 * @param {string} id
 * @returns {Transaction | undefined}
 */
function findTransactionById(transactions, id) {
  return transactions.find(t => t.transaction_id === id);
}

/**
 * @param {Transaction[]} transactions
 * @returns {string[]}
 */
function mapTransactionDescriptions(transactions) {
  return transactions.map(t => t.transaction_description);
}

/**
 * @param {Transaction[]} transactions
 * @param {number} [year]
 * @param {number} [month]
 * @param {number} [day]
 * @returns {number}
 */
function calculateTotalAmountByDate(transactions, year, month, day) {
  return transactions
    .filter(t => {
      const [y, m, d] = t.transaction_date.split('-').map(Number);
      return (!year || y === year) &&
             (!month || m === month) &&
             (!day || d === day);
    })
    .reduce((sum, t) => sum + t.transaction_amount, 0);
}

// === Шаг 3. Тестирование ===

console.log('Уникальные типы транзакций:', getUniqueTransactionTypes(transactions));
console.log('Общая сумма транзакций:', calculateTotalAmount(transactions));
console.log('Среднее значение:', calculateAverageTransactionAmount(transactions));
console.log('Сумма дебетовых:', calculateTotalDebitAmount(transactions));
console.log('Транзакции по типу (debit):', getTransactionByType(transactions, 'debit'));
console.log('Транзакции по диапазону дат:', getTransactionsInDateRange(transactions, '2025-04-01', '2025-04-30'));
console.log('Транзакции по магазину Netflix:', getTransactionsByMerchant(transactions, 'Netflix'));
console.log('Поиск по ID t2:', findTransactionById(transactions, 't2'));
console.log('Описания транзакций:', mapTransactionDescriptions(transactions));
console.log('Месяц с макс. кол-вом транзакций:', findMostTransactionsMonth(transactions));
console.log('Месяц с макс. дебет. транзакциями:', findMostDebitTransactionMonth(transactions));
console.log('Преобладающий тип транзакций:', mostTransactionTypes(transactions));
console.log('Транзакции до 2025-05-01:', getTransactionsBeforeDate(transactions, '2025-05-01'));
console.log('Сумма транзакций за 2025-05-01:', calculateTotalAmountByDate(transactions, 2025, 5, 1));

// === Проверка на пустом массиве ===
console.log('\nТест на пустом массиве:');
console.log('Среднее:', calculateAverageTransactionAmount([]));
console.log('Типы:', getUniqueTransactionTypes([]));

// === Проверка на массиве с одной транзакцией ===
const single = [transactions[0]];
console.log('\nТест на одной транзакции:');
console.log('Среднее:', calculateAverageTransactionAmount(single));
console.log('Типы:', getUniqueTransactionTypes(single));
