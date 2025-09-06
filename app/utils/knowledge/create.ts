import { KnowledgeNode } from "./types";

interface NewNodeProps {
  a?: string[] | null;
  t: string;
  why?: string[];
  ex?: string[];
  n?: string[];
}

function newNode({ a, t, why, ex, n }: NewNodeProps): KnowledgeNode {
  return {
    aliases: a ?? [],
    text: t,
    exampleNodes: ex?.map((node) => newNode({ t: node })),
    whyNodes: why?.map((node) => newNode({ t: node })),
    notes: n,
  };
}

export { newNode };
