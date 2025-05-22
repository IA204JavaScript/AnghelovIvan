import { generateId } from './utils.js';
import { addTransactionToList, removeTransactionById, transactions } from './transactions.js';
import { renderTransaction, removeRowById, showFullDescription, updateTotal } from './ui.js';

document.getElementById('transaction-form').addEventListener('submit', e => {
  e.preventDefault();

  const description = document.getElementById('description').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;

  if (!description || isNaN(amount)) return alert('Введите корректные данные');

  const transaction = {
    id: generateId(),
    date: new Date(),
    amount,
    category,
    description,
  };

  addTransactionToList(transaction);
  renderTransaction(transaction);
  calculateTotal();

  e.target.reset();
});

export function calculateTotal() {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  updateTotal(total);
}

document.querySelector('#transaction-table').addEventListener('click', e => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.closest('tr').dataset.id;
    removeTransactionById(id);
    removeRowById(id);
    calculateTotal();
  } else if (e.target.closest('tr')) {
    const id = e.target.closest('tr').dataset.id;
    const tx = transactions.find(t => t.id === id);
    if (tx) showFullDescription(tx.description);
  }
});
