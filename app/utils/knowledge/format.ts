import { capitalize } from "../utils";

function formatKnowledgeText(text: string): string {
  // Remove brackets from {{}} but keep content
  let formatted = text.replace(/\{\{(.*?)\}\}/g, "$1");

  // Replace [[]] with underlined content (remove brackets, add underline)
  formatted = formatted.replace(
    /\[\[(.*?)\]\]/g,
    "<span class=' underline decoration-medium'>$1</span>"
  );
  // formatted = formatted.replace(/\[\[(.*?)\]\]/g, "$1");

  // Remove cloze hints like c1::, c2::, etc.
  formatted = formatted.replace(/c\d+::/g, "");

  return capitalize(formatted);
}

export { formatKnowledgeText };
