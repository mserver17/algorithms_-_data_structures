class Graph {
  constructor(numVertices) {
    this.numVertices = numVertices;
    this.adjList = Array.from({ length: numVertices }, () => []);
  }

  addEdge(u, v, weight) {
    this.adjList[u].push({ to: v, weight });
    this.adjList[v].push({ to: u, weight });
  }

  randomFill(maxEdgesPerVertex = 3, maxWeight = 20) {
    for (let u = 0; u < this.numVertices; u++) {
      const numEdges = Math.floor(Math.random() * maxEdgesPerVertex);
      for (let i = 0; i < numEdges; i++) {
        let v = Math.floor(Math.random() * this.numVertices);
        if (v === u) continue;
        const weight = Math.floor(Math.random() * maxWeight) + 1;
        if (!this.adjList[u].some((edge) => edge.to === v)) {
          this.addEdge(u, v, weight);
        }
      }
    }
  }
}

function primMST(graph) {
  const numVertices = graph.numVertices;
  const key = Array(numVertices).fill(Infinity);
  const parent = Array(numVertices).fill(null);
  const inMST = Array(numVertices).fill(false);
  key[0] = 0;

  for (let count = 0; count < numVertices - 1; count++) {
    let u = -1,
      minKey = Infinity;
    for (let v = 0; v < numVertices; v++) {
      if (!inMST[v] && key[v] < minKey) {
        minKey = key[v];
        u = v;
      }
    }
    inMST[u] = true;
    for (const edge of graph.adjList[u]) {
      const v = edge.to;
      if (!inMST[v] && edge.weight < key[v]) {
        key[v] = edge.weight;
        parent[v] = u;
      }
    }
  }
  const totalWeight = key.reduce((sum, val) => sum + val, 0);
  return { parent, totalWeight };
}

function isEulerian(graph) {
  return graph.adjList.every((adj) => adj.length % 2 === 0);
}
function isHamiltonian(graph) {
  const n = graph.numVertices;
  const visited = Array(n).fill(false);

  function dfs(u, count) {
    if (count === n && u === 0) return true;
    visited[u] = true;
    for (const edge of graph.adjList[u]) {
      const v = edge.to;
      if (!visited[v] || (count === n - 1 && v === 0)) {
        if (dfs(v, count + 1)) return true;
      }
    }
    visited[u] = false;
    return false;
  }
  return dfs(0, 0);
}

const numVertices = 6;
const graph = new Graph(numVertices);
graph.randomFill();
console.log("Сгенерированный граф (список смежности):");
console.log(graph.adjList);

const mst = primMST(graph);
console.log("Минимальное остовное дерево. Общая стоимость:", mst.totalWeight);

console.log("Граф эйлеровый?", isEulerian(graph));
console.log(
  "Граф гамильтоновый (упрощенно, для маленьких графов)?",
  isHamiltonian(graph)
);
