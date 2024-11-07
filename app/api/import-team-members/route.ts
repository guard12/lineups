import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    const pw = searchParams.get('pw');
    const teamId = searchParams.get('teamId');

    const response = await fetch(`https://api.holdsport.dk/v1/teams/${teamId}/members`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Basic ' + btoa(`${email}:${pw}`),
      },
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching the teams from holdsport', reason: error }, { status: 500 });
  }
}
