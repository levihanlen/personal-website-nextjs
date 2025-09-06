import { buildKnowledgeGraph } from "../utils/knowledge/build";
import { KnowledgeGraphChart } from "../utils/knowledge/KnowledgeGraphChart";
import { KnowledgeNodeItem } from "../utils/knowledge/KnowledgeNodeUi";
import { testNodes } from "../utils/knowledge/nodes";
import { sortKnowledgeGraphNodes } from "../utils/knowledge/sort";

export default function Secret() {
  const graph = buildKnowledgeGraph(testNodes);
  const sortedGraph = sortKnowledgeGraphNodes(graph);
  const length = sortedGraph.length;
  const totalDependencies = sortedGraph.reduce(
    (sum, node) => sum + node.directDependents.length,
    0
  );
  return (
    <>
      <KnowledgeGraphChart nodes={sortedGraph} />
      <div className="lh-pl lh-pr mt-32">
        <div className="lh-prose-editor text-dark max-w-[50ch]">
          <p>
            <strong>
              {length} nodes, {totalDependencies + length} value
            </strong>
          </p>
          {sortedGraph.map((node) => (
            <KnowledgeNodeItem node={node} key={node.text} />
          ))}
        </div>
      </div>
    </>
  );
}
