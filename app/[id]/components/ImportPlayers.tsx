import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useGetHoldsportTeams, useGetHoldsportTeamActivities, useImportPlayers } from '@/app/hooks';

import type { HoldSportActivity, HoldsportTeam, HoldsportPlayer } from '@/app/types';

export const ImportPlayers = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data, getTeamsFromHoldsport } = useGetHoldsportTeams();
  const { data: activities, getTeamActivitiesFromHoldsport } = useGetHoldsportTeamActivities();
  const { importPlayers } = useImportPlayers();

  const getHoldsportTeams = async () => {
    if (email && password) {
      return await getTeamsFromHoldsport({ email, pw: password });
    }
  };

  const handleImportPlayers = (activityId: number) => {
    if (!activities) return;
    const activity = activities.find((activity: HoldSportActivity) => activity.id === activityId);

    if (!activity) return;
    const players = activity.activities_users.filter(
      (activityUser: HoldsportPlayer) => activityUser.status === 'Attending'
    );
    importPlayers(players);
  };

  return (
    <div>
      <h1>Import from Holdsport</h1>
      <Input name="email" placeholder="Holdsport email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input
        name="password"
        type="password"
        placeholder="Holdsport password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={() => getHoldsportTeams()}>Import</Button>
      <ul>
        {data &&
          data.map((team: HoldsportTeam) => (
            <>
              <li key={team.id}>{team.name}</li>
              <Button onClick={() => getTeamActivitiesFromHoldsport({ email, pw: password, teamId: team.id })}>
                Get activities
              </Button>
            </>
          ))}
      </ul>
      <ul>
        {activities &&
          activities.map((activity: HoldSportActivity) => {
            if (activity.event_type === 'Udebanekamp') {
              return (
                <div key={activity.id}>
                  <li>Away game: {activity.name}</li>
                  <Button onClick={() => handleImportPlayers(activity.id)}>Import players</Button>
                </div>
              );
            }

            if (activity.event_type === 'Hjemmebanekamp i KSF') {
              return (
                <div key={activity.id}>
                  <li key={activity.id}>Home game: {activity.name}</li>
                  <Button onClick={() => handleImportPlayers(activity.id)}>Import players</Button>
                </div>
              );
            }

            return null;
          })}
      </ul>
    </div>
  );
};
