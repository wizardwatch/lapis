'use client';
import React from 'react';

type Props = {
  src?: string; // single source
  sources?: string[]; // multiple candidates (png, jpg, ...)
  alt?: string;
  width: number;
  height: number;
  className?: string;
};

export default function MaybeImage({ src, sources, alt = '', width, height, className }: Props) {
  const list = React.useMemo(() => (sources && sources.length ? sources : (src ? [src] : [])), [src, sources]);
  const [idx, setIdx] = React.useState(0);
  if (list.length === 0 || idx >= list.length) return null;
  const current = list[idx];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setIdx((i) => i + 1)}
    />
  );
}
