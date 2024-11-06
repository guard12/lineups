import { NextResponse } from 'next/server';
import { pool } from '../../../db';

import type { NextRequest } from 'next/server';
import type { GameDataRequest } from '@/app/types/game';

export async function POST(request: NextRequest) {
  try {
    const { name, team_a, team_b, game_date, description, game_type, lineup, id } = await request.json() as GameDataRequest;

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

    if (!game) {
      return NextResponse.json({ error: 'Game not found' });
    }

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
    return NextResponse.json({ error: 'Error fetching the game', reason: error }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, lineup } = await request.json();

    if (!id || !lineup) {
      return NextResponse.json({ error: 'Missing id or lineup data' }, { status: 400 });
    }

    const result = await pool.query(
      'UPDATE games SET lineup = $1 WHERE id = $2 RETURNING *',
      [lineup, id]
    );

    const updatedGame = result.rows[0];

    if (!updatedGame) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    const mappedResponse = {
      id: updatedGame.id,
      name: updatedGame.name,
      team_a: updatedGame.team_a,
      team_b: updatedGame.team_b,
      game_date: updatedGame.game_date,
      description: updatedGame.description,
      game_type: updatedGame.game_type,
      lineup: updatedGame.lineup,
    };

    return NextResponse.json(mappedResponse);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating the game', reason: error }, { status: 500 });
  }
};