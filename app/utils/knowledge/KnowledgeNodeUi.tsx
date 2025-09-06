import { KnowledgeGraphNode } from "./types";
import { formatKnowledgeText } from "./format";

function KnowledgeNodeItem({ node }: { node: KnowledgeGraphNode }) {
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: formatKnowledgeText(node.text) }} />

      <ul>
        <li>
          Difficulty: {node.allDependencies.length} - Importance:{" "}
          {node.allDependents.length}
        </li>

        {node.whyNodes && node.whyNodes.length > 0 && (
          <>
            {node.whyNodes.map((whyNode, index) => (
              <li
                key={index}
                dangerouslySetInnerHTML={{
                  __html: formatKnowledgeText(whyNode.text),
                }}
              />
            ))}
          </>
        )}

        {node.exampleNodes && node.exampleNodes.length > 0 && (
          <>
            {node.exampleNodes.map((exampleNode, index) => (
              <li
                key={index}
                dangerouslySetInnerHTML={{
                  __html: formatKnowledgeText(exampleNode.text),
                }}
              />
            ))}
          </>
        )}
      </ul>
      <hr />
    </>
  );
}

export { KnowledgeNodeItem };
