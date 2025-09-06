import { KnowledgeNode } from "./types";

function newNode(
  aliases: string[] | null,
  text: string,
  whyNodes?: string[],
  exampleNodes?: string[]
): KnowledgeNode {
  return {
    aliases: aliases ?? [],
    text,
    exampleNodes: exampleNodes?.map((node) => newNode(null, node)),
    whyNodes: whyNodes?.map((node) => newNode(null, node)),
  };
}

export { newNode };
