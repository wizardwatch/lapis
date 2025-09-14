'use client';

import Link from 'next/link';
import MaybeImage from '@/components/MaybeImage';
import { titleCase } from '../lib/notes/utils';
import { categoryIconSources } from '@/lib/assets';
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
      <div className={styles.grid}>
        {categories.map((cat) => (
          <Link key={cat} className={styles.card} href={`/${cat}`}>
            <div className={styles.cardImageWrap}>
              <MaybeImage
                sources={categoryIconSources(cat)}
                alt=""
                width={800}
                height={800}
                className={styles.cardImage}
              />
              <div className={styles.cardTitle}>{titleCase(cat)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
