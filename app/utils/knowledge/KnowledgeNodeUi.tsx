import { KnowledgeNode } from "./types";
import { formatKnowledgeText } from "./get";
import { countTotalDependencies, countTotalDependents } from "./dependencies";
import { testNodes } from "./nodes";

function KnowledgeNodeItem({ node }: { node: KnowledgeNode }) {
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: formatKnowledgeText(node.text) }} />

      <ul>
        <li>
          Difficulty: {countTotalDependencies(node, testNodes)} - Importance:{" "}
          {countTotalDependents(node, testNodes)}
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
    </>
  );
}

export { KnowledgeNodeItem };
