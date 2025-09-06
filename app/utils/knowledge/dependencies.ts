import { KnowledgeNode } from "./types";

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

function countTotalDependencies(
  node: KnowledgeNode,
  allNodes: KnowledgeNode[]
): number {
  const aliasMap = buildAliasMap(allNodes);
  const visited = new Set<KnowledgeNode>();
  function dfs(curr: KnowledgeNode) {
    if (visited.has(curr)) return;
    visited.add(curr);
    for (const dep of gatherDirectDependencies(curr, aliasMap)) {
      dfs(dep);
    }
  }
  dfs(node);
  return visited.size - 1;
}

function countTotalDependents(
  target: KnowledgeNode,
  allNodes: KnowledgeNode[]
): number {
  const aliasMap = buildAliasMap(allNodes);

  function dependsOn(node: KnowledgeNode, search: KnowledgeNode): boolean {
    const stack: KnowledgeNode[] = [node];
    const seen = new Set<KnowledgeNode>();
    while (stack.length) {
      const curr = stack.pop() as KnowledgeNode;
      if (curr === search) return true;
      if (seen.has(curr)) continue;
      seen.add(curr);
      for (const dep of gatherDirectDependencies(curr, aliasMap)) {
        stack.push(dep);
      }
    }
    return false;
  }

  let count = 0;
  for (const node of allNodes) {
    if (node === target) continue;
    if (dependsOn(node, target)) count += 1;
  }
  return count;
}

export { countTotalDependencies, countTotalDependents };
