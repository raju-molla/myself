const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: ".env.local" });

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt: { type: String, trim: true, maxlength: 300 },
    content: { type: String, required: true },
    coverImage: { type: String, trim: true },
    tags: { type: [String], default: [] },
    author: { type: String, default: "Raju Molla" },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, required: true, trim: true, maxlength: 400 },
    readme: { type: String, trim: true },
    resourceType: { type: String, trim: true },
    repoUrl: { type: String, trim: true },
    liveUrl: { type: String, trim: true },
    coverImage: { type: String, trim: true },
    techStack: { type: [String], default: [] },
    stars: { type: Number, default: 0 },
    license: { type: String, default: "MIT" },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
const OpenSource =
  mongoose.models.OpenSource || mongoose.model("OpenSource", projectSchema);
const publishedAt = new Date("2026-11-12T00:00:00.000Z");

const blogs = [
  {
    title: "Introducing My Penetration Testing Handbook",
    slug: "penetration-testing-handbook",
    excerpt:
      "An introduction to my handbook and the importance of authorized, responsible security testing.",
    content:
      "<p>I’m sharing my Penetration Testing Handbook as an educational resource for people exploring the field. Security testing should be carried out only with explicit authorization and a clearly agreed scope. Its purpose is to help system owners understand security risks and make informed improvements—not to access systems without permission.</p><p>The handbook is available through my ResearchGate publication. Visit the publication page to read the handbook and see its full contents.</p><p>This post is a brief introduction, not a substitute for the handbook or for professional training. Always follow applicable laws, written authorization, and the agreed rules of engagement.</p><p><a href=\"https://www.researchgate.net/publication/409673805_Penetration_Testing_Handbook\" target=\"_blank\" rel=\"noopener noreferrer\">Read the handbook on ResearchGate</a></p>",
    tags: ["Cybersecurity", "Penetration Testing", "Handbook"],
    author: "Raju Molla",
    status: "published",
    publishedAt,
  },
  {
    title: "ScholarlyNotes: A Free Research Workspace for Papers, Citations and Notes",
    slug: "scholarlynotes-free-research-workspace",
    excerpt:
      "I built ScholarlyNotes to make academic research feel less scattered—from finding papers and organizing sources to taking cited notes and developing a draft.",
    content: `<p>If you are looking for a <strong>free research workspace</strong>, a way to organize academic papers, or a more connected workflow for a literature review, this is the project I built to help. ScholarlyNotes brings paper discovery, a personal research library, cited notes, and structured drafts into one workspace.</p>
      <h2>Why I built ScholarlyNotes</h2>
      <p>Research often starts with a promising paper and quickly becomes a collection of browser tabs, saved PDFs, scattered notes, reference lists, and unfinished drafts. I built ScholarlyNotes to give that work one connected home.</p>
      <p>ScholarlyNotes is a free-to-start research workspace for students, PhD researchers, academics, and independent scholars. It brings scholarly-paper discovery, a personal library, source-linked notes, and structured paper drafts together, so researchers can spend less time moving information between tools.</p>
      <h2>Find academic papers and organize your research</h2>
      <p>You can search more than 250 million scholarly works through OpenAlex, explore papers by title, topic, or author, and start discovering without an account. When you find a useful source, add it to your library with its metadata and abstract, then keep your collection organized and searchable.</p>
      <p>From a saved paper, you can explore related work through the citation graph and keep your own reading notes alongside the source. It makes the workflow from literature search to literature review easier to follow without losing where an idea came from.</p>
      <h2>Keep citations and notes connected</h2>
      <p>A good citation workflow should not mean retyping references every time you write. ScholarlyNotes lets you cite sources from your library in notes and drafts and create formatted references in APA, MLA, Chicago, Harvard, IEEE, or Vancouver style. You can also export a reference list as BibTeX.</p>
      <p>The goal is simple: keep the paper, your notes, and the citation together as your research develops. Your ideas and your writing remain yours.</p>
      <h2>AI that helps you read, never writes for you</h2>
      <p>ScholarlyNotes has a deliberate boundary for AI. Its Reading assistant can summarize a paper abstract in plain language, explain terms and methods, identify reported findings and limitations, or compare two to four saved papers. Every answer is labelled AI-generated and points back to the paper’s real abstract.</p>
      <p>The assistant does not write or rewrite your notes or drafts. Your notes, drafts, and reference lists are not sent to the AI assistant; when you ask for help with a paper, the paper’s title and abstract are used. <a href="https://scholarlynotes.com/ai-policy" target="_blank" rel="noopener noreferrer">Read the full ScholarlyNotes AI policy</a> for details about its boundaries and what information is used.</p>
      <h2>Stay on top of deadlines and new literature</h2>
      <p>Research rarely follows a neat schedule. ScholarlyNotes lets you track a submission deadline alongside your draft’s progress, and save searches to receive an email digest when new matching work appears. That gives you a practical way to keep a literature search moving without rerunning the same query every week.</p>
      <h2>Try the free research workspace</h2>
      <p>ScholarlyNotes is free to start, requires no credit card, and gives you control over your library: export it when you need to or delete it. If you have been looking for a research paper organizer, citation manager, or connected note-taking workspace for academic research, I invite you to explore it and see whether it fits your workflow.</p>
      <p><a href="https://scholarlynotes.com" target="_blank" rel="noopener noreferrer">Explore ScholarlyNotes</a></p>
      <p>Looking for more of my work? Explore the <a href="/east/open-source/scholarlynotes">ScholarlyNotes project page</a> or browse my other research and engineering articles.</p>`,
    tags: [
      "ScholarlyNotes",
      "Research Tools",
      "Academic Writing",
      "Citation Manager",
      "Literature Review",
    ],
    author: "Raju Molla",
    status: "published",
    publishedAt,
  },
];

const projects = [
  {
    title: "Penetration Testing Handbook",
    slug: "penetration-testing-handbook",
    description:
      "An educational penetration-testing handbook shared on ResearchGate. This listing links to the publication; it is not a source-code repository or a software license.",
    readme:
      "Format: Handbook / publication\n\nThis listing links to the published handbook on ResearchGate. It is an educational resource; no source-code repository or software license is implied.\n\nRead the handbook: https://www.researchgate.net/publication/409673805_Penetration_Testing_Handbook",
    resourceType: "Handbook / publication",
    liveUrl:
      "https://www.researchgate.net/publication/409673805_Penetration_Testing_Handbook",
    techStack: ["Handbook", "Cybersecurity", "Authorized testing"],
    stars: 0,
    license: "Not applicable",
    featured: true,
    status: "published",
  },
  {
    title: "ScholarlyNotes",
    slug: "scholarlynotes",
    description:
      "A free-to-start research workspace I created to help researchers discover scholarly papers, organize a personal library, keep cited notes, and develop paper drafts—with an AI assistant designed to help with reading, not writing.",
    readme:
      "ScholarlyNotes is a free-to-start online research workspace for students, scholars, and independent researchers.\n\nDiscover papers across the open scholarly record, save sources to a searchable library, write notes connected to your references, and develop structured paper drafts in one place. Generate references in APA, MLA, Chicago, Harvard, IEEE, or Vancouver style, or export them as BibTeX.\n\nIts read-only AI Reading assistant can summarize and explain paper abstracts, while your notes and drafts remain your own. The service is free to start and does not require a credit card.\n\nExplore ScholarlyNotes: https://scholarlynotes.com\nRead the project story: https://www.rajumolla.com/east/blog/scholarlynotes-free-research-workspace",
    resourceType: "Free research workspace",
    liveUrl: "https://scholarlynotes.com",
    techStack: [
      "Free to start",
      "Paper discovery",
      "Citation management",
      "Research notes",
      "AI-assisted reading",
    ],
    stars: 0,
    license: "Not applicable",
    featured: true,
    status: "published",
  },
];

async function migrateCollection(model, documents) {
  let inserted = 0;
  for (const document of documents) {
    const result = await model.updateOne(
      { slug: document.slug },
      { $setOnInsert: document },
      { upsert: true }
    );
    inserted += result.upsertedCount;
  }
  return inserted;
}

async function main() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not configured in .env.local");
  }

  await mongoose.connect(process.env.MONGO_URI);
  const blogCount = await migrateCollection(Blog, blogs);
  const projectCount = await migrateCollection(OpenSource, projects);
  console.log(`Migration complete: ${blogCount} blog posts and ${projectCount} resources added.`);
}

main()
  .catch((error) => {
    console.error("Featured content migration failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
