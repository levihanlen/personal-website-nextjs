import { KnowledgeNode } from "./types";
import { formatKnowledgeText } from "./get";
import { Article } from "@/app/comp/PageLayout";

function KnowledgeNodeUi({ node }: { node: KnowledgeNode }) {
  return (
    <Article>
      <p
        className="text"
        dangerouslySetInnerHTML={{ __html: formatKnowledgeText(node.text) }}
      />

      {node.whyNodes && node.whyNodes.length > 0 && (
        <>
          <strong>Why:</strong>
          {node.whyNodes.map((whyNode, index) => (
            <p
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
          <strong>Examples:</strong>
          {node.exampleNodes.map((exampleNode, index) => (
            <p
              key={index}
              dangerouslySetInnerHTML={{
                __html: formatKnowledgeText(exampleNode.text),
              }}
            />
          ))}
        </>
      )}
    </Article>
  );
}

export { KnowledgeNodeUi };
