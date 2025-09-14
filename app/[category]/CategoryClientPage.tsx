"use client";

import Link from "next/link";
import MaybeImage from "@/components/MaybeImage";
import { titleCase } from "../../lib/notes/utils";
import { noteIconSources } from "@/lib/assets";
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
      <div className={styles.grid}>
        {notes.map((n) => (
          <Link key={n.slug} className={styles.card} href={`/${category}/${n.slug}`}>
            <div className={styles.cardImageWrap}>
              <MaybeImage
                sources={noteIconSources(category, n.slug)}
                alt=""
                width={1200}
                height={1200}
                className={styles.cardImage}
              />
              <div className={styles.cardTitle}>{n.title}</div>
            </div>
          </Link>
        ))}
      </div>
      <Link href="/" className={styles.backLink}>
        Back
      </Link>
    </div>
  );
}
