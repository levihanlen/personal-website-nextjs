import { KnowledgeNodeItem } from "../utils/knowledge/KnowledgeNodeUi";
import { testNodes } from "../utils/knowledge/nodes";

export default function Secret() {
  return (
    <div className="lh-pl lh-pr mt-32">
      <div className="lh-prose-editor text-dark max-w-[50ch]">
        {testNodes.map((node) => (
          <KnowledgeNodeItem node={node} key={node.text} />
        ))}
      </div>
    </div>
  );
}
