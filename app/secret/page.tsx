import { KnowledgeNodeUi } from "../utils/knowledge/KnowledgeNodeUi";
import { testNodes } from "../utils/knowledge/nodes";

export default function Secret() {
  return (
    <div className="lh-pl lh-pr mt-32">
      <KnowledgeNodeUi node={testNodes[0]} />
    </div>
  );
}
