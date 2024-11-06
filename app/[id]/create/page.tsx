'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { nanoid } from 'nanoid';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useAtom } from 'jotai';
import Link from 'next/link';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { useCreateGame, useImportPlayers } from '@/app/hooks';
import { gameNameAtom } from '@/app/atoms';
import { ImportPlayers } from '../components/ImportPlayers';

import type { HoldsportPlayer, PlayerProps } from '@/app/types';

export default function CreateGame() {
  const params = useParams<{ id: string }>();
  const { createGame } = useCreateGame();
  const { players } = useImportPlayers();
  const [textareaValue, setTextareaValue] = useState('');
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [date, setDate] = useState<Date>();
  const [playersJson, setPlayersJson] = useState<PlayerProps[]>([]);
  const [gameName, setGameName] = useAtom(gameNameAtom);

  useEffect(() => {
    setTextareaValue(players.map((player: HoldsportPlayer) => player.name).join('\n'));
  }, [players]);

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value;
    setTextareaValue(input);

    // Split by new lines, filter out empty lines, and map to objects
    const playersArray = input
      .split('\n')
      .map((name) => name.trim()) // Trim spaces from each name
      .filter((name) => name) // Remove any empty lines
      .map((name) => ({ id: nanoid(12), name })); // Create an object for each name

    setPlayersJson(playersArray);
  };

  const handleCreateGame = async () => {
    if (!date || !homeTeam || !awayTeam || playersJson.length === 0) return;
    await createGame({
      game_date: date.toISOString(),
      game_type: 'friendly',
      name: gameName,
      lineup: JSON.stringify(playersJson),
      team_a: homeTeam,
      team_b: awayTeam,
      id: params.id,
    });
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col w-1/4 mt-8">
        <div className="flex flex-col gap-4">
          <div>
            <Label>Name of the game</Label>
            <Input
              id="name"
              placeholder="🍺 Beer competition"
              className="mt-2"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
            />
          </div>
          <div>
            <Label>Home team name</Label>
            <Input
              id="name"
              placeholder="Rusty Nutcrackers"
              className="mt-2"
              value={homeTeam}
              onChange={(e) => setHomeTeam(e.target.value)}
            />
          </div>
          <div>
            <Label>Away team name</Label>
            <Input
              id="name"
              placeholder="Gray old boys"
              className="mt-2"
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <Label>Date of the game</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={`mt-2 justify-start text-left font-normal ${!date && 'text-muted-foreground'}`}
                >
                  <CalendarIcon />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/4 mt-8">
        <Label>Add players</Label>
        <Textarea
          rows={20}
          value={textareaValue}
          onChange={handleTextareaChange}
          placeholder="Enter one player name per line"
          className="mt-2"
        />
        <Button className="mt-4" asChild onClick={() => handleCreateGame()}>
          <Link href={`${params.id}?mode=pro`}>Create</Link>
        </Button>
      </div>
      <div className="flex flex-col w-1/4 mt-8">
        <ImportPlayers />
      </div>
    </div>
  );
}
