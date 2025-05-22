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
