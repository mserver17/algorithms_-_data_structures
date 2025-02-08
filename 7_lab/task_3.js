function hilbertCurve(n) {
  const total = n * n;
  const coords = Array(total).fill(null);

  function d2xy(n, d) {
    let rx,
      ry,
      s,
      t = d;
    let x = 0,
      y = 0;
    for (s = 1; s < n; s *= 2) {
      rx = 1 & (t / 2);
      ry = 1 & (t ^ rx);
      [x, y] = rot(s, x, y, rx, ry);
      x += s * rx;
      y += s * ry;
      t = Math.floor(t / 4);
    }
    return { x, y };
  }

  function rot(s, x, y, rx, ry) {
    if (ry === 0) {
      if (rx === 1) {
        x = s - 1 - x;
        y = s - 1 - y;
      }
      return [y, x];
    }
    return [x, y];
  }

  for (let d = 0; d < total; d++) {
    coords[d] = d2xy(n, d);
  }
  return coords;
}
function getNeighborhood(x, y, mapSize) {
  const neighbors = [];
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx,
        ny = y + dy;
      if (nx >= 0 && nx < mapSize && ny >= 0 && ny < mapSize) {
        neighbors.push({ x: nx, y: ny });
      }
    }
  }
  return neighbors;
}

const mapSize = 16;
const hilbertCoords = hilbertCurve(mapSize);
console.log(
  "Первые 10 координат по кривой Гильберта:",
  hilbertCoords.slice(0, 10)
);

const testPoint = { x: 5, y: 5 };
const neighborhood = getNeighborhood(testPoint.x, testPoint.y, mapSize);
console.log(
  `Окрестность точки (${testPoint.x}, ${testPoint.y}):`,
  neighborhood
);
