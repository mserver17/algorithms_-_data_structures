function hashFunction1(key, tableSize) {
  if (typeof key === "number") {
    return key % tableSize;
  } else if (typeof key === "string") {
    let sum = 0;
    for (let i = 0; i < key.length; i++) {
      sum += key.charCodeAt(i);
    }
    return sum % tableSize;
  } else {
    throw new Error("Unsupported key type");
  }
}
function hashFunction2(key, tableSize) {
  const PRIME = 31;
  let hash = 0;
  if (typeof key === "number") {
    hash = key;
  } else if (typeof key === "string") {
    for (let i = 0; i < key.length; i++) {
      hash = (hash * PRIME + key.charCodeAt(i)) >>> 0;
    }
  } else {
    throw new Error("Unsupported key type");
  }
  return hash % tableSize;
}

function linearProbing(hash, i, tableSize) {
  return (hash + i) % tableSize;
}

function quadraticProbing(hash, i, tableSize) {
  return (hash + i * i) % tableSize;
}

class HashTable {
  /**
   * @param {number} tableSize Размер хэш-таблицы
   * @param {function} hashFunc Функция хэширования (например, hashFunction1 или hashFunction2)
   * @param {function} probingFunc Функция пробирования (например, linearProbing или quadraticProbing)
   */
  constructor(
    tableSize,
    hashFunc = hashFunction1,
    probingFunc = linearProbing
  ) {
    if (tableSize < 1) {
      throw new Error("Размер таблицы должен быть положительным числом");
    }
    this.tableSize = tableSize;
    this.hashFunc = hashFunc;
    this.probingFunc = probingFunc;
    this.table = new Array(tableSize).fill(null);
  }

  insert(key, value) {
    let hash = this.hashFunc(key, this.tableSize);
    let i = 0;
    while (i < this.tableSize) {
      const index = this.probingFunc(hash, i, this.tableSize);
      if (this.table[index] === null || this.table[index].deleted) {
        this.table[index] = { key, value, deleted: false };
        return index;
      }
      if (this.table[index].key === key && !this.table[index].deleted) {
        this.table[index].value = value;
        return index;
      }
      i++;
    }
    throw new Error("Хэш-таблица заполнена");
  }

  search(key) {
    let hash = this.hashFunc(key, this.tableSize);
    let i = 0;
    while (i < this.tableSize) {
      const index = this.probingFunc(hash, i, this.tableSize);
      const entry = this.table[index];
      if (entry === null) {
        return null;
      }
      if (!entry.deleted && entry.key === key) {
        return entry;
      }
      i++;
    }
    return null;
  }

  remove(key) {
    let hash = this.hashFunc(key, this.tableSize);
    let i = 0;
    while (i < this.tableSize) {
      const index = this.probingFunc(hash, i, this.tableSize);
      const entry = this.table[index];
      if (entry === null) {
        return false;
      }
      if (!entry.deleted && entry.key === key) {
        this.table[index].deleted = true;
        return true;
      }
      i++;
    }
    return false;
  }

  display() {
    console.table(
      this.table.map((entry, idx) => ({
        index: idx,
        key: entry ? entry.key : null,
        value: entry ? entry.value : null,
        deleted: entry ? entry.deleted : null,
      }))
    );
  }
}

const tableSize = 10;
let hashTable1 = new HashTable(tableSize, hashFunction1, linearProbing);
let hashTable2 = new HashTable(tableSize, hashFunction2, quadraticProbing);

const elements = [
  { key: "apple", value: 100 },
  { key: "banana", value: 200 },
  { key: "orange", value: 300 },
  { key: "grape", value: 400 },
  { key: "melon", value: 500 },
];

console.log("=== Хэш-таблица 1 (hashFunction1, linearProbing) ===");
elements.forEach((item) => hashTable1.insert(item.key, item.value));
hashTable1.display();
console.log("Поиск 'banana':", hashTable1.search("banana"));
hashTable1.remove("banana");
console.log("После удаления 'banana':");
hashTable1.display();

console.log("\n=== Хэш-таблица 2 (hashFunction2, quadraticProbing) ===");
elements.forEach((item) => hashTable2.insert(item.key, item.value));
hashTable2.display();
console.log("Поиск 'grape':", hashTable2.search("grape"));
hashTable2.remove("grape");
console.log("После удаления 'grape':");
hashTable2.display();
