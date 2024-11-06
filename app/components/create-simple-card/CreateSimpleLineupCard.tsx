'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { PlayersListTextArea } from '../players-list-textarea';
import { useSimpleLineupPlayers } from '@/app/hooks';

export const CreateSimpleLineupCard = () => {
  const router = useRouter();
  const [textareaValue, setTextareaValue] = useState('');
  const { players, setPlayersFromInput } = useSimpleLineupPlayers();

  const handleNewGame = () => {
    const id = nanoid(12);
    router.push(`${id}`);
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value;
    setTextareaValue(input);
    setPlayersFromInput(input);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>🍺 Beer mode</CardTitle>
        <CardDescription>Create and share your dream lineup in simple and effective way.</CardDescription>
        <CardDescription>
          In beer mode, some features are not enabled, like saving the lineup or ultimate bravery.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PlayersListTextArea handleTextareaChange={handleTextareaChange} textareaValue={textareaValue} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => handleNewGame()} disabled={players.length <= 0}>
          + New lineup
        </Button>
      </CardFooter>
    </Card>
  );
};
