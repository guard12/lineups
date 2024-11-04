"use client";
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'next/navigation'
import { useDrag, useDrop } from 'react-dnd';

import { useGetGame } from "@/app/hooks";
import { Label } from '@/components/ui/label';

type PlayerProps = {
  id: string;
  name: string;
};

interface SpotProps {
  onDrop: (item: { id: string; name: string }) => void;
  player?: { id: string; name: string } | null;
  position: string;
}

const DraggablePlayer: React.FC<PlayerProps> = ({ id, name }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'PLAYER',
    item: { id, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      // @ts-expect-error type error
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
      className="bg-slate-100 rounded-md p-2 mt-2"
    >
      {name}
    </div>
  );
};

const DroppableSpot: React.FC<SpotProps> = ({ onDrop, player, position }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'PLAYER',
    drop: (item: PlayerProps) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div>
      {position}
    <div
    // @ts-expect-error type error
      ref={drop}
      style={{
        width: '100px',
        height: '100px',
        border: '2px dashed gray',
        margin: '12px',
        backgroundColor: isOver ? 'lightgreen' : 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {player ? player.name : 'Empty Spot'}
    </div>
    </div>
  );
};


export default function CreateGame() {
  const params = useParams<{id: string}>();
  const { game } = useGetGame({ id: params.id });

  const [players, setPlayers] = useState([]);
  const [spots, setSpots] = useState<{ [key: string]: { id: string; name: string } | null }>({
    spot1: null,
    spot2: null,
    spot3: null,
    spot4: null,
    spot5: null,
    spot6: null,
  });

  useEffect(() => {
    if (game) {
      setPlayers(game.lineup);
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

  return (
  <DndProvider backend={HTML5Backend}>
    <div className="flex mt-8">
      <div className="w-1/6">
          <Label>Players</Label>
          {players && players.map((player: PlayerProps) => {
            return <DraggablePlayer
            key={player.id}
            id={player.id}
            name={player.name}
          />
          })}
      </div>
      <div className='flex flex-col flex-grow text-center text-'>
      <h1 className="font-bold">🏒 Lineup</h1>
      <div className="mt-4">
        <div className="flex justify-center">
          <DroppableSpot onDrop={(player) => handleDrop('spot1', player)} player={spots.spot1} position='G' />
        </div>
        <div className="flex justify-center">
          <DroppableSpot onDrop={(player) => handleDrop('spot2', player)} player={spots.spot2} position="LD" />
          <DroppableSpot onDrop={(player) => handleDrop('spot3', player)} player={spots.spot3} position="RD" />
        </div>
        <div className="flex justify-center">
          <DroppableSpot onDrop={(player) => handleDrop('spot4', player)} player={spots.spot4} position="LW" />
          <DroppableSpot onDrop={(player) => handleDrop('spot5', player)} player={spots.spot5} position="C" />
          <DroppableSpot onDrop={(player) => handleDrop('spot6', player)} player={spots.spot6} position="RW" />
        </div>
        </div>
      </div>
    </div>
  </DndProvider>
);
}