import useSWR from 'swr';

import type { GameDataResponse } from '@/app/types/game';

async function getGame(url: string) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const error = await response.json();
    return Promise.reject(error);
  }

  return response.json();
}

export function useGetGame({ id }: { id: string }) {
  const { data, isLoading, error } = useSWR<GameDataResponse>(`/api/games?id=${encodeURIComponent(id)}`, getGame, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  return {
    error,
    game: data,
    isLoading,
    data,
  };
}
