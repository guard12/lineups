"use client";
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'next/navigation'
import { nanoid } from 'nanoid';
import { useDrag, useDrop } from 'react-dnd';

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useCreateGame, useGetGame } from "@/app/hooks";

type PlayerProps = {
  id: string;
  name: string;
};

interface SpotProps {
  onDrop: (item: { id: string; name: string }) => void;
  player?: { id: string; name: string } | null;
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
        padding: '8px',
        border: '1px solid gray',
        margin: '4px',
        backgroundColor: 'lightblue',
      }}
    >
      {name}
    </div>
  );
};

const DroppableSpot: React.FC<SpotProps> = ({ onDrop, player }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'PLAYER',
    drop: (item: PlayerProps) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
    // @ts-expect-error type error
      ref={drop}
      style={{
        width: '100px',
        height: '100px',
        border: '2px dashed gray',
        margin: '4px',
        backgroundColor: isOver ? 'lightgreen' : 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {player ? player.name : 'Empty Spot'}
    </div>
  );
};


export default function CreateGame() {
  const params = useParams<{id: string}>();
  const { createGame } = useCreateGame();
  const [textareaValue, setTextareaValue] = useState('');
  const [playersJson, setPlayersJson] = useState<PlayerProps[]>([]);
  const { game, isLoading } = useGetGame({ id: params.id });

  const [players, setPlayers] = useState(game?.lineup || []);
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

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value;
    setTextareaValue(input);
    
    // Split by new lines, filter out empty lines, and map to objects
    const playersArray = input
      .split('\n')
      .map((name) => name.trim()) // Trim spaces from each name
      .filter((name) => name) // Remove any empty lines
      .map((name) => ({ id: nanoid(12), name })); // Create an object for each name

    // Set players JSON array
    setPlayersJson(playersArray);
  };

  const handleCreateGame = () => {
    createGame({
      game_date: new Date().toISOString(),
      game_type: "friendly",
      name: "Test Game",
      lineup: JSON.stringify(playersJson),
      team_a: "Team A",
      team_b: "Team B",
      id: params.id,
     });
  };

  if (isLoading) return null;
  if (!game) return null;

  return (
  <DndProvider backend={HTML5Backend}>
    <div className="flex">
    <div className="max-w-96">
        <h1>Game</h1>
        {players ? players.map((player: PlayerProps) => {
          return <DraggablePlayer
          key={player.id}
          id={player.id}
          name={player.name}
        />
        }) : <>
          <Textarea rows={20} value={textareaValue} onChange={handleTextareaChange} placeholder="Enter one player name per line"/>
          <Button onClick={() => handleCreateGame()}>Create</Button>
        </>}
    </div>
    <div className='flex flex-col'>
      <h3>Lineup</h3>
      <div className="flex justify-center">
        <DroppableSpot onDrop={(player) => handleDrop('spot1', player)} player={spots.spot1} />
      </div>
      <div className="flex justify-center">
        <DroppableSpot onDrop={(player) => handleDrop('spot2', player)} player={spots.spot2} />
        <DroppableSpot onDrop={(player) => handleDrop('spot3', player)} player={spots.spot3} />
      </div>
      <div className="flex justify-center">
        <DroppableSpot onDrop={(player) => handleDrop('spot4', player)} player={spots.spot4} />
        <DroppableSpot onDrop={(player) => handleDrop('spot5', player)} player={spots.spot5} />
        <DroppableSpot onDrop={(player) => handleDrop('spot6', player)} player={spots.spot6} />
      </div>
      </div>
    </div>
  </DndProvider>
);
}