import { NodeClusterType, UiNodeCluster } from "@/app/utils/knowledge/NEW";
import { CenteredArticle } from "@/app/comp/PageLayout";
import { formatKnowledgeText } from "@/app/utils/knowledge/format";
import { capitalize } from "@/app/utils/utils";
import { getAllHlsFiles } from "@/app/utils/knowledge/hls";

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

function BulletList({
  items,
  level = 0,
}: {
  items: NodeClusterType[];
  level?: number;
}) {
  return (
    <ul>
      {items.map((item, idx) => {
        return (
          <li key={idx}>
            {formatKnowledgeText(item.p)}

            {/* {getAnkiText(item)} */}
            {item.n &&
              item.n.map((note, nIdx) => (
                <ul key={`n-${nIdx}`} className="">
                  <li>
                    <i>{capitalize(note)}</i>
                  </li>
                </ul>
              ))}
            {item.c && <BulletList items={item.c} level={level + 1} />}
          </li>
        );
      })}
    </ul>
  );
}

function ParsedNodeCluster({ cluster }: { cluster: UiNodeCluster }) {
  return (
    <>
      <h2>{cluster.title ? capitalize(cluster.title) : ""}</h2>
      <BulletList items={cluster.nodes} />
    </>
  );
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
    <>
      <CenteredArticle className="mt-32">
        <div className="">
          {readingTime} minute read - {totalNodeCount} nodes
        </div>
        {parsed.map((cluster, idx) => (
          <ParsedNodeCluster key={idx} cluster={cluster} />
        ))}
      </CenteredArticle>
    </>
  );
}

export default Page;
