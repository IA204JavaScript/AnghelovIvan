/**
 * @class Item
 * Представляет базовый предмет в инвентаре.
 */
class Item {
  /**
   * @param {string} name - Название предмета.
   * @param {number} weight - Вес предмета.
   * @param {string} rarity - Редкость (common, uncommon, rare, legendary).
   */
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  /**
   * Возвращает информацию о предмете.
   * @returns {string}
   */
  getInfo() {
    return `Item: ${this.name}, Weight: ${this.weight}kg, Rarity: ${this.rarity}`;
  }

  /**
   * Устанавливает новый вес предмета.
   * @param {number} newWeight
   */
  setWeight(newWeight) {
    this.weight = newWeight;
  }
}

/**
 * @class Weapon
 * Наследуется от Item, представляет оружие.
 */
class Weapon extends Item {
  /**
   * @param {string} name
   * @param {number} weight
   * @param {string} rarity
   * @param {number} damage - Урон.
   * @param {number} durability - Прочность от 0 до 100.
   */
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }

  /**
   * Использует оружие (уменьшает прочность).
   */
  use() {
    if (this.durability > 0) {
      this.durability -= 10;
      console.log(`${this.name} used. Durability now: ${this.durability}`);
    } else {
      console.log(`${this.name} is broken and cannot be used.`);
    }
  }

  /**
   * Ремонтирует оружие (устанавливает прочность на 100).
   */
  repair() {
    this.durability = 100;
    console.log(`${this.name} repaired to full durability.`);
  }

  /**
   * Переопределяет getInfo() для включения урона и прочности.
   * @returns {string}
   */
  getInfo() {
    return `${super.getInfo()}, Damage: ${this.damage}, Durability: ${this.durability}`;
  }
}

// === Тестирование классов ===
const potion = new Item("Health Potion", 0.5, "common");
console.log(potion.getInfo());
potion.setWeight(0.6);
console.log(potion.getInfo());

const sword = new Weapon("Iron Sword", 4.5, "rare", 30, 90);
console.log(sword.getInfo());
sword.use();
sword.use();
console.log(`Durability after uses: ${sword.durability}`);
sword.repair();
console.log(`Durability after repair: ${sword.durability}`);

// === Доп. задание: функции-конструкторы ===

/**
 * Функция-конструктор для Item
 * @constructor
 */
function ItemConstructor(name, weight, rarity) {
  this.name = name;
  this.weight = weight;
  this.rarity = rarity;
}

ItemConstructor.prototype.getInfo = function () {
  return `Item: ${this.name}, Weight: ${this.weight}kg, Rarity: ${this.rarity}`;
};

ItemConstructor.prototype.setWeight = function (newWeight) {
  this.weight = newWeight;
};

/**
 * Функция-конструктор для Weapon
 * @constructor
 */
function WeaponConstructor(name, weight, rarity, damage, durability) {
  ItemConstructor.call(this, name, weight, rarity);
  this.damage = damage;
  this.durability = durability;
}

WeaponConstructor.prototype = Object.create(ItemConstructor.prototype);
WeaponConstructor.prototype.constructor = WeaponConstructor;

WeaponConstructor.prototype.use = function () {
  if (this.durability > 0) {
    this.durability -= 10;
  }
};

WeaponConstructor.prototype.repair = function () {
  this.durability = 100;
};

WeaponConstructor.prototype.getInfo = function () {
  return `${ItemConstructor.prototype.getInfo.call(this)}, Damage: ${this.damage}, Durability: ${this.durability}`;
};

// === Тест функций-конструкторов ===
const axe = new WeaponConstructor("Battle Axe", 5.5, "legendary", 50, 100);
console.log(axe.getInfo());
axe.use();
console.log(axe.getInfo());
axe.repair();
console.log(axe.getInfo());
