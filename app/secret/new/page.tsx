import { NodeClusterType } from "@/app/utils/knowledge/NEW";
import { Article, PageLayout } from "@/app/comp/PageLayout";
import { getAllHlsFiles } from "@/app/utils/knowledge/hls";
import { ParsedNodeCluster } from "./comp";

function countNodes(cluster: NodeClusterType): number {
  let count = 1;
  if (cluster.c) {
    count += cluster.c.reduce((sum, child) => sum + countNodes(child), 0);
  }
  return count;
}

function extractText(cluster: NodeClusterType): string {
  let text = cluster.p;
  if (cluster.n) {
    text += " " + cluster.n.join(" ");
  }
  if (cluster.c) {
    text += " " + cluster.c.map(extractText).join(" ");
  }
  return text;
}

function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  const wordsPerMinute = 200;
  return Math.ceil(words / wordsPerMinute);
}

function Page() {
  const parsed = getAllHlsFiles();

  const allNodes = parsed.flatMap((cluster) => cluster.nodes);
  const totalNodeCount = allNodes.reduce(
    (sum, node) => sum + countNodes(node),
    0
  );

  const allText = allNodes.map(extractText).join(" ");
  const readingTime = calculateReadingTime(allText);

  return (
    <PageLayout>
      <Article>
        <div className="">
          {readingTime} minute read - {totalNodeCount} nodes
        </div>
        {parsed.map((cluster, idx) => (
          <ParsedNodeCluster key={idx} cluster={cluster} />
        ))}
      </Article>
    </PageLayout>
  );
}

export default Page;
