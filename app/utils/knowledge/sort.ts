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

export { sortKnowledgeGraphNodes };
