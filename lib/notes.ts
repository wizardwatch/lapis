import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import {
  convertLinks,
  convertStatblocks,
  replaceElements,
} from "./notes/renderer";
import { slugify, titleCase } from "./notes/utils";
import { loadElements } from "./server-utils";

// Simple note type handled via JSDoc

// Enable raw HTML rendering so stat blocks render correctly
const md = new MarkdownIt({ html: true });
const notesDir = path.join(process.cwd(), "..", "notes");

export function getCategories(): string[] {
  return fs
    .readdirSync(notesDir)
    .filter((d) => fs.statSync(path.join(notesDir, d)).isDirectory());
}

export interface Note {
  slug: string;
  title: string;
  players: string[];
  category: string;
  image?: string;
  session?: number | null;
  content: string;
}

function buildLinkIndex() {
  const index: Record<string, { category: string; slug: string }> = {};
  for (const category of fs.readdirSync(notesDir)) {
    const dir = path.join(notesDir, category);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const name of fs.readdirSync(dir)) {
      if (name.endsWith(".md")) {
        const slug = slugify(name);
        index[slug] = { category, slug };
      }
    }
  }
  return index;
}

export function getNotes(category: string, currentPlayer: string): Note[] {
  const dir = path.join(notesDir, category);
  if (!fs.existsSync(dir)) return [];
  const elements = loadElements(notesDir);
  const linkIndex = buildLinkIndex();
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const file = fs.readFileSync(path.join(dir, f), "utf8");
      const { data, content } = matter(file);
      const html = md.render(
        convertStatblocks(replaceElements(content, elements), elements),
      );
      // Normalize session to a number or null
      let session: number | null = null;
      if (typeof data.session === 'number') session = data.session;
      else if (typeof data.session === 'string') {
        const n = parseInt(data.session, 10);
        session = Number.isFinite(n) ? n : null;
      }
      return {
        slug: slugify(f),
        title: titleCase(data.name || data.title || slugify(f)),
        players: data.players || [], // Use data.players as per GEMINI.md
        image: data.image,
        category,
        session,
        content: convertLinks(html, linkIndex),
      };
    })
    .filter((note) => {
      if (currentPlayer === "DM") return true; // DM can see all lore
      if (!note.players || note.players.length === 0) return true; // Empty players array means all players can see it
      return note.players.includes(currentPlayer);
    });
}

export function getNote(
  category: string,
  slug: string,
  currentUser: string,
): Note | null {
  const dir = path.join(notesDir, category);
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir).filter((f) => slugify(f) === slug);
  if (files.length === 0) return null;
  const file = fs.readFileSync(path.join(dir, files[0]), "utf8");
  const { data, content } = matter(file);

  // Filter logic for single note
  if (currentUser !== "DM") {
    const players = data.players || [];
    if (players.length > 0 && !players.includes(currentUser)) {
      return null; // User not authorized to see this note
    }
  }

  const elements = loadElements(notesDir);
  const linkIndex = buildLinkIndex();
  const html = md.render(
    convertStatblocks(replaceElements(content, elements), elements),
  );
  // Normalize session
  let session: number | null = null;
  if (typeof data.session === 'number') session = data.session;
  else if (typeof data.session === 'string') {
    const n = parseInt(data.session, 10);
    session = Number.isFinite(n) ? n : null;
  }
  return {
    slug,
    title: titleCase(data.name || data.title || slug),
    players: data.players || [], // Use data.players as per GEMINI.md
    image: data.image,
    category,
    session,
    content: convertLinks(html, linkIndex),
  };
}

export function getUsernames(): string[] {
  const names = new Set(["DM"]); // Changed 'Dungeon Master' to 'DM' as per filtering logic
  for (const category of getCategories()) {
    // Temporarily pass 'DM' to get all notes for username collection
    for (const note of getNotes(category, "DM")) {
      for (const u of note.players || []) {
        names.add(u);
      }
    }
  }
  return Array.from(names).sort();
}
