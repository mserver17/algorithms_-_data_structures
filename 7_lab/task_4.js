class WeightedGraph {
  constructor(numVertices) {
    this.numVertices = numVertices;
    this.edges = [];
    this.adjList = Array.from({ length: numVertices }, () => []);
  }

  addEdge(u, v, weight) {
    this.edges.push({ from: u, to: v, weight });
    this.adjList[u].push({ to: v, weight });
    this.adjList[v].push({ to: u, weight });
  }
}
function bellmanFord(graph, source) {
  const dist = Array(graph.numVertices).fill(Infinity);
  dist[source] = 0;

  for (let i = 0; i < graph.numVertices - 1; i++) {
    for (const edge of graph.edges) {
      if (dist[edge.from] + edge.weight < dist[edge.to]) {
        dist[edge.to] = dist[edge.from] + edge.weight;
      }
    }
  }
  return dist;
}
function aStar(graph, start, goal, heuristic) {
  const openSet = new Set([start]);
  const cameFrom = Array(graph.numVertices).fill(null);
  const gScore = Array(graph.numVertices).fill(Infinity);
  gScore[start] = 0;
  const fScore = Array(graph.numVertices).fill(Infinity);
  fScore[start] = heuristic(start, goal);

  while (openSet.size > 0) {
    let current = Array.from(openSet).reduce(
      (min, v) => (fScore[v] < fScore[min] ? v : min),
      Array.from(openSet)[0]
    );
    if (current === goal) {
      return reconstructPath(cameFrom, current);
    }
    openSet.delete(current);
    for (const neighbor of graph.adjList[current]) {
      const tentative_gScore = gScore[current] + neighbor.weight;
      if (tentative_gScore < gScore[neighbor.to]) {
        cameFrom[neighbor.to] = current;
        gScore[neighbor.to] = tentative_gScore;
        fScore[neighbor.to] = tentative_gScore + heuristic(neighbor.to, goal);
        openSet.add(neighbor.to);
      }
    }
  }
  return null;
}

function reconstructPath(cameFrom, current) {
  const path = [current];
  while (cameFrom[current] !== null) {
    current = cameFrom[current];
    path.unshift(current);
  }
  return path;
}

function simpleHeuristic(u, v) {
  return Math.abs(u - v);
}

const numV = 6;
const weightedGraph = new WeightedGraph(numV);
weightedGraph.addEdge(0, 1, 5);
weightedGraph.addEdge(0, 2, 3);
weightedGraph.addEdge(1, 3, 6);
weightedGraph.addEdge(2, 3, 2);
weightedGraph.addEdge(2, 4, 4);
weightedGraph.addEdge(3, 5, 1);
weightedGraph.addEdge(4, 5, 2);

console.log("Результаты алгоритма Беллмана–Форда от вершины 0:");
console.log(bellmanFord(weightedGraph, 0));

console.log("Путь A* от вершины 0 до 5:");
console.log(aStar(weightedGraph, 0, 5, simpleHeuristic));
