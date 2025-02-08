function generateRandomArray(size, min = 0, max = 100) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return arr;
}

function duplicateArray(arr) {
  return arr.slice();
}

function insertionSort(arr) {
  let array = arr.slice();
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
  }
  return array;
}

function selectionSort(arr) {
  let array = arr.slice();
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      let temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
    }
  }
  return array;
}

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

function quickSort(arr) {
  if (arr.length <= 1) return arr;
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr[pivotIndex];
  let less = [];
  let greater = [];
  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) continue;
    if (arr[i] <= pivot) {
      less.push(arr[i]);
    } else {
      greater.push(arr[i]);
    }
  }
  return quickSort(less).concat([pivot], quickSort(greater));
}

const arraySize = 20;
const originalArray = generateRandomArray(arraySize, 0, 100);
console.log("Исходный массив:", originalArray);

const arrayForInsertion = duplicateArray(originalArray);
const arrayForSelection = duplicateArray(originalArray);
const arrayForMerge = duplicateArray(originalArray);
const arrayForQuick = duplicateArray(originalArray);

console.time("insertionSort");
const sortedInsertion = insertionSort(arrayForInsertion);
console.timeEnd("insertionSort");

console.time("selectionSort");
const sortedSelection = selectionSort(arrayForSelection);
console.timeEnd("selectionSort");

console.time("mergeSort");
const sortedMerge = mergeSort(arrayForMerge);
console.timeEnd("mergeSort");

console.time("quickSort");
const sortedQuick = quickSort(arrayForQuick);
console.timeEnd("quickSort");

console.log("Сортировка вставками:", sortedInsertion);
console.log("Сортировка выбором:", sortedSelection);
console.log("Сортировка слиянием:", sortedMerge);
console.log("Быстрая сортировка:", sortedQuick);
