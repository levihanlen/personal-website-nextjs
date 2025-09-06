interface KnowledgeNode {
  aliases?: string[];
  text: string;
  whyNodes?: KnowledgeNode[];
  exampleNodes?: KnowledgeNode[];
}

interface KnowledgeGraphNode extends KnowledgeNode {
  directDependencies: KnowledgeNode[];
  allDependencies: KnowledgeNode[];
  directDependents: KnowledgeNode[];
  allDependents: KnowledgeNode[];
}

export type { KnowledgeNode, KnowledgeGraphNode };
