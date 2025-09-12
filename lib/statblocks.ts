import yaml from 'js-yaml';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: true });

export function replaceElements(text: string, elements: Record<string, string> = {}): string {
  return text.replace(/\[\[element:([\w-]+)\]\]/g, (m, slug) => {
    return elements[slug] ? elements[slug] : m;
  });
}

function _md(text: string, elements: Record<string, string>): string {
  return md.render(replaceElements(text, elements));
}

export interface StatData {
  name?: string;
  ac?: string;
  hp?: string;
  speed?: string;
  [key: string]: any;
}

export function renderStatblock(
  data: StatData = {},
  elements: Record<string, string> = {}
): string {
  const parts = ['<aside class="stat-block">'];

  // Header with name
  if (data.name) {
    parts.push('<header class="stat-block-header">');
    parts.push(`<span class="block-name">${data.name}</span>`);
    parts.push('</header>');
  }

  // AC, HP, Speed grid
  const coreStats: { label: string; value?: string }[] = [];
  if (data.ac) coreStats.push({ label: 'AC', value: data.ac });
  if (data.hp) coreStats.push({ label: 'HP', value: data.hp });
  if (data.speed) coreStats.push({ label: 'Speed', value: data.speed });

  if (coreStats.length) {
    const statBoxes =
      coreStats
        .map(
          (s) =>
            `<div class="stat-box"><span class="stat-label">${s.label}</span><span class="stat-value">${s.value}</span></div>`
        )
        .join('');
    parts.push(`<section class="stat-grid">${statBoxes}</section>`);
  }

  // Ability score grid
  const abilitiesOrder = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  if (abilitiesOrder.some((k) => data[k])) {
    const cells = abilitiesOrder
      .filter((k) => data[k])
      .map(
        (k) =>
          `<div class="ability"><span class="abbr">${k.toUpperCase()}</span><span class="score">${data[k]}</span></div>`
      );
    parts.push(`<section class="abilities-grid">${cells.join('')}</section>`);
  }
  const renderItems = (items: any[]) => items.map(item => {
    if (typeof item === 'string') {
      return _md(item, elements);
    } else if (typeof item === 'object') {
      let line = '<p>';
      if (item.name) line += `<strong>${item.name}.</strong> `;
      line += _md(item.text || '', elements).replace(/^<p>|<\/p>\n?$/g, '');
      line += '</p>';
      return line;
    }
    return '';
  }).join('');

  ['traits','actions'].forEach(field => {
    if (data[field]) {
      const html = renderItems(Array.isArray(data[field]) ? data[field] : [data[field]]);
      const title = field.replace('_',' ').replace(/\b\w/g,c=>c.toUpperCase());
      parts.push(`<section class="${field}"><h4>${title}</h4>${html}</section>`);
    }
  });

  parts.push('</aside>');
  return parts.join('');
}

export function convertStatblocks(text: string, elements: Record<string, string> = {}): string {
  return text.replace(/```statblock\n([\s\S]*?)\n```/g, (match, block) => {
    let data: StatData = {};
    try {
      data = (yaml.load(block) as StatData) || {};
    } catch(err) {
      return match;
    }
    return renderStatblock(data, elements);
  });
}