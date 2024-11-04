import { NextResponse } from 'next/server';
import { pool } from '../../../db';

import type { NextRequest } from 'next/server';
import type { GameData } from '@/app/types/game';

export async function POST(request: NextRequest) {
  try {
    const { name, team_a, team_b, game_date, description, game_type, lineup, id } = await request.json() as GameData;

    const result = await pool.query(
      'INSERT INTO games (id, name, team_a, team_b, game_date, description, game_type, lineup) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [id, name, team_a, team_b, game_date, description, game_type, lineup]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating game:', error);
    return NextResponse.json({ error: 'Error creating game' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    const result = await pool.query(
      'SELECT * FROM games WHERE id = $1',
      [id]
    );

    const game = result.rows[0];

    const mappedResponse = {
      id: game.id,
      name: game.name,
      team_a: game.team_a,
      team_b: game.team_b,
      game_date: game.game_date,
      description: game.description,
      game_type: game.game_type,
      lineup: game.lineup,
    };

    return NextResponse.json(mappedResponse);
  } catch (error) {
    console.error('Error fetching the game:', error);
    return NextResponse.json({ error: 'Error fetching the game' }, { status: 500 });
  }
}