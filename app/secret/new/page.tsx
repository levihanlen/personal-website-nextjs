import { NodeClusterType, UiNodeCluster } from "@/app/utils/knowledge/NEW";
import { CenteredArticle } from "@/app/comp/PageLayout";
import { formatKnowledgeText } from "@/app/utils/knowledge/format";
import { capitalize } from "@/app/utils/utils";
import { getAllHlsFiles } from "@/app/utils/knowledge/hls";

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
  return (
    <>
      <CenteredArticle className="mt-32">
        {parsed.map((cluster, idx) => (
          <ParsedNodeCluster key={idx} cluster={cluster} />
        ))}
      </CenteredArticle>
    </>
  );
}

export default Page;
