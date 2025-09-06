interface KnowledgeNode {
  aliases?: string[];
  text: string;
  whyNodes?: KnowledgeNode[];
  exampleNodes?: KnowledgeNode[];
}

export type { KnowledgeNode };
