export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export function formatDate(date) {
  return new Date(date).toLocaleString('ru-RU');
}
