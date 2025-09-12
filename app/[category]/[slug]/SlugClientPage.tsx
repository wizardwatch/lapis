'use client';

import Link from 'next/link';
import NoteBody from '../../../components/NoteBody';
import styles from './slug.module.scss';

interface Note {
  category: string;
  users?: string[];
  content: string;
}

export default function SlugClientPage({
  category,
  note,
}: {
  category: string;
  note: Note;
}) {
  return (
    <div className={styles.pageContainer}>
      <NoteBody note={note} />
      <Link href={`/${category}`} className={styles.backLink}>Back</Link>
    </div>
  );
}
