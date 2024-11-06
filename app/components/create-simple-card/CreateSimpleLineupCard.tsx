'use client';

import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { PlayersListTextArea } from '../players-list-textarea';
import { useSimpleLineupPlayers } from '@/app/hooks';

export const CreateSimpleLineupCard = () => {
  const [textareaValue, setTextareaValue] = useState('');
  const { setPlayersFromInput } = useSimpleLineupPlayers();
  const [generatedId, setGeneratedId] = useState('');

  useEffect(() => {
    setGeneratedId(nanoid(12));
  }, []);

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
        <Button asChild>
          <Link href={`${generatedId}`}>+ New lineup</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
