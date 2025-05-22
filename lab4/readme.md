# Лабораторная работа №4. Работа с DOM-деревом и событиями в JavaScript

## Цель работы

Ознакомиться с основами взаимодействия JavaScript с DOM-деревом на примере веб-приложения для учёта личных финансов.

---

## Структура проекта

```

/project-root
├── index.html
├── style.css
└── /src
    ├── index.js
    ├── transactions.js
    ├── ui.js
    └── utils.js

```

---

index.html

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <title>Учёт Личных Финансов</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h1>Учёт Транзакций</h1>

  <form id="transaction-form">
    <input type="text" id="description" placeholder="Описание" required />
    <input type="number" id="amount" placeholder="Сумма" required />
    <select id="category">
      <option value="Доход">Доход</option>
      <option value="Расход">Расход</option>
    </select>
    <button type="submit">Добавить</button>
  </form>

  <h3>Общая сумма: <span id="total">0</span>₽</h3>

  <table id="transaction-table" border="1">
    <thead>
      <tr>
        <th>Дата и Время</th>
        <th>Категория</th>
        <th>Описание</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

  <div id="full-description"></div>

  <script type="module" src="./src/index.js"></script>
</body>
</html>
```


🔹 src/utils.js
```js
/** Генерация уникального ID */
export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

/** Форматирование даты */
export function formatDate(date) {
  return new Date(date).toLocaleString('ru-RU');
}
```
🔹 src/transactions.js
```js
export const transactions = [];

/**
 * Добавить транзакцию
 * @param {Object} transaction - объект транзакции
 */
export function addTransactionToList(transaction) {
  transactions.push(transaction);
}

/**
 * Удалить транзакцию по ID
 * @param {string} id - идентификатор транзакции
 */
export function removeTransactionById(id) {
  const index = transactions.findIndex(t => t.id === id);
  if (index !== -1) transactions.splice(index, 1);
}
```
🔹 src/ui.js
```js
import { formatDate } from './utils.js';
import { removeTransactionById } from './transactions.js';
import { calculateTotal } from './index.js';

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
```
🔹 src/index.js
```js
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

/**
 * Подсчёт общей суммы транзакций
 */
export function calculateTotal() {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  updateTotal(total);
}

// Делегирование событий
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
```

---
## Функционал

Данное веб-приложение реализует базовую систему учёта личных финансов. Основные возможности и логика работы:

### 1. Добавление транзакции
Пользователь может добавить новую финансовую операцию через форму, содержащую следующие поля:
- Описание — текстовое поле для ввода пояснения к операции.
- Сумма — числовое поле (может быть как положительным, так и отрицательным значением).
- Категория — выпадающий список с вариантами: «Доход» и «Расход».

После нажатия кнопки "Добавить":
- создаётся объект транзакции с уникальным ID и текущей датой/временем;
- транзакция добавляется в массив всех операций (transactions);
- вызывается функция отображения в таблице.

### 2. Отображение в таблице
Все транзакции выводятся в таблицу, где каждая строка содержит:
- Дата и время — автоматически устанавливается при добавлении;
- Категория — выбранная пользователем категория;
- Краткое описание — первые 4 слова из полного описания;
- Кнопка удаления — для удаления конкретной транзакции.

Цвет строки:
- Зеленый, если сумма положительная (доход);
- Красный, если сумма отрицательная (расход).

### 3. Подсчёт общей суммы
После каждой операции (добавления или удаления транзакции) автоматически пересчитывается и отображается общая сумма всех транзакций:
- Складываются все значения amount в массиве transactions.
- Результат отображается в отдельном блоке на странице.

### 4. Удаление транзакции
Каждая строка в таблице содержит кнопку «Удалить». При её нажатии:
- Определяется ID выбранной транзакции;
- Транзакция удаляется из массива transactions;
- Строка удаляется из DOM (таблицы);
- Повторно вызывается функция подсчёта общей суммы.

Для этого используется делегирование событий — обработчик навешивается на всю таблицу, а не на каждую кнопку отдельно.

### 5. Просмотр полного описания
Если пользователь кликает на строку с транзакцией (не по кнопке удаления):
- отображается полный текст описания в отдельном блоке под таблицей;
- помогает увидеть детали, если описание обрезано в таблице.

### 6. Валидация данных
Перед добавлением транзакции проводится базовая валидация:
- Проверка на пустое описание;
- Проверка, что сумма является числом;
- Если данные некорректны — отображается сообщение об ошибке, добавление не происходит.

## Контрольные вопросы

1. Как получить доступ к элементу на веб-странице с помощью JavaScript?
   Через document.getElementById, querySelector, getElementsByClassName и т.д.
2. Что такое делегирование событий? Почему оно эффективно?
  Техника, когда обработчик события добавляется на родительский элемент, а события отлавливаются через e.target. Эффективно при динамически создаваемых элементах.
3. Как изменить содержимое элемента DOM?
     Используя .textContent, .innerHTML, .value и другие свойства DOM.
4. Как добавить новый элемент в DOM дерево?
      Создаём элемент через document.createElement(), заполняем его и добавляем с appendChild() или insertBefore().
