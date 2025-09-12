"use client";

import Link from "next/link";
import { titleCase } from "../../lib/notes/utils";
import styles from "./category.module.scss";

interface Note {
  slug: string;
  title: string;
  players: string[];
  category: string;
  image?: string;
  content: string;
}

export default function CategoryClientPage({
  category,
  notes,
}: {
  category: string;
  notes: Note[];
}) {
  return (
    <div className={styles.pageContainer}>
      <ul className={styles.noteList}>
        {notes.map((n) => (
          <li key={n.slug} className={styles.noteListItem}>
            <Link className={styles.noteLink} href={`/${category}/${n.slug}`}>
              {n.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/" className={styles.backLink}>
        Back
      </Link>
    </div>
  );
}
