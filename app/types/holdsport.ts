export type HoldsportTeam = {
  id: number;
  name: string;
};

export type HoldsportPlayer = {
  user_id: number;
  id: number;
  name: string;
  status: 'Unknown' | 'Selected' | 'Not attending' | 'Attending' | 'Not attending';
};

export type HoldSportActivity = {
  id: number;
  name: string;
  comment: string;
  activities_users: HoldsportPlayer[];
  event_type: 'Udebanekamp' | 'Hjemmebanekamp i KSF';
};

export type HoldsportTeamMember = {
  id: number;
  name: string;
  profile_picture_path: string;
};
