'use client';
import styles from './NoteBody.module.scss';

export interface Note {
  category: string;
  users?: string[];
  content: string;
}

export default function NoteBody({ note }: { note: Note }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />
      </div>
    </div>
  );
}
