import { KnowledgeGraphNode } from "./build";

function sortKnowledgeGraphNodes(
  nodes: KnowledgeGraphNode[]
): KnowledgeGraphNode[] {
  return [...nodes].sort((a, b) => {
    const diff = a.allDependencies.length - b.allDependencies.length;
    if (diff !== 0) return diff; // least difficulty first
    // importance: more dependents means higher importance, so sort descending
    return b.allDependents.length - a.allDependents.length;
  });
}

type KnowledgeCluster = KnowledgeGraphNode[];

function seedAndTraverseClusters(
  nodes: KnowledgeGraphNode[]
): KnowledgeCluster[] {
  const textToNode = new Map<string, KnowledgeGraphNode>();
  for (const n of nodes) textToNode.set(n.text, n);

  const adjacency = new Map<string, Set<string>>();
  for (const n of nodes) {
    if (!adjacency.has(n.text)) adjacency.set(n.text, new Set());
    for (const dep of n.directDependencies) {
      if (!adjacency.has(dep.text)) adjacency.set(dep.text, new Set());
      (adjacency.get(n.text) as Set<string>).add(dep.text);
      (adjacency.get(dep.text) as Set<string>).add(n.text);
    }
    for (const dep of n.directDependents) {
      if (!adjacency.has(dep.text)) adjacency.set(dep.text, new Set());
      (adjacency.get(n.text) as Set<string>).add(dep.text);
      (adjacency.get(dep.text) as Set<string>).add(n.text);
    }
  }

  function importance(n: KnowledgeGraphNode): number {
    return n.allDependents.length;
  }

  function difficulty(n: KnowledgeGraphNode): number {
    return n.allDependencies.length;
  }

  const seeds = [...nodes]
    .filter((n) => importance(n) > 0 && difficulty(n) === 0)
    .sort((a, b) => importance(b) - importance(a));

  const visited = new Set<string>();
  const clusters: KnowledgeCluster[] = [];

  function traverseFrom(startText: string): string[] {
    const stack: string[] = [startText];
    const collected: string[] = [];
    while (stack.length) {
      const curr = stack.pop() as string;
      if (visited.has(curr)) continue;
      visited.add(curr);
      collected.push(curr);
      const neighbors = adjacency.get(curr);
      if (neighbors) {
        for (const nb of neighbors) {
          if (!visited.has(nb)) stack.push(nb);
        }
      }
    }
    return collected;
  }

  for (const seed of seeds) {
    if (visited.has(seed.text)) continue;
    const texts = traverseFrom(seed.text);
    const cluster = texts
      .map((t) => textToNode.get(t))
      .filter((x): x is KnowledgeGraphNode => Boolean(x));
    clusters.push(sortKnowledgeGraphNodes(cluster));
  }

  const remaining = [...nodes]
    .filter((n) => !visited.has(n.text))
    .sort((a, b) => importance(b) - importance(a));

  for (const n of remaining) {
    if (visited.has(n.text)) continue;
    const texts = traverseFrom(n.text);
    const cluster = texts
      .map((t) => textToNode.get(t))
      .filter((x): x is KnowledgeGraphNode => Boolean(x));
    clusters.push(sortKnowledgeGraphNodes(cluster));
  }

  return clusters;
}

export { sortKnowledgeGraphNodes, seedAndTraverseClusters };
export type { KnowledgeCluster };
