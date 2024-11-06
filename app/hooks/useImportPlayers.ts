import { atom, useAtom } from 'jotai';

import type { HoldsportPlayer } from '@/app/types';

const playersAtom = atom<HoldsportPlayer[]>([]);

export const useImportPlayers = () => {
  const [players, setPlayers] = useAtom(playersAtom);

  const importPlayers = async (players: HoldsportPlayer[]) => {
    setPlayers(players);
  };

  return {
    players,
    importPlayers,
  };
};
