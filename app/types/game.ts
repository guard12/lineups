import type { PlayerProps } from "./player";

export type GameDataRequest = {
  id?: string;
  name: string;
  team_a: string;
  team_b: string;
  game_date: string;
  description?: string;
  game_type: 'friendly' | 'league';
  lineup: string;
}

export type GameDataResponse = {
  id?: string;
  name: string;
  team_a: string;
  team_b: string;
  game_date: string;
  description?: string;
  game_type: 'friendly' | 'league';
  lineup: PlayerProps[];
}

export type Spots = {
  [key: string]: { id: string; name: string } | null
};