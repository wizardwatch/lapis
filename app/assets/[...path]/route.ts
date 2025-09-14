import { NextRequest } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const assetsRoot = path.join(process.cwd(), '..', 'assets');

function resolveSafePath(segments: string[] | string | undefined) {
  const rel = Array.isArray(segments) ? segments.join('/') : (segments || '');
  const normalized = path.normalize(rel).replace(/^([.][.][/\\])+/, '');
  const abs = path.resolve(path.join(assetsRoot, normalized));
  const rootAbs = path.resolve(assetsRoot);
  if (!abs.startsWith(rootAbs)) return null;
  return abs;
}

function inferMime(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.webp':
      return 'image/webp';
    case '.gif':
      return 'image/gif';
    case '.svg':
      return 'image/svg+xml';
    case '.ico':
      return 'image/x-icon';
    case '.avif':
      return 'image/avif';
    case '.bmp':
      return 'image/bmp';
    default:
      return 'application/octet-stream';
  }
}

async function readFileHeaders(filePath: string) {
  const mime = inferMime(filePath);
  return {
    'Content-Type': String(mime),
    'Cache-Control': 'public, max-age=31536000, immutable',
  } as Record<string, string>;
}

export async function GET(_req: NextRequest, ctx: { params: { path: string[] } }) {
  const filePath = resolveSafePath(ctx.params?.path);
  if (!filePath) return new Response('Forbidden', { status: 403 });
  try {
    const data = await fs.readFile(filePath);
    const headers = await readFileHeaders(filePath);
    return new Response(data, { headers });
  } catch (e) {
    return new Response('Not found', { status: 404 });
  }
}

export async function HEAD(_req: NextRequest, ctx: { params: { path: string[] } }) {
  const filePath = resolveSafePath(ctx.params?.path);
  if (!filePath) return new Response(null, { status: 403 });
  try {
    await fs.access(filePath);
    const headers = await readFileHeaders(filePath);
    return new Response(null, { headers });
  } catch (e) {
    return new Response(null, { status: 404 });
  }
}

export const runtime = 'nodejs';
