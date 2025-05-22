import { formatDate } from './utils.js';

/**
 * Добавить транзакцию в DOM таблицу
 * @param {Object} transaction - объект транзакции
 */
export function renderTransaction(transaction) {
  const tbody = document.querySelector('#transaction-table tbody');
  const row = document.createElement('tr');
  row.dataset.id = transaction.id;

  row.innerHTML = `
    <td>${formatDate(transaction.date)}</td>
    <td>${transaction.category}</td>
    <td>${transaction.description.split(' ').slice(0, 4).join(' ')}</td>
    <td><button class="delete-btn">Удалить</button></td>
  `;

  row.style.color = transaction.amount >= 0 ? 'green' : 'red';
  tbody.appendChild(row);
}

/**
 * Удалить строку из DOM по ID
 * @param {string} id 
 */
export function removeRowById(id) {
  const row = document.querySelector(`[data-id="${id}"]`);
  if (row) row.remove();
}

/**
 * Отобразить полное описание
 * @param {string} fullText 
 */
export function showFullDescription(fullText) {
  document.getElementById('full-description').textContent = fullText;
}

/**
 * Обновить общую сумму
 * @param {number} total 
 */
export function updateTotal(total) {
  document.getElementById('total').textContent = total;
}
