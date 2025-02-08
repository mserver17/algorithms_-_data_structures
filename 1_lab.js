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

  linearSearch(arr, target) {
    const start = performance.now();
    let result = -1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === target) {
        result = i;
        break;
      }
    }
    const end = performance.now();
    console.log(
      `Время выполнения линейного поиска: ${(end - start).toFixed(3)} мс`
    );
    return result;
  }

  binarySearch(arr, target) {
    const start = performance.now();
    let left = 0,
      right = arr.length - 1;
    let result = -1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] === target) {
        result = mid;
        break;
      }
      arr[mid] < target ? (left = mid + 1) : (right = mid - 1);
    }
    const end = performance.now();
    console.log(
      `Время выполнения бинарного поиска: ${(end - start).toFixed(3)} мс`
    );
    return result;
  }

  insertRandom(value) {
    const start = performance.now();
    this.randomArray.push(value);
    const end = performance.now();
    console.log(
      `Время вставки в случайный массив: ${(end - start).toFixed(3)} мс`
    );
  }

  insertSorted(value) {
    const start = performance.now();
    let index = this.sortedArray.findIndex((el) => el > value);
    if (index === -1) this.sortedArray.push(value);
    else this.sortedArray.splice(index, 0, value);
    const end = performance.now();
    console.log(
      `Время вставки в упорядоченный массив: ${(end - start).toFixed(3)} мс`
    );
  }

  removeElement(arr, value) {
    const start = performance.now();
    let index = arr.indexOf(value);
    if (index !== -1) arr.splice(index, 1);
    const end = performance.now();
    console.log(`Время удаления элемента: ${(end - start).toFixed(3)} мс`);
  }
}

const arrayOps = new ArrayOperations(1000);

console.log("Случайный массив:", arrayOps.randomArray);
console.log("Упорядоченный массив:", arrayOps.sortedArray);

console.log(
  "Поиск 4 в случайном массиве. Индекс:",
  arrayOps.linearSearch(arrayOps.randomArray, 244)
);
console.log(
  "Поиск 10 в упорядоченном массиве. Индекс:",
  arrayOps.binarySearch(arrayOps.sortedArray, 244)
);

arrayOps.insertRandom(99);
console.log("Добавлен 99 в случайный массив:", arrayOps.randomArray);

arrayOps.insertSorted(7);
console.log("Добавлен 7 в упорядоченный массив:", arrayOps.sortedArray);

arrayOps.removeElement(arrayOps.randomArray, 99);
console.log("Удален 99 из случайного массива:", arrayOps.randomArray);
