import { atom, useAtom } from 'jotai';
import { nanoid } from 'nanoid';

import type { PlayerProps } from '@/app/types';

const playersAtom = atom<PlayerProps[]>([]);

export const useSimpleLineupPlayers = () => {
  const [players, setPlayers] = useAtom(playersAtom);

  const setPlayersFromInput = (input: string) => {
    // Split by new lines, filter out empty lines, and map to objects
    const playersArray = input
      .split('\n')
      .map((name) => name.trim()) // Trim spaces from each name
      .filter((name) => name) // Remove any empty lines
      .map((name) => ({ id: nanoid(12), name })); // Create an object for each name

    setPlayers(playersArray);
  };

  return {
    players,
    setPlayers,
    setPlayersFromInput,
  };
};
