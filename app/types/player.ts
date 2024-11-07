import type { Spots } from './game';

export type PlayerProps = {
  id: string;
  name: string;
  position?: keyof Spots;
  profile_picture_path?: string;
};
