import { NextResponse } from 'next/server';
import { getAllPlayers } from '@/lib/auth/mapping';

export async function GET() {
  // Return list of player names (exclude DMs for view-as targets)
  try {
    const players = getAllPlayers()
      .filter((p) => p.role === 'player')
      .map((p) => p.name)
      .sort((a, b) => a.localeCompare(b));
    return NextResponse.json({ players });
  } catch (e) {
    return NextResponse.json({ players: [] }, { status: 200 });
  }
}

export const runtime = 'nodejs';

