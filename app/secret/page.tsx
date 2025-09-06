import { buildKnowledgeGraph } from "../utils/knowledge/build";
import { KnowledgeGraphChart } from "../utils/knowledge/KnowledgeGraphChart";
import { KnowledgeNodeItem } from "../utils/knowledge/KnowledgeNodeUi";
import { testNodes } from "../utils/knowledge/nodes";
import { sortKnowledgeGraphNodes } from "../utils/knowledge/sort";

export default function Secret() {
  const graph = buildKnowledgeGraph(testNodes);
  const sortedGraph = sortKnowledgeGraphNodes(graph);
  return (
    <div className="lh-pl lh-pr mt-32">
      {sortedGraph.length} nodes
      <KnowledgeGraphChart nodes={sortedGraph} />
      <div className="lh-prose-editor text-dark max-w-[50ch]">
        {sortedGraph.map((node) => (
          <KnowledgeNodeItem node={node} key={node.text} />
        ))}
      </div>
    </div>
  );
}
