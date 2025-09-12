import fs from 'fs';
import path from 'path';
import { convertStatblocks, replaceElements } from '../statblocks';
import { slugify } from './utils';

export function convertLinks(  html: string,  linkIndex: Record<string, { category: string; slug: string }>): string {  return html.replace(/\[\[([^\]]+)\]\]/g, (m, name) => {    if (name.startsWith('element:')) return m;    const slug = slugify(name);    const target = linkIndex[slug];    return target      ? `<a href="/${target.category}/${target.slug}" class="link link-primary">${name}</a>`      : name;  });}

export { convertStatblocks, replaceElements };
