import useSWRMutation from 'swr/mutation';

import type { GameDataRequest } from '@/app/types/game';

async function patchGame(url: string, { arg }: { arg: Pick<GameDataRequest, 'id' | 'lineup'> }) {
  const response = await fetch(url, {
    method: 'PATCH',
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

export function usePatchGame() {
  const { trigger, error, isMutating, reset, data } = useSWRMutation(`/api/games`, patchGame);

  return {
    error,
    patchGame: trigger,
    isMutating,
    reset,
    data,
  };
}
