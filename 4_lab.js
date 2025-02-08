class ArrayOperations {
  constructor(size) {
    this.size = size;
    this.randomArray = this.generateRandomArray();
    this.sortedArray = this.generateSortedArray();
  }

  generateRandomArray() {
    return Array.from({ length: this.size }, () =>
      Math.floor(Math.random() * 100)
    );
  }

  generateSortedArray() {
    return Array.from({ length: this.size }, (_, i) => i * 2);
  }

  swapElements(arr, value1, value2) {
    const index1 = arr.indexOf(value1);
    const index2 = arr.indexOf(value2);
    if (index1 !== -1 && index2 !== -1) {
      [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
    }
  }
}

class SinglyNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    const node = new SinglyNode(value);
    if (!this.head) this.head = node;
    else {
      let current = this.head;
      while (current.next) current = current.next;
      current.next = node;
    }
  }

  find(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  remove(value) {
    if (!this.head) return;
    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }

  swap(value1, value2) {
    const node1 = this.find(value1);
    const node2 = this.find(value2);
    if (node1 && node2) [node1.value, node2.value] = [node2.value, node1.value];
  }
  toArray() {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return nodes;
  }
}

class DoublyNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    const node = new DoublyNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
  }

  find(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  remove(value) {
    const node = this.find(value);
    if (!node) return;
    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;
    if (node === this.head) this.head = node.next;
    if (node === this.tail) this.tail = node.prev;
  }

  swap(value1, value2) {
    const node1 = this.find(value1);
    const node2 = this.find(value2);
    if (node1 && node2) [node1.value, node2.value] = [node2.value, node1.value];
  }
}

class Deque {
  constructor() {
    this.items = [];
  }

  addFront(value) {
    this.items.unshift(value);
  }
  addBack(value) {
    this.items.push(value);
  }
  removeFront() {
    return this.items.shift();
  }
  removeBack() {
    return this.items.pop();
  }
  find(value) {
    return this.items.indexOf(value);
  }
  swap(value1, value2) {
    const idx1 = this.items.indexOf(value1);
    const idx2 = this.items.indexOf(value2);
    if (idx1 !== -1 && idx2 !== -1)
      [this.items[idx1], this.items[idx2]] = [
        this.items[idx2],
        this.items[idx1],
      ];
  }
}

class SortedLinkedList extends SinglyLinkedList {
  insertSorted(value) {
    const node = new SinglyNode(value);
    if (!this.head || this.head.value >= value) {
      node.next = this.head;
      this.head = node;
    } else {
      let current = this.head;
      while (current.next && current.next.value < value) {
        current = current.next;
      }
      node.next = current.next;
      current.next = node;
    }
  }
}

const arrayOps = new ArrayOperations(5);
console.log("Случайный массив:", arrayOps.randomArray);
arrayOps.swapElements(
  arrayOps.randomArray,
  arrayOps.randomArray[0],
  arrayOps.randomArray[1]
);
console.log("После перестановки:", arrayOps.randomArray);

const sll = new SinglyLinkedList();
sll.append(10);
sll.append(20);

sll.swap(10, 20);
console.log("Односвязный список:", sll);
console.log("Односвязный список конвертированный в массив:", sll.toArray());

const dll = new DoublyLinkedList();
dll.append(30);
dll.append(40);
dll.swap(30, 40);
console.log("Двусвязный список:", dll);

const deque = new Deque();
deque.addBack(50);
deque.addFront(60);
console.log("Дек:", deque.items);

const sortedList = new SortedLinkedList();
sortedList.insertSorted(5);
sortedList.insertSorted(3);
sortedList.insertSorted(7);
console.log("Сортированный список:");
let current = sortedList.head;
while (current) {
  console.log(current.value);
  current = current.next;
}
