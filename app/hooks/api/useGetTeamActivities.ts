import useSWRMutation from 'swr/mutation';

import type { HoldSportActivity } from '@/app/types/holdsport';

async function getActivities(
  url: string,
  { arg }: { arg: { email: string; pw: string; teamId: number } }
): Promise<HoldSportActivity[] | null> {
  const response = await fetch(
    `${url}?email=${encodeURIComponent(arg.email)}&pw=${encodeURIComponent(arg.pw)}&teamId=${arg.teamId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const error = await response.json();
    return Promise.reject(error);
  }

  return response.json();
}

export function useGetHoldsportTeamActivities() {
  const { data, trigger, error, isMutating } = useSWRMutation(`/api/import-activities`, getActivities);

  return {
    error,
    data,
    isMutating,
    getTeamActivitiesFromHoldsport: trigger,
  };
}
