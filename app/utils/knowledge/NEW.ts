// the new sysetm is based off MENTAL MODELS/CONCEPTS

export interface NodeClusterType {
  p: string; // parent
  c?: NodeClusterType[]; // c
  // children consists of
  // - clarifying/explanation
  // - why
  // applications (examples)
  n?: string[]; // notes
  category?: string;
}

function validateCloze(line: string): void {
  let index = 0;
  let balance = 0;
  while (index < line.length) {
    if (line.startsWith("{{", index)) {
      balance += 1;
      index += 2;
      continue;
    }
    if (line.startsWith("}}", index)) {
      balance -= 1;
      if (balance < 0) {
        throw new Error("Unmatched closing cloze braces");
      }
      index += 2;
      continue;
    }
    index += 1;
  }
  if (balance !== 0) {
    throw new Error("Unmatched opening cloze braces");
  }
}

function postProcess(node: NodeClusterType): NodeClusterType {
  if (node.c) node.c = node.c.map(postProcess);
  return node;
}

function propagateCategory(node: NodeClusterType, cat: string): void {
  node.category = cat;
  if (node.c) node.c.forEach((child) => propagateCategory(child, cat));
}

function extractCategory(
  lines: string[],
  start: number
): { category: string; next: number } {
  let i = start;
  while (i < lines.length) {
    const t = lines[i].trim();
    if (t === "") {
      i += 1;
      continue;
    }
    if (t.startsWith("#")) {
      return { category: t.slice(1).trim(), next: i + 1 };
    }
    break;
  }
  return { category: "", next: i };
}

function parseClustersForCategory(
  lines: string[],
  start: number
): { clusters: NodeClusterType[]; next: number } {
  const clusters: NodeClusterType[] = [];
  const stack: { node: NodeClusterType; indent: number }[] = [];
  let i = start;
  for (; i < lines.length; i++) {
    const raw = lines[i];
    if (raw.trim() === "") continue;
    if (raw.trim().startsWith("#")) break;

    const indentMatch = raw.match(/^(\s*)-/);
    if (!indentMatch) throw new Error(`Line ${i + 1} must begin with '-'`);
    const indent = indentMatch[1].length;
    if (indent % 2 !== 0)
      throw new Error(
        `Indentation must be multiples of two spaces on line ${i + 1}`
      );
    const level = indent / 2;
    const content = raw.slice(indentMatch[0].length).trimStart();
    validateCloze(content);

    // pop stack to current level
    while (stack.length > level) stack.pop();

    if (content.startsWith("n:")) {
      if (stack.length === 0) throw new Error("Note without parent");
      const parent = stack[stack.length - 1].node;
      const noteText = content.slice(2).trim();
      if (!parent.n) parent.n = [];
      parent.n.push(noteText);
      continue;
    }
    if (content.startsWith("a:")) continue;

    const newNode: NodeClusterType = { p: content };

    if (level === 0) {
      clusters.push(newNode);
      stack.length = 0;
      stack.push({ node: newNode, indent });
    } else {
      const parent = stack[stack.length - 1].node;
      if (!parent.c) parent.c = [];
      parent.c.push(newNode);
      stack.push({ node: newNode, indent });
    }
  }

  // post process roots
  for (let idx = 0; idx < clusters.length; idx++) {
    clusters[idx] = postProcess(clusters[idx]);
  }

  return { clusters, next: i };
}

function parseHls(input: string): NodeClusterType[] {
  const lines = input.split(/\r?\n/);
  const result: NodeClusterType[] = [];
  let index = 0;
  while (index < lines.length) {
    const { category, next } = extractCategory(lines, index);
    index = next;
    if (index >= lines.length) break;
    const { clusters, next: after } = parseClustersForCategory(lines, index);
    if (clusters.length === 0) break;
    if (category) clusters.forEach((c) => propagateCategory(c, category));
    result.push(...clusters);
    index = after;
  }
  return result;
}

export { parseHls };
