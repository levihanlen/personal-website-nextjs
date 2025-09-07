// the new sysetm is based off MENTAL MODELS/CONCEPTS

interface NodeClusterType {
  p: string; // parent
  c?: NodeClusterType[]; // c
  // children consists of
  // - clarifying/explanation
  // - why
  // applications (examples)
  a?: string[]; // aliases
  n?: string[]; // notes
}

// function cluster() {}

// example cluster
const RAYLEIGH_SCATTERING_CLUSTER: NodeClusterType = {
  a: ["rayleigh scattering"],
  p: "rayleigh scattering is how [[photons]] are scattered by [[molecules]] much smaller than the [[wavelength]] of the [[photon]]",
  c: [
    {
      p: "the sky is blue because of something called {{c1::[[rayleigh scattering]]}}",
      c: [
        {
          p: "shadows outside are {{c2::blue-ish}} because of {{c1::[[rayleigh scattering]]}}",
        },
      ],
    },
    {
      p: `[[rayleigh scattering]] equation is "{{c1::intensity of scattering}} is {{c2::proportional to}} {{c3::([[frequency]] ^ 4)}}"`,
      c: [
        {
          p: "if you {{c1::half the}} [[wavelength]], the [[rayleigh scattering]] {{c2::increases by a factor of 16 (2^4)}}",
        },
        {
          p: "if you {{c1::double}} the [[wavelength]], the [[rayleigh scattering]] {{c2::decreases by a factor of 16 (2^4)}}",
        },
      ],
    },

    {
      p: "in the [[atmosphere]], violet light is scattered {{c1::more}} than blue light",
    },
    {
      p: "the sky is blue and not purple because {{c1::the [[sun]] emits less violet than blue light}} and {{c2::our eyes are more sensitive to blue than violet}}",
    },
    {
      p: "the {{c3::[[atmosphere]]}} is full of mostly {{c1::[[nitrogen]]}} and {{c2::[[oxygen]]}} particles",
    },

    {
      p: "[[nitrogen]] and [[oxygen]] [[molecules]] are {{c1::much smaller::size}} than the [[wavelength]] of [[visibile light]]",
    },
    {
      p: "the [[sun]] can appear yellow because {{c1::some of the blue has been scattered away ([[rayleigh scattering]])}}",
    },
    {
      p: "if you were to turn the [[sun]] off and shine a really bright white narrow flashlight into the sky, it would {{c1::look blue}} because {{c2::of [[rayleigh scattering]]}}",
    },
    {
      p: "sunrise/sunset appears red because {{c1::light must travel through hundreds of more miles of [[atmosphere]] to reach you, scattering it more}}",
    },
  ],
};
