import { KnowledgeNode } from "./types";
import { formatKnowledgeText } from "./get";

function KnowledgeNodeItem({ node }: { node: KnowledgeNode }) {
  return (
    <>
      <p
        className="text"
        dangerouslySetInnerHTML={{ __html: formatKnowledgeText(node.text) }}
      />

      {node.whyNodes && node.whyNodes.length > 0 && (
        <ul>
          {node.whyNodes.map((whyNode, index) => (
            <li
              key={index}
              dangerouslySetInnerHTML={{
                __html: formatKnowledgeText(whyNode.text),
              }}
            />
          ))}
        </ul>
      )}

      {node.exampleNodes && node.exampleNodes.length > 0 && (
        <ul>
          {node.exampleNodes.map((exampleNode, index) => (
            <li
              key={index}
              dangerouslySetInnerHTML={{
                __html: formatKnowledgeText(exampleNode.text),
              }}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export { KnowledgeNodeItem };
