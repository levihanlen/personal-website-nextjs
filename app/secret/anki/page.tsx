import AnkiClient from "./AnkiClient";
import { getAllHlsFiles } from "@/app/utils/knowledge/hls";

export default function AnkiPage() {
  const groups = getAllHlsFiles();
  const nodes = groups.flatMap((g) => g.nodes);
  return <AnkiClient nodes={nodes} />;
}
