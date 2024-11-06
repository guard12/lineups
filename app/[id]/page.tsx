"use client";

import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'next/navigation';
import { UpdateIcon, TrashIcon, RocketIcon } from "@radix-ui/react-icons";

import { useGetGame, useUltimateBravery, usePatchGame } from "@/app/hooks";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { DraggablePlayer } from './components/DraggablePlayer';
import { DroppableSpot } from './components/DroppableSpot';

import type { PlayerProps, Spots } from '@/app/types';

const initialSpots: Spots = {
  spot1: null,
  spot2: null,
  spot3: null,
  spot4: null,
  spot5: null,
  spot6: null,
  spot7: null,
  spot8: null,
  spot9: null,
  spot10: null,
  spot11: null,
  spot12: null,
  spot13: null,
  spot14: null,
  spot15: null,
  spot16: null,
  spot17: null,
  spot18: null,
  spot19: null,
  spot20: null,
  spot21: null,
  spot22: null,
};

export default function CreateLineup() {
  const params = useParams<{id: string}>();
  const { game } = useGetGame({ id: params.id });
  const [players, setPlayers] = useState<PlayerProps[]>([]);
  const { randomizePlayers } = useUltimateBravery();
  const [spots, setSpots] = useState<Spots>(initialSpots);
  const { patchGame } = usePatchGame();

  useEffect(() => {
    if (game) {
      const newSpots = { ...initialSpots };
      const unassignedPlayers: PlayerProps[] = [];

      game.lineup.forEach((player: PlayerProps) => {
        if (player.position) {
          newSpots[player.position] = player;
        } else {
          unassignedPlayers.push(player);
        }
      });

      setSpots(newSpots);
      setPlayers(unassignedPlayers);
    }
  }, [game]);

  const handleDrop = (spotId: string, player: { id: string; name: string }) => {
    setSpots((prevSpots) => ({
      ...prevSpots,
      [spotId]: player,
    }));

    // Optionally, remove player from the original list to avoid duplication
    setPlayers((prevPlayers) => prevPlayers.filter((p: PlayerProps) => p.id !== player.id));
  };

  const handleSwap = (player: PlayerProps) => {
    setPlayers((prevList) => [...prevList, player]);
  };

  const handleRemove = (spotId: string) => {
    const playerToRemove = spots[spotId];
    if (playerToRemove) {
      setPlayers((prevList) => [...prevList, playerToRemove]);
      setSpots((prevSpots) => ({
        ...prevSpots,
        [spotId]: null,
      }));
    }
  };

  const handleUltimateBravery = () => {
    const { spots: newSpots, remainingPlayers } = randomizePlayers({ spots, playerList: players });
    setSpots(newSpots);
    setPlayers(remainingPlayers);
  };

  const handleResetLineup = () => {
    setSpots(initialSpots);
    setPlayers(game?.lineup || []);
  };

  const handleSaveLineup = async () => {
    if (!game) return;

    const playersWithPositions = game.lineup.map((player) => {
      const spotId = Object.keys(spots).find((spot) => spots[spot]?.id === player.id);
      return {
        ...player,
        position: spotId,
      };
    });

    await patchGame({
      id: game?.id,
      lineup: JSON.stringify(playersWithPositions),
    });
  };

  const isEnoughFor3Lines = players.length >= 12;
  const isEnoughFor4Lines = players.length >= 17;

  return (
  <DndProvider backend={HTML5Backend}>
    <div className="flex mt-8">
      <div className="w-1/6 border rounded-md p-2">
        <Label className="font-bold">Players</Label>
        {players && players.map((player: PlayerProps) => {
          return <DraggablePlayer
          key={player.id}
          id={player.id}
          name={player.name}
        />
        })}
      </div>
      <div className="flex flex-col gap-2">
        <Button
          onClick={handleUltimateBravery}
          variant="default"
          size="sm"
          className="ml-2"
        >
          <UpdateIcon /> Ultimate bravery
        </Button>
        <Button
          onClick={handleResetLineup}
          variant="default"
          size="sm"
          className="ml-2"
        >
          <TrashIcon /> Reset lineup
        </Button>
        <Button
          onClick={handleSaveLineup}
          variant="default"
          size="sm"
          className="ml-2"
        >
          <RocketIcon /> Save lineup
        </Button>
      </div>
      <div className='flex flex-col flex-grow text-center text-'>
        <h1 className="font-bold">🏒 Lineup</h1>
      <div className="mt-4">
        <div className="flex justify-center">
          <DroppableSpot
            id="spot1"
            onSwap={(existingPlayer) => handleSwap(existingPlayer)}
            onDrop={handleDrop}
            player={spots.spot1}
            position='G'
            onRemove={handleRemove}
          />
          <DroppableSpot
            id="spot2"
            onSwap={(existingPlayer) => handleSwap(existingPlayer)}
            onDrop={handleDrop}
            player={spots.spot2}
            position='G2'
            isSubstitue
            onRemove={handleRemove}
          />
        </div>
        <div className="flex gap-8 justify-center">
          <div className="flex border border-slate-900 rounded-md flex-col items-center p-4">
            <Label className="font-bold">Line 1</Label>
              <div className="flex">
                <DroppableSpot
                  id="spot3"
                  onSwap={(existingPlayer) => handleSwap(existingPlayer)}
                  onDrop={handleDrop}
                  player={spots.spot3}
                  position="LD"
                  onRemove={handleRemove}
                />
                <DroppableSpot
                  id="spot4"
                  onSwap={(existingPlayer) => handleSwap(existingPlayer)}
                  onDrop={handleDrop}
                  player={spots.spot4}
                  position="RD"
                  onRemove={handleRemove}
                />
              </div>
              <div className="flex">
                <DroppableSpot
                  id="spot11"
                  onSwap={(existingPlayer) => handleSwap(existingPlayer)}
                  onDrop={handleDrop}
                  player={spots.spot11}
                  position="LW"
                  onRemove={handleRemove}
                />
                <DroppableSpot
                  id="spot12"
                  onSwap={(existingPlayer) => handleSwap(existingPlayer)}
                  onDrop={handleDrop}
                  player={spots.spot12}
                  position="C"
                  onRemove={handleRemove}
                />
                <DroppableSpot
                  id="spot13"
                  onSwap={(existingPlayer) => handleSwap(existingPlayer)}
                  onDrop={handleDrop}
                  player={spots.spot13}
                  position="RW"
                  onRemove={handleRemove}
                />
              </div>
          </div>
        
          <div className="flex border border-slate-900 rounded-md flex-col items-center p-4">
            <Label className="font-bold">Line 2</Label>
            <div className="flex">
              <DroppableSpot
                id="spot5"
                onSwap={(existingPlayer) => handleSwap(existingPlayer)}
                onDrop={handleDrop}
                player={spots.spot5}
                position="LD"
                onRemove={handleRemove}
              />
              <DroppableSpot
                id="spot6"
                onSwap={(existingPlayer) => handleSwap(existingPlayer)}
                onDrop={handleDrop}
                player={spots.spot6}
                position="RD"
                onRemove={handleRemove}
              />
            </div>
            <div className="flex">
              <DroppableSpot
                id="spot14"
                onSwap={(existingPlayer) => handleSwap(existingPlayer)}
                onDrop={handleDrop}
                player={spots.spot14}
                position="LW"
                onRemove={handleRemove}
              />
              <DroppableSpot
                id="spot15"
                onSwap={(existingPlayer) => handleSwap(existingPlayer)}
                onDrop={handleDrop}
                player={spots.spot15}
                position="C"
                onRemove={handleRemove}
              />
              <DroppableSpot
                id="spot16"
                onSwap={(existingPlayer) => handleSwap(existingPlayer)}
                onDrop={handleDrop}
                player={spots.spot16}
                position="RW"
                onRemove={handleRemove}
              />
            </div>
          </div>
        </div>
        
        <div className="flex gap-8 justify-center">
        {isEnoughFor3Lines && 
          <div className="flex border border-slate-900 rounded-md flex-col mt-8 items-center p-4">
            <Label className="font-bold">Line 3</Label>
              <div className="flex">
                <DroppableSpot
                  id="spot7"
                  onSwap={(existingPlayer) => handleSwap(existingPlayer)}
                  onDrop={handleDrop}
                  player={spots.spot7}
                  position="LD"
                  onRemove={handleRemove}
                />
                <DroppableSpot
                  id="spot8"
                  onSwap={(existingPlayer) => handleSwap(existingPlayer)}
                  onDrop={handleDrop}
                  player={spots.spot8}
                  position="RD"
                  onRemove={handleRemove}
                />
              </div>
              <div className="flex">
                <DroppableSpot
                  id="spot17"
                  onSwap={(existingPlayer) => handleSwap(existingPlayer)}
                  onDrop={handleDrop}
                  player={spots.spot17}
                  position="LW"
                  onRemove={handleRemove}
                />
                <DroppableSpot
                  id="spot18"
                  onSwap={(existingPlayer) => handleSwap(existingPlayer)}
                  onDrop={handleDrop}
                  player={spots.spot18}
                  position="C"
                  onRemove={handleRemove}
                />
                <DroppableSpot
                  id="spot19"
                  onSwap={(existingPlayer) => handleSwap(existingPlayer)}
                  onDrop={handleDrop}
                  player={spots.spot19}
                  position="RW"
                  onRemove={handleRemove}
                />
              </div>
            </div>
          }

          {isEnoughFor4Lines &&
            <div className="flex border border-slate-900 rounded-md flex-col mt-8 items-center p-4">
              <Label className="font-bold">Line 4</Label>
              <div className="flex">
                <DroppableSpot
                  id="spot9"
                  onSwap={(existingPlayer) => handleSwap(existingPlayer)}
                  onDrop={handleDrop}
                  player={spots.spot9}
                  position="LD"
                  onRemove={handleRemove}
                />
                <DroppableSpot
                  id="spot10"
                  onSwap={(existingPlayer) => handleSwap(existingPlayer)}
                  onDrop={handleDrop}
                  player={spots.spot10}
                  position="RD"
                  onRemove={handleRemove}
                />
              </div>
              <div className="flex">
                <DroppableSpot
                  id="spot20"
                  onSwap={(existingPlayer) => handleSwap(existingPlayer)}
                  onDrop={handleDrop}
                  player={spots.spot20}
                  position="LW"
                  onRemove={handleRemove}
                />
                <DroppableSpot
                  id="spot21"
                  onSwap={(existingPlayer) => handleSwap(existingPlayer)}
                  onDrop={handleDrop}
                  player={spots.spot21}
                  position="C"
                  onRemove={handleRemove}
                />
                <DroppableSpot
                  id="spot22"
                  onSwap={(existingPlayer) => handleSwap(existingPlayer)}
                  onDrop={handleDrop}
                  player={spots.spot22}
                  position="RW"
                  onRemove={handleRemove}
                />
              </div>
            </div>
          }

          </div>
        </div>
      </div>
    </div>
  </DndProvider>
);
}