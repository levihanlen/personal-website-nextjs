import { KnowledgeGraphNode } from "./types";
import { formatKnowledgeText } from "./format";

function KnowledgeNodeItem({ node }: { node: KnowledgeGraphNode }) {
  const difficulty = node.allDependencies.length;
  const importance = node.allDependents.length;
  return (
    <>
      <p>
        <span
          dangerouslySetInnerHTML={{ __html: formatKnowledgeText(node.text) }}
        />
        <span className="text-xs lh-card px-2 py-1 ml-2 text-medium">
          {difficulty}, {importance},{" "}
          {((importance + 1) / (difficulty + 1)).toFixed(2)}
        </span>
      </p>

      <ul>
        {/* <li>
          Difficulty: {node.allDependencies.length} - Importance:{" "}
          {node.allDependents.length}
          <br />
        </li> */}

        {/* {node.allDependencies.map((dep) => (
            <div
              key={dep.text}
              dangerouslySetInnerHTML={{
                __html: formatKnowledgeText(dep.text),
              }}
            />
          ))} */}

        {node.notes && node.notes.length > 0 && (
          <>
            {node.notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </>
        )}

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
