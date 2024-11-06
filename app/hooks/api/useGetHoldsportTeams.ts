import useSWRMutation from 'swr/mutation';

import type { HoldsportTeam } from '@/app/types';

async function getTeams(url: string, { arg }: { arg: { email: string; pw: string } }): Promise<HoldsportTeam[] | null> {
  const response = await fetch(`${url}?email=${encodeURIComponent(arg.email)}&pw=${encodeURIComponent(arg.pw)}`, {
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

export function useGetHoldsportTeams() {
  const { data, trigger, error, isMutating } = useSWRMutation(`/api/import-teams`, getTeams);

  return {
    error,
    data,
    isMutating,
    getTeamsFromHoldsport: trigger,
  };
}
