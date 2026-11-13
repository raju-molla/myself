import sanitizeHtml from "sanitize-html";

const BLOG_HTML_OPTIONS = {
  allowedTags: [
    "a",
    "blockquote",
    "br",
    "code",
    "div",
    "em",
    "figure",
    "figcaption",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "i",
    "img",
    "li",
    "ol",
    "p",
    "pre",
    "span",
    "strong",
    "u",
    "ul",
  ],
  allowedAttributes: {
    a: ["href", "name", "target", "rel"],
    img: ["src", "alt", "title", "width", "height", "loading", "decoding"],
    "*": ["class"],
  },
  allowedSchemes: ["http", "https", "mailto"],
};

export default function sanitizeBlogContent(content) {
  return sanitizeHtml(content || "", BLOG_HTML_OPTIONS);
}
