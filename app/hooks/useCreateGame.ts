import useSWRMutation from 'swr/mutation'

import type { GameData } from '@/app/types/game';

async function createGame(url: string, { arg }: { arg: GameData }) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return Promise.reject(error);
  }

  return response.json();
}

export function useCreateGame() {
  const { trigger, error, isMutating, reset, data } = useSWRMutation(
    `/api/games`,
    createGame,
  );

  return {
    error,
    createGame: trigger,
    isMutating,
    reset,
    data,
  };
}
