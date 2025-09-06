interface KnowledgeNode {
  aliases?: string[];
  text: string;
  whyNodes?: KnowledgeNode[];
  exampleNodes?: KnowledgeNode[];
}

const testNodes: KnowledgeNode[] = [
  newNode(
    ["rayleigh scattering equation"],
    `[[rayleigh scattering]] equation is "{{c1::intensity of scattering}} is {{c2::proportional to}} {{c3::([[frequency]] ^ 4)}}"`,
    [],
    [
      `if you {{c1::double}} the [[wavelength]], the [[rayleigh scattering]] {{c2::decreases by a factor of 16 (2^4)}}`,
      `if you {{c1::half the}} [[wavelength]], the [[rayleigh scattering]] {{c2::increases by a factor of 16 (2^4)}}`,
    ]
  ),

  newNode(
    null,
    `valuable [[knowledge nodes]] {{change behavior}}`,
    [],
    [
      `authors emphasize actionable insight because {{valuable [[knowledge nodes]] change behavior}}`,
    ]
  ),
];

function newNode(
  aliases: string[] | null,
  text: string,
  whyNodes?: string[],
  exampleNodes?: string[]
): KnowledgeNode {
  return {
    aliases: aliases ?? [],
    text,
    exampleNodes: exampleNodes?.map((node) => newNode(null, node)),
    whyNodes: whyNodes?.map((node) => newNode(null, node)),
  };
}

console.log(testNodes);
