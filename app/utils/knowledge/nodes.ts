import { newNode } from "./create";
import { KnowledgeNode } from "./types";

// const WRITING_NODES: KnowledgeNode[] = [];

const LEARNING_NODES: KnowledgeNode[] = [
  newNode({
    t: `a knowledge node is the smallest unit of knowledge`,
    a: ["knowledge node", "knowledge nodes"],
    n: ["thi sis a note"],
  }),
  newNode({
    t: `an [[anki]] card should represent one [[knowledge node]]`,
  }),
  newNode({
    t: `understanding is a web of interconnected [[knowledge nodes]]`,
    a: ["understanding"],
  }),
  newNode({
    t: `valuable [[knowledge nodes]] {{change behavior}}`,
    ex: [
      `authors emphasize actionable insight because {{valuable [[knowledge nodes]] change behavior}}`,
    ],
  }),
  newNode({
    t: `a [[knowledge node]] is recalled from a cue`,
    why: [],
    ex: [
      `for the [[knowledge node]] of "the mitochondria is the powerhouse of the cell", the cue is "mitochondria"`,
    ],
  }),

  newNode({
    t: `the difficulty of a [[knowledge node]] is determined by its number of {{c1::dependencies}}`,
  }),
  newNode({
    t: `the importance of a [[knowledge node]] is determined by the number of other nodes that {{c1::depend on it}}`,
  }),

  newNode({
    t: `a [[mental model]] is a [[knowledge node]] with high [[importance]] and low [[difficulty]]`,
    a: ["mental model", "mental models"],
  }),
  newNode({
    t: `the best learning path is by ordering [[knowledge nodes]] from least to most difficulty`,
  }),
];

const PHYS_NODES: KnowledgeNode[] = [
  newNode({
    t: "the sky is blue because of something called {{c1::[[rayleigh scattering]]}}",
    ex: [
      "shadows outside are {{c2::blue-ish}} because of {{c1::[[rayleigh scattering]]}}",
    ],
  }),
  newNode({
    t: `[[rayleigh scattering]] equation is "{{c1::intensity of scattering}} is {{c2::proportional to}} {{c3::([[frequency]] ^ 4)}}"`,
    // a: ["rayleigh scattering equation"],
  }),
  newNode({
    t: "if you {{c1::half the}} [[wavelength]], the [[rayleigh scattering]] {{c2::increases by a factor of 16 (2^4)}}",
  }),
  newNode({
    t: "if you {{c1::double}} the [[wavelength]], the [[rayleigh scattering]] {{c2::decreases by a factor of 16 (2^4)}}",
  }),
  newNode({
    t: "[[nitrogen]] and [[oxygen]] [[molecules]] are {{c1::much smaller::size}} than the [[wavelength]] of [[visibile light]]",
  }),
  newNode({
    t: "the [[sun]] can appear yellow because {{c1::some of the blue has been scattered away ([[rayleigh scattering]])}}",
  }),
  newNode({
    t: "[[sunlight]] contains {{c1::all the colors of the visible spectrum}} ([[color]])",
  }),
  newNode({
    t: "the {{c2::[[frequency]]/[[wavelength]]}} of a light [[photon]] determines its {{c1::[[color]]}}",
  }),
  newNode({
    t: "{{c2::[[white light]]}} is all the {{c1::[[visible light]] combined}}",
  }),
  newNode({
    t: "{{c1::violet}} [[wavelength]]: {{c2::400-450[[nm]]}}",
  }),
  newNode({
    t: "{{c1::blue}} [[wavelength]]: {{c2::450-495[[nm]]}}",
  }),
  newNode({
    t: "{{c1::green}} [[wavelength]]: {{c2::495-570[[nm]]}}",
  }),
  newNode({
    t: "{{c1::yellow}} [[wavelength]]: {{c2::570-590[[nm]]}}",
  }),
  newNode({
    t: "{{c2::orange}} [[wavelength]]: {{c1::590-620[[nm]]}}",
  }),
  newNode({
    t: "{{c1::red}} [[wavelength]]: {{c2::620-750[[nm]]}}",
  }),
  newNode({
    t: "{{c1::wavelength}} is {{c2::physical distance between peaks of a [[wave]]}}",
    a: ["wavelength"],
    ex: [
      "{{c1::longer}} [[wavelengths]] appear {{c2::more stretched}} on a graph",
    ],
  }),
  newNode({
    t: "{{c1::[[nanometer]]}} = {{c2::a billionth}} of a meter",
    a: ["nanometer", "nm"],
    ex: ["a sheet of paper is {{c1::100,000 [[nm]]}} thick"],
  }),
  newNode({
    t: "{{c1::[[frequency]]}} is the number of {{c2::cycles per second}}",
    a: ["frequency"],
  }),
  newNode({
    t: "[[frequency]] is measured in {{c1::[[hertz]]}}",
  }),
  newNode({
    t: "{{c1::[[hertz]]}} is {{c2::cycles per second}}",
    a: ["hertz", "hz"],
  }),
  newNode({
    t: "in {{c1::a [[vacuum]]}}, {{c2::the [[speed of light]]}} is {{c3::~300million m/s}}",
  }),
  newNode({
    t: "the effective [[speed of light]] {{c1::slows down}} when {{c2::passing through a atom}}",
    ex: [
      "the effective [[speed of light]] is slower {{c1::through a medium}} because {{c2::each time it passes through an [[atom]] there is a tiny delay}}",
      "when a [[photon]] {{c1::enters an [[atom]] and then exits}}, there is {{c2::a delay}}",
    ],
  }),
  newNode({
    t: "{{c1::[[wavelength]]}} = {{c2::[[speed of light]]}} / {{c3::[[frequency]]}}",
  }),
  newNode({
    t: "{{c1::[[frequency]]}} = {{c2::[[speed of light]]}} / {{c3::[[wavelength]]}}",
  }),
  newNode({
    t: "{{c1::[[speed of light]]}} = {{c2::[[wavelength]] * [[frequency]]::equation}}",
    a: ["speed of light", "c"],
  }),
  newNode({
    t: "{{c1::higher}} [[frequency]] = {{c2::higher}} [[energy]]",
  }),
  newNode({
    t: "in the [[atmosphere]], violet light is scattered {{c1::more}} than blue light",
  }),
  newNode({
    t: "the sky is blue and not purple because {{c1::the [[sun]] emits less violet than blue light}} and {{c2::our eyes are more sensitive to blue than violet}}",
  }),
  newNode({
    t: "the {{c3::[[atmosphere]]}} is full of mostly {{c1::[[nitrogen]]}} and {{c2::[[oxygen]]}} particles",
    a: ["atmosphere"],
  }),
  newNode({
    t: "the {{c1::[[lens]]}} in the eye {{c2::focuses the light onto the [[retina]]}}",
    a: ["lens"],
  }),
  newNode({
    t: "the [[retina]] is in {{c1::the back of the eye}}",
    a: ["retina"],
  }),
  newNode({
    t: "in {{c2::very dim light}} we see in {{c1::grayscale}}, because {{c3::you are using [[rods]], not [[cones]]}}",
  }),
  newNode({
    t: "{{c1::[[cones]]}} are responsible for seeing [[color]]",
    a: ["cones"],
  }),
  newNode({
    t: "{{c1::[[rods]]}} in the eyes are responsible for {{c2::detecting motion}}, {{c3::peripheral vision}}, and {{c4::low-light vision}}",
    a: ["rods"],
  }),
  newNode({
    t: "[[cones]] require much {{c1::brighter}} light to function than [[rods]]",
  }),
  newNode({
    t: "[[cones]] see in {{c1::fine}} detail",
  }),
  newNode({
    t: "the three types of {{c1::[[cones]]}} in the eye are {{c2::short, medium, and long (s, m, l)}}",
  }),
  newNode({
    t: "{{c1::s}} [[cones]] see peak [[wavelengths]] {{c2::420nm}}",
  }),
  newNode({
    t: "{{c1::m}} [[cones]] see peak [[wavelengths]] {{c2::530nm}}",
  }),
  newNode({
    t: "{{c1::L}} [[cones]] see peak [[wavelengths]] {{c2::560nm}}",
  }),
  // newNode({
  //   t: "all [[electromagnetic radiation]] travels at {{c1::the [[speed of light]]}}",
  // }),
  newNode({
    t: "{{c1::[[radio wave]]}} [[wavelength]]: {{c2::>1 meter}}",
    a: ["radio wave"],
  }),
  newNode({
    t: "{{c1::[[microwave]]}} [[wavelength]]: {{c2::1mm to 1m}}",
    a: ["microwave"],
  }),
  newNode({
    t: "{{c1::[[infrared]]}} [[wavelength]]: {{c2::700nm to 1mm}}",
    a: ["infrared", "IR"],
    ex: ["{{c1::[[infrared]]}} is abbreviated as {{c2::IR}}"],
  }),
  newNode({
    t: "{{c1::[[visible light]]}} [[wavelength]]: {{c2::400-700nm}}",
    a: ["visible light", "light"],
  }),
  newNode({
    t: "{{c1::[[ultraviolet]]}} [[wavelength]]: {{c2::10-400nm}}",
    a: ["ultraviolet", "UV"],
  }),
  newNode({
    t: "{{c1::[[x-ray]]}} [[wavelength]]: {{c2::0.01-10nm}}",
    a: ["x-ray"],
  }),
  newNode({
    t: "{{c1::[[gamma ray]]}} [[wavelengths]]: {{c2::<0.01nm}}",
    a: ["gamma ray"],
  }),
  newNode({
    t: "mnemonic for the [[electromagnetic radiation]] is:  {{c1::Grandma's Xylophone Unfortunately Vibrates In My Room}}",
  }),
  newNode({
    t: "the [[mass]] of a [[photon]] is {{c1::nothing}}",
  }),
  newNode({
    t: "a [[photon]] travels at {{c1::the [[speed of light]]}}",
  }),
  newNode({
    t: "a blue light [[photon]] has more [[energy]] than a red one because {{c1::it has a higher [[frequency]]}}",
  }),
  newNode({
    t: "light warms your skin because {{c1::it absorbs [[energy]] from [[photons]]}}",
  }),
  newNode({
    t: "you see things because {{c1::[[photons]] bounces off that object and into your eyes}}",
    ex: [
      "if you shine a light on something, you can only see the light in the air if {{c1::it bounces off something and into your eye}}",
    ],
  }),

  newNode({
    t: "colors in objects are based on {{c1::[[wavelengths]] it reflects or [[absorbs]]}}",
    ex: [
      "a red apple appears red because {{c1::it absorbs most [[wavelengths]] and strongly reflects red [[wavelengths]]}}",
      "if you put a red ball in a dark room with a pure blue light, the ball would look {{c1::black}}",
      "something is {{c1::white::[[color]]}} because {{c2::it reflects almost all [[wavelengths]]}}",
      "something is {{c1::gray::[[color]]}} because {{c2::it reflects all [[wavelengths]] EVENLY but only absorbs some}}",
      "something is {{c1::black::[[color]]}} because {{c2::it absorbs almost all [[wavelengths]]}}",
    ],
  }),
  newNode({
    t: `when an object absorbs [[photons]], it's [[energy]] (in heat) is increased`,
    ex: [
      "black items get hotter faster because {{c1::they absorb most [[photons]], meaning more [[energy]] is transferred to the object}}",
      "if a blue and red object both absorb the same number of [[photons]], the {{c1::red one}} would heat up faster, because {{c2::the blue one reflects the high-[[energy]] blue [[photons]], whereas the red one reflects low-[[energy]] red [[photons]]}}",
    ],
  }),
  newNode({
    t: "the {{c1::[[energy]] of a single [[photon]]}} is {{c2::E = h * f (h = [[Planck's constant]], f = [[frequency]])}}",
    ex: [
      "a single {{c2::green}} [[photon]] is APPROXIMATELY {{c1::\\(4 \\times 10^{-19}\\)}} [[Joules]]",
      "you shine a perfectly red and a perfectly blue light at something. the {{c2::blue one}} will heat it up {{c1::faster}}",
      "blue light heats an object faster than red light of the same intensity, because {{c1::it has a higher [[frequency]], thus more [[energy]]}}",
    ],
  }),
  newNode({
    t: "{{c1::[[Planck's constant]]}} is {{c2::6.626}} * 10^{{c3::-34 J * s}}",
    a: ["Planck's constant", "h"],
  }),
  newNode({
    t: "{{c1::[[energy]]}} is measured in {{c2::[[Joules]]}}",
    a: ["energy"],
    ex: [
      "lifting a {{c1::small apple (100g)}} {{c2::one meter straight up}} costs {{c3::~1 [[Joule]]}}",
    ],
  }),
  newNode({
    t: "{{c1::[[energy]]}} is {{c2::the capacity to cause change}}",
  }),
  newNode({
    t: "if you were to turn the [[sun]] off and shine a really bright white narrow flashlight into the sky, it would {{c1::look blue}} because {{c2::of [[rayleigh scattering]]}}",
  }),
  newNode({
    t: "[[x-rays]], [[gamma rays]], and [[light]] are all {{c1::[[electromagnetic radiation]]}}",
    a: ["electromagnetic radiation"],
  }),
  newNode({
    t: "a {{c1::[[photon]]}} is a {{c2::particle of [[electromagnetic radiation]]}}",
    a: ["photon", "photons"],
  }),
  newNode({
    t: "sunrise/sunset appears red because {{c1::light must travel through hundreds of more miles of [[atmosphere]] to reach you, scattering it more}}",
  }),
];

const testNodes: KnowledgeNode[] = [
  ...LEARNING_NODES,
  ...PHYS_NODES,
  // newNode({
  //   a: ["rayleigh scattering equation"],
  //   t: `[[rayleigh scattering]] equation is "{{c1::intensity of scattering}} is {{c2::proportional to}} {{c3::([[frequency]] ^ 4)}}"`,
  //   ex: [
  //     `if you {{c1::double}} the [[wavelength]], the [[rayleigh scattering]] {{c2::decreases by a factor of 16 (2^4)}}`,
  //     `if you {{c1::half the}} [[wavelength]], the [[rayleigh scattering]] {{c2::increases by a factor of 16 (2^4)}}`,
  //   ],
  // }),
  // newNode({
  //   a: ["wavelength", "λ"],
  //   t: `{{c2::wavelength}} is "{{c1::distance between successive peaks of a [[wave]]}}"`,
  //   ex: [
  //     `if you {{c1::double}} the [[frequency]] in same medium, the [[wavelength]] {{c2::halves}}`,
  //   ],
  // }),
  // newNode({
  //   a: ["frequency"],
  //   t: `frequency is "{{c1::number of [[wave]] cycles per unit time}}"`,
  //   ex: [
  //     `if you {{c1::double}} the [[frequency]], the [[period]] {{c2::halves}}`,
  //   ],
  // }),
  // newNode({
  //   a: ["T", "period"],
  //   t: `period is "{{c1::time for one complete cycle of a [[wave]]}}"`,
  // }),
  // newNode({
  //   a: ["rayleigh scattering"],
  //   t: `rayleigh scattering is "{{c1::scattering of [[photons]] by [[atoms]] much smaller than the [[wavelength]] of the [[photon]]}}"`,
  // }),
  // newNode({
  //   a: ["photon", "photons"],
  //   t: `photon is "{{c1::quantum of [[electromagnetic radiation]]}}"`,
  // }),
  // newNode({
  //   a: ["atom", "atoms"],
  //   t: `atom is "{{c1::smallest unit of a [[chemical element]]}}"`,
  // }),
  // newNode({
  //   a: ["wave", "waves"],
  //   t: `wave is "{{c1::disturbance that propagates through space and time, carrying [[energy]] without transporting matter}}"`,
  //   ex: [
  //     `{{c1::mechanical waves}} (sound, water) require a {{c2::medium}} to travel`,
  //     `{{c1::electromagnetic waves}} (light, radio) can travel through {{c2::vacuum}}`,
  //   ],
  // }),
  // newNode({
  //   a: ["electromagnetic radiation", "EM radiation", "electromagnetic waves"],
  //   t: `electromagnetic radiation is "{{c1::energy that travels in [[wave]] form and includes all wavelengths from radio waves to gamma rays}}"`,
  // }),
  // newNode({
  //   a: ["energy"],
  //   t: `energy is "{{c1::ability to cause change}}"`,
  // }),
];

export { testNodes };
