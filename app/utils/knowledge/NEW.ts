// the new sysetm is based off MENTAL MODELS/CONCEPTS

interface NodeClusterType {
  p: string; // parent
  c?: (NodeClusterType | string)[]; // c
  // children consists of
  // - clarifying/explanation
  // - why
  // applications (examples)
  a?: string[]; // aliases
  n?: string[]; // notes
  category?: string;
}

// example cluster
const RAYLEIGH_SCATTERING_CLUSTER: NodeClusterType = {
  a: ["rayleigh scattering"],
  p: "rayleigh scattering is how [[photons]] are scattered by [[molecules]] much smaller than the [[wavelength]] of the [[photon]]",
  c: [
    {
      p: "the sky is blue because of something called {{c1::[[rayleigh scattering]]}}",
      c: [
        "shadows outside are {{c2::blue-ish}} because of {{c1::[[rayleigh scattering]]}}",
      ],
    },
    {
      p: `[[rayleigh scattering]] equation is "{{c1::intensity of scattering}} is {{c2::proportional to}} {{c3::([[frequency]] ^ 4)}}"`,
      c: [
        "if you {{c1::half the}} [[wavelength]], the [[rayleigh scattering]] {{c2::increases by a factor of 16 (2^4)}}",
        "if you {{c1::double}} the [[wavelength]], the [[rayleigh scattering]] {{c2::decreases by a factor of 16 (2^4)}}",
      ],
    },
    "in the [[atmosphere]], violet light is scattered {{c1::more}} than blue light",
    "the sky is blue and not purple because {{c1::the [[sun]] emits less violet than blue light}} and {{c2::our eyes are more sensitive to blue than violet}}",
    "the {{c3::[[atmosphere]]}} is full of mostly {{c1::[[nitrogen]]}} and {{c2::[[oxygen]]}} particles",
    "[[nitrogen]] and [[oxygen]] [[molecules]] are {{c1::much smaller::size}} than the [[wavelength]] of [[visibile light]]",
    "the [[sun]] can appear yellow because {{c1::some of the blue has been scattered away ([[rayleigh scattering]])}}",
    "if you were to turn the [[sun]] off and shine a really bright white narrow flashlight into the sky, it would {{c1::look blue}} because {{c2::of [[rayleigh scattering]]}}",
    "sunrise/sunset appears red because {{c1::light must travel through hundreds of more miles of [[atmosphere]] to reach you, scattering it more}}",
  ],
};

// const PHYSICS_NODES: NodeClusterType[] = createNodeCategory(
//   [RAYLEIGH_SCATTERING_CLUSTER],
//   "physics"
// );

// function createNodeCategory(nodes: NodeClusterType[], category: string) {
//   console.log(category);
//   return nodes;
// }

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

function postProcess(node: NodeClusterType): NodeClusterType | string {
  if (!node.c && !node.n) {
    return node.p;
  }
  if (node.c) {
    node.c = node.c.map((child) => {
      if (typeof child === "string") return child;
      return postProcess(child as NodeClusterType);
    });
  }
  return node;
}

function parseHlsToNodeCluster(input: string): NodeClusterType {
  const lines = input.split(/\r?\n/);
  let index = 0;
  let category = "";
  while (index < lines.length) {
    const line = lines[index].trim();
    if (line === "") {
      index += 1;
      continue;
    }
    if (line.startsWith("#")) {
      category = line.slice(1).trim();
      index += 1;
      break;
    }
    break;
  }
  const rootStack: { node: NodeClusterType; indent: number }[] = [];
  let root: NodeClusterType | null = null;
  for (; index < lines.length; index++) {
    const raw = lines[index];
    if (raw.trim() === "") continue;
    const indentMatch = raw.match(/^(\s*)-/);
    if (!indentMatch) {
      throw new Error(`Line ${index + 1} must begin with '-'`);
    }
    const indent = indentMatch[1].length;
    if (indent % 2 !== 0) {
      throw new Error(
        `Indentation must be multiples of two spaces on line ${index + 1}`
      );
    }
    const level = indent / 2;
    const content = raw.slice(indentMatch[0].length).trimStart();
    validateCloze(content);
    while (rootStack.length > level) rootStack.pop();
    if (content.startsWith("n:")) {
      if (rootStack.length === 0) {
        throw new Error("Note without parent");
      }
      const parent = rootStack[rootStack.length - 1].node;
      const noteText = content.slice(2).trim();
      if (!parent.n) parent.n = [];
      parent.n.push(noteText);
      continue;
    }
    if (content.startsWith("a:")) {
      continue;
    }
    const newNode: NodeClusterType = { p: content };
    if (rootStack.length === 0) {
      root = newNode;
    } else {
      const parent = rootStack[rootStack.length - 1].node;
      if (!parent.c) parent.c = [];
      parent.c.push(newNode);
    }
    rootStack.push({ node: newNode, indent: indent });
  }
  if (!root) {
    throw new Error("No root node found");
  }
  const processed = postProcess(root) as NodeClusterType;
  if (category) processed.category = category;
  return processed;
}

export { RAYLEIGH_SCATTERING_CLUSTER, parseHlsToNodeCluster };
