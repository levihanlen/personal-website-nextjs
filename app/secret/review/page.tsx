import ReviewClient from "./ReviewClient";
import { getAllHlsFiles } from "@/app/utils/knowledge/hls";

export default function ReviewPage() {
  const groups = getAllHlsFiles();
  const nodes = groups.flatMap((g) => g.nodes);
  return <ReviewClient nodes={nodes} />;
}
