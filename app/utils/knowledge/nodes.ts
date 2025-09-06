import { newNode } from "./create";
import { KnowledgeNode } from "./types";

const testNodes: KnowledgeNode[] = [
  newNode({
    a: ["rayleigh scattering equation"],
    t: `[[rayleigh scattering]] equation is "{{c1::intensity of scattering}} is {{c2::proportional to}} {{c3::([[frequency]] ^ 4)}}"`,
    ex: [
      `if you {{c1::double}} the [[wavelength]], the [[rayleigh scattering]] {{c2::decreases by a factor of 16 (2^4)}}`,
      `if you {{c1::half the}} [[wavelength]], the [[rayleigh scattering]] {{c2::increases by a factor of 16 (2^4)}}`,
    ],
  }),

  newNode({
    t: `valuable [[knowledge nodes]] {{change behavior}}`,
    ex: [
      `authors emphasize actionable insight because {{valuable [[knowledge nodes]] change behavior}}`,
    ],
  }),
  newNode({
    a: ["wavelength", "λ"],
    t: `{{c2::wavelength}} is "{{c1::distance between successive peaks of a [[wave]]}}"`,
    ex: [
      `if you {{c1::double}} the [[frequency]] in same medium, the [[wavelength]] {{c2::halves}}`,
    ],
  }),
  newNode({
    a: ["frequency"],
    t: `frequency is "{{c1::number of [[wave]] cycles per unit time}}"`,
    ex: [
      `if you {{c1::double}} the [[frequency]], the [[period]] {{c2::halves}}`,
    ],
  }),
  newNode({
    a: ["T", "period"],
    t: `period is "{{c1::time for one complete cycle of a [[wave]]}}"`,
  }),
  newNode({
    a: ["rayleigh scattering"],
    t: `rayleigh scattering is "{{c1::scattering of [[photons]] by [[atoms]] much smaller than the [[wavelength]] of the [[photon]]}}"`,
  }),
  newNode({
    a: ["photon", "photons"],
    t: `photon is "{{c1::quantum of [[electromagnetic radiation]]}}"`,
  }),
  newNode({
    a: ["atom", "atoms"],
    t: `atom is "{{c1::smallest unit of a [[chemical element]]}}"`,
  }),
  newNode({
    a: ["wave", "waves"],
    t: `wave is "{{c1::disturbance that propagates through space and time, carrying [[energy]] without transporting matter}}"`,
    ex: [
      `{{c1::mechanical waves}} (sound, water) require a {{c2::medium}} to travel`,
      `{{c1::electromagnetic waves}} (light, radio) can travel through {{c2::vacuum}}`,
    ],
  }),
  newNode({
    a: ["electromagnetic radiation", "EM radiation", "electromagnetic waves"],
    t: `electromagnetic radiation is "{{c1::energy that travels in [[wave]] form and includes all wavelengths from radio waves to gamma rays}}"`,
  }),
  newNode({
    a: ["energy"],
    t: `energy is "{{c1::ability to cause change}}"`,
  }),
];

export { testNodes };
