import sanitizeHtml from "sanitize-html";

const BLOG_HTML_OPTIONS = {
  allowedTags: [
    "a",
    "blockquote",
    "br",
    "code",
    "em",
    "h2",
    "h3",
    "h4",
    "hr",
    "i",
    "li",
    "ol",
    "p",
    "pre",
    "strong",
    "u",
    "ul",
  ],
  allowedAttributes: {
    a: ["href", "name", "target", "rel"],
  },
};

export default function sanitizeBlogContent(content) {
  return sanitizeHtml(content || "", BLOG_HTML_OPTIONS);
}
