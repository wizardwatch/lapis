'use client';

import Link from 'next/link';
import { titleCase } from '../lib/notes/utils';
import styles from './page.module.scss';

interface Note {
  slug: string;
  title: string;
  users: string[];
  category: string;
  image?: string;
  content: string;
}

interface HomeClientPageProps {
  categories: string[];
}

export default function HomeClientPage({ categories }: HomeClientPageProps) {
  return (
    <div className={styles.pageContainer}>
      <ul className={styles.categoryList}>
        {categories.map((cat) => (
          <li key={cat} className={styles.categoryListItem}>
            <Link className={styles.categoryLink} href={`/${cat}`}>
              {titleCase(cat)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
