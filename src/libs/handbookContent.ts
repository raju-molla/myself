export const HANDBOOK_PUBLICATION_URL =
  "https://www.researchgate.net/publication/409673805_Penetration_Testing_Handbook";

export const HANDBOOK_BLOG_POST = {
  _id: "penetration-testing-handbook",
  title: "Introducing My Penetration Testing Handbook",
  slug: "penetration-testing-handbook",
  excerpt:
    "An introduction to my handbook and the importance of authorized, responsible security testing.",
  content: `I’m sharing my Penetration Testing Handbook as an educational resource for people exploring the field. Security testing should be carried out only with explicit authorization and a clearly agreed scope. Its purpose is to help system owners understand security risks and make informed improvements—not to access systems without permission.

The handbook is available through my ResearchGate publication. Visit the publication page to read the handbook and see its full contents.

This post is a brief introduction, not a substitute for the handbook or for professional training. Always follow applicable laws, written authorization, and the agreed rules of engagement.`,
  tags: ["Cybersecurity", "Penetration Testing", "Handbook"],
  author: "Raju Molla",
  status: "published",
  publishedAt: "2026-11-12T00:00:00.000Z",
  createdAt: "2026-11-12T00:00:00.000Z",
  views: 0,
};

export const HANDBOOK_PROJECT = {
  _id: "penetration-testing-handbook",
  title: "Penetration Testing Handbook",
  slug: "penetration-testing-handbook",
  description:
    "An educational penetration-testing handbook shared on ResearchGate. This listing links to the publication; it is not a source-code repository or a software license.",
  readme: `Format: Handbook / publication

This listing links to the published handbook on ResearchGate. It is an educational resource; no source-code repository or software license is implied.

Read the handbook: ${HANDBOOK_PUBLICATION_URL}`,
  techStack: ["Handbook", "Cybersecurity", "Authorized testing"],
  liveUrl: HANDBOOK_PUBLICATION_URL,
  stars: 0,
  featured: true,
  resourceType: "Handbook / publication",
  status: "published",
};
