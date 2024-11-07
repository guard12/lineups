import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  useGetHoldsportTeams,
  useGetHoldsportTeamActivities,
  useImportPlayers,
  useGetHoldsportTeamMembers,
} from '@/app/hooks';

import type { HoldSportActivity, HoldsportTeam, HoldsportPlayer } from '@/app/types';

export const ImportPlayers = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data, getTeamsFromHoldsport, isMutating: isLoadingTeams } = useGetHoldsportTeams();
  const {
    data: activities,
    getTeamActivitiesFromHoldsport,
    isMutating: isLoadingActivities,
  } = useGetHoldsportTeamActivities();
  const { data: teamMembers, getTeamMembersFromHoldsport } = useGetHoldsportTeamMembers();
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
    const mappedPlayersWithProfilePictures = players.map((player) => {
      const teamMember = teamMembers?.find((teamMember) => player.user_id === teamMember.id);
      return {
        id: player.user_id,
        name: player.name,
        status: player.status,
        profile_picture_path: teamMember?.profile_picture_path,
        user_id: player.user_id,
      };
    });

    importPlayers(mappedPlayersWithProfilePictures);
  };

  const handleGetTeamActivities = async (teamId: number) => {
    await getTeamMembersFromHoldsport({ email, pw: password, teamId });
    await getTeamActivitiesFromHoldsport({ email, pw: password, teamId });
  };

  return (
    <div>
      <h1>Import from Holdsport</h1>
      <Input
        name="email"
        placeholder="Holdsport email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-2"
      />
      <Input
        name="password"
        type="password"
        placeholder="Holdsport password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-2"
      />
      <Button onClick={() => getHoldsportTeams()} className="mt-2" disabled={isLoadingTeams}>
        Import
      </Button>
      <ul>
        {data &&
          data.map((team: HoldsportTeam) => (
            <div key={team.id}>
              <li>{team.name}</li>
              <Button onClick={() => handleGetTeamActivities(team.id)} disabled={isLoadingActivities}>
                Get activities
              </Button>
            </div>
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
