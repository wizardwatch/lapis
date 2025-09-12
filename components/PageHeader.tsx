import Image from 'next/image';
import type { ReactNode } from 'react';
import styles from './PageHeader.module.scss';

export default function PageHeader({
  title,
  image,
  children,
}: {
  title: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className={styles.pageHeader}>
      <div className={styles.pageHeaderContent}>
        {image && (
          <div className={styles.pageHeaderImageContainer}>
            <Image
              src={image}
              alt=""
              width={1200}
              height={600}
              className={styles.pageHeaderImage}
            />
          </div>
        )}
        <h1 className={styles.pageHeaderTitle}>{title}</h1>
        {children}
      </div>
    </section>
  );
}