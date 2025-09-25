import { NodeClusterType } from "../knowledge/NEW";
import { slugify } from "../utils";

function getAnkiText(node: NodeClusterType) {
  return `${node.category ? node.category + ": " : ""} ${node.p}`;
}

function getAnkiId(node: NodeClusterType) {
  return slugify(node.p);
}

export { getAnkiText, getAnkiId };
