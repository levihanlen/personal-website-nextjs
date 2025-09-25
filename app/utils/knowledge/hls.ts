import fs from "fs";
import path from "path";
import { parseHlsForUi, type UiNodeCluster } from "./NEW";

function getHlsFile(fileName: string) {
  try {
    const finalName = fileName.endsWith(".hls") ? fileName : `${fileName}.hls`;
    const filePath = path.join(process.cwd(), "nodes", finalName);
    if (!fs.existsSync(filePath))
      throw new Error(`HLS file not found: ${finalName}`);
    const content = fs.readFileSync(filePath, "utf-8");
    return parseHlsForUi(content);
  } catch (err) {
    throw new Error(
      `Failed to parse HLS file \"${fileName}\": ${(err as Error).message}`
    );
  }
}

function getAllHlsFiles() {
  try {
    const dir = path.join(process.cwd(), "nodes");
    if (!fs.existsSync(dir))
      throw new Error(`Nodes directory not found at ${dir}`);
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".hls"));
    if (files.length === 0)
      throw new Error("No .hls files found in nodes directory");
    let result: UiNodeCluster[] = [];
    for (const f of files) {
      result = result.concat(getHlsFile(f));
    }
    return result;
  } catch (err) {
    throw new Error(`Failed to parse HLS files: ${(err as Error).message}`);
  }
}

export { getHlsFile, getAllHlsFiles };
