import { KnowledgeNode } from "./types";
import { formatKnowledgeText } from "./get";
import { countTotalDependencies, countTotalDependents } from "./dependencies";
import { testNodes } from "./nodes";

function KnowledgeNodeItem({ node }: { node: KnowledgeNode }) {
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: formatKnowledgeText(node.text) }} />

      <p>
        {countTotalDependencies(node, testNodes)} -{" "}
        {countTotalDependents(node, testNodes)}
      </p>

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
