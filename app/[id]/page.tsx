"use client";
import { useState } from "react";
import { useParams } from 'next/navigation'

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useCreateGame, useGetGame } from "@/app/hooks";

type Player = {
  name: string;
};


export default function CreateGame() {
  const params = useParams<{id: string}>();
  const { createGame } = useCreateGame();
  const [textareaValue, setTextareaValue] = useState('');
  const [playersJson, setPlayersJson] = useState<Player[]>([]);
  const { game } = useGetGame({ id: params.id });

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value;
    setTextareaValue(input);
    
    // Split by new lines, filter out empty lines, and map to objects
    const playersArray = input
      .split('\n')
      .map((name) => name.trim()) // Trim spaces from each name
      .filter((name) => name) // Remove any empty lines
      .map((name) => ({ name })); // Create an object for each name

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

  return (
    <div className="max-w-96">
        <h1>Game</h1>
        { game ? game.lineup.map((player: Player) => {
          return <div key={player.name}>{player.name}</div>
        }) : <>
          <Textarea rows={20} value={textareaValue} onChange={handleTextareaChange} placeholder="Enter one player name per line"/>
          <Button onClick={() => handleCreateGame()}>Create</Button>
        </>}
    </div>
);
}
