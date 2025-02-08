function generateGrid(X) {
  const grid = [];
  for (let i = 0; i < X; i++) {
    const row = [];
    for (let j = 0; j < X; j++) {
      row.push(Math.floor(Math.random() * 20) + 1);
    }
    grid.push(row);
  }
  return grid;
}

function getNeighbors(i, j, X) {
  const neighbors = [];
  if (i > 0) neighbors.push([i - 1, j]);
  if (i < X - 1) neighbors.push([i + 1, j]);
  if (j > 0) neighbors.push([i, j - 1]);
  if (j < X - 1) neighbors.push([i, j + 1]);
  return neighbors;
}

function dijkstra(grid) {
  const X = grid.length;
  const dist = Array.from({ length: X }, () => Array(X).fill(Infinity));
  const prev = Array.from({ length: X }, () => Array(X).fill(null));
  dist[0][0] = 0;

  const queue = [{ i: 0, j: 0, d: 0 }];

  while (queue.length) {
    queue.sort((a, b) => a.d - b.d);
    const { i, j } = queue.shift();

    if (i === X - 1 && j === X - 1) break;

    const neighbors = getNeighbors(i, j, X);
    for (const [ni, nj] of neighbors) {
      const alt = dist[i][j] + grid[ni][nj];
      if (alt < dist[ni][nj]) {
        dist[ni][nj] = alt;
        prev[ni][nj] = [i, j];
        queue.push({ i: ni, j: nj, d: alt });
      }
    }
  }

  const path = [];
  let cur = [X - 1, X - 1];
  while (cur) {
    path.push(cur);
    cur = prev[cur[0]][cur[1]];
  }
  path.reverse();
  return { distance: dist[X - 1][X - 1], path };
}

const X = 5;
const grid = generateGrid(X);
console.log("Сгенерированная таблица (стоимости):");
console.table(grid);

const result = dijkstra(grid);
console.log("Кратчайший путь (ячейки):", result.path);
console.log("Общая стоимость пути:", result.distance);
