import { buildKnowledgeGraph } from "../utils/knowledge/build";
import { KnowledgeGraphChart } from "../utils/knowledge/KnowledgeGraphChart";
import { KnowledgeNodeItem } from "../utils/knowledge/KnowledgeNodeUi";
import { testNodes } from "../utils/knowledge/nodes";
import {
  seedAndTraverseClusters,
  sortKnowledgeGraphNodes,
} from "../utils/knowledge/sort";

export default function Secret() {
  const graph = buildKnowledgeGraph(testNodes);
  const sortedGraph = sortKnowledgeGraphNodes(graph);
  const length = sortedGraph.length;
  const totalDependencies = sortedGraph.reduce(
    (sum, node) => sum + node.directDependents.length,
    0
  );

  const test = seedAndTraverseClusters(sortedGraph);
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

          {test.map((cluster) => (
            <div key={cluster.map((node) => node.text).join(",")}>
              <strong>idea group</strong>
              {cluster.map((node) => (
                <KnowledgeNodeItem node={node} key={node.text} />
              ))}
            </div>
          ))}

          {sortedGraph.map((node) => (
            <KnowledgeNodeItem node={node} key={node.text} />
          ))}
        </div>
      </div>
    </>
  );
}
