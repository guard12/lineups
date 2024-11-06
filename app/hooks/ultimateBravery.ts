import type { PlayerProps, Spots } from '@/app/types';

export const useUltimateBravery = () => {
  const shuffleArray = (playerList: PlayerProps[]) => {
    const shuffled = [...playerList];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Randomize players into spots
  const randomizePlayers = ({ spots, playerList }: { spots: Spots; playerList: PlayerProps[] }) => {
    const numberOfPlayers = playerList.length;
    const maxSpots = Math.min(numberOfPlayers, Object.keys(spots).length);

    // Create a new spots object with only the necessary number of spots
    const adjustedSpots = Object.keys(spots)
      .slice(0, maxSpots)
      .reduce((acc, key) => {
        acc[key] = spots[key];
        return acc;
      }, {} as Spots);

    const shuffledPlayers = shuffleArray(playerList);
    const newSpots = { ...adjustedSpots };
    const remainingPlayers = [...playerList];

    // Assign each spot a player until no more players or spots
    Object.keys(newSpots).forEach((spotId, index) => {
      newSpots[spotId] = shuffledPlayers[index] || null;
      if (shuffledPlayers[index]) {
        remainingPlayers.splice(remainingPlayers.indexOf(shuffledPlayers[index]), 1);
      }
    });

    return { spots: newSpots, remainingPlayers };
  };

  return { randomizePlayers };
};
