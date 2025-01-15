export function findWriteTime(chars: number) {
  return Math.max(Math.round((chars / 5 / 250) * 15), 1);
}

export function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function gradient(url: string) {
  return `linear-gradient(hsla(120, 0%, 0%, 0.7), hsla(120, 0%, 0%, 0.7)), url(${url})`;
}

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}
