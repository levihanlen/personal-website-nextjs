import { newNode } from "./create";
import { KnowledgeNode } from "./types";

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
  newNode(
    ["λ", "wavelength"],
    `{{c2::wavelength}} is "{{c1::distance between successive peaks of a [[wave]]}}"`,
    [],
    [
      `if you {{c1::double}} the [[frequency]] in same medium, the [[wavelength]] {{c2::halves}}`,
    ]
  ),
  newNode(
    ["frequency"],
    `frequency is "{{c1::number of wave cycles per unit time}}"`,
    [],
    [`if you {{c1::double}} the [[frequency]], the [[period]] {{c2::halves}}`]
  ),
  newNode(
    ["T", "period"],
    `[[period]] is "{{c1::time for one complete cycle of a [[wave]]}}"`,
    [],
    []
  ),
  newNode(
    ["rayleigh scattering"],
    `[[rayleigh scattering]] is "{{c1::scattering of [[photons]] by [[atoms]] much smaller than the [[wavelength]] of the [[photon]]}}"`,
    [],
    []
  ),
];

export { testNodes };
