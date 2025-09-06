import { KnowledgeGraphNode, KnowledgeNode } from "./types";

function buildAliasMap(nodes: KnowledgeNode[]): Map<string, KnowledgeNode> {
  const map = new Map<string, KnowledgeNode>();
  for (const node of nodes) {
    if (node.aliases) {
      for (const alias of node.aliases) {
        map.set(alias.toLowerCase(), node);
      }
    }
    const regex = /\[\[(.*?)\]\]/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(node.text)) !== null) {
      map.set(match[1].toLowerCase(), node);
    }
  }
  return map;
}

function gatherDirectDependencies(
  node: KnowledgeNode,
  aliasMap: Map<string, KnowledgeNode>
): KnowledgeNode[] {
  const deps: KnowledgeNode[] = [];
  const regex = /\[\[(.*?)\]\]/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(node.text)) !== null) {
    const ref = aliasMap.get(match[1].toLowerCase());
    if (ref) deps.push(ref);
  }
  if (node.whyNodes) deps.push(...node.whyNodes);
  if (node.exampleNodes) deps.push(...node.exampleNodes);
  return deps;
}

function dfsCollect(
  start: KnowledgeNode,
  adjacency: Map<KnowledgeNode, Set<KnowledgeNode>>,
  visited: Set<KnowledgeNode>
) {
  if (visited.has(start)) return;
  visited.add(start);
  const next = adjacency.get(start);
  if (!next) return;
  for (const n of next) {
    dfsCollect(n, adjacency, visited);
  }
}

function buildKnowledgeGraph(nodes: KnowledgeNode[]): KnowledgeGraphNode[] {
  const aliasMap = buildAliasMap(nodes);

  // Build direct dependency map and reverse dependents map
  const dependencyMap = new Map<KnowledgeNode, Set<KnowledgeNode>>();
  const dependentMap = new Map<KnowledgeNode, Set<KnowledgeNode>>();

  for (const node of nodes) {
    const directDeps = gatherDirectDependencies(node, aliasMap);
    dependencyMap.set(node, new Set(directDeps));
    for (const dep of directDeps) {
      if (!dependentMap.has(dep)) dependentMap.set(dep, new Set());
      (dependentMap.get(dep) as Set<KnowledgeNode>).add(node);
    }
  }

  // Construct KnowledgeGraphNode list
  const result: KnowledgeGraphNode[] = [];

  for (const node of nodes) {
    // allDependencies via DFS on dependencies
    const allDepsSet = new Set<KnowledgeNode>();
    dfsCollect(node, dependencyMap, allDepsSet);
    allDepsSet.delete(node);

    // allDependents via DFS on dependents (reverse graph)
    const allDepsReverseSet = new Set<KnowledgeNode>();
    dfsCollect(node, dependentMap, allDepsReverseSet);
    allDepsReverseSet.delete(node);

    const kgNode: KnowledgeGraphNode = {
      ...node,
      directDependencies: Array.from(dependencyMap.get(node) || []),
      allDependencies: Array.from(allDepsSet),
      directDependents: Array.from(dependentMap.get(node) || []),
      allDependents: Array.from(allDepsReverseSet),
    };

    result.push(kgNode);
  }

  return result;
}

export { buildKnowledgeGraph, type KnowledgeGraphNode };
