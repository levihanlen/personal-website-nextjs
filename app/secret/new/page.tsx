import fs from "fs";
import path from "path";
import { parseHls, NodeClusterType } from "@/app/utils/knowledge/NEW";
import { CenteredArticle } from "@/app/comp/PageLayout";
import { formatKnowledgeText } from "@/app/utils/knowledge/format";

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
            {item.n &&
              item.n.map((note, nIdx) => (
                <ul key={`n-${nIdx}`} className="">
                  <li>(note) {note}</li>
                </ul>
              ))}
            {item.c && <BulletList items={item.c} level={level + 1} />}
          </li>
        );
      })}
    </ul>
  );
}

function ParsedNodeCluster({ cluster }: { cluster: NodeClusterType }) {
  return (
    <>
      {/* <h2>{cluster?.category ? capitalize(cluster.category) : ""}</h2> */}
      <BulletList items={[cluster]} />
      <hr />
    </>
  );
}

function Page() {
  const hlsPath = path.join(process.cwd(), "nodes", "test.hls");
  const hlsString = fs.readFileSync(hlsPath, "utf-8");
  const parsed = parseHls(hlsString);
  return (
    <>
      <CenteredArticle className="mt-32">
        {parsed.map((cluster) => (
          <ParsedNodeCluster key={cluster.p} cluster={cluster} />
        ))}
      </CenteredArticle>
    </>
  );
}

export default Page;
