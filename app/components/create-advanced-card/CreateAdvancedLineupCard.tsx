'use client';

import { nanoid } from 'nanoid';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from '@/components/ui/card';

export const CreateAdvancedLineupCard = () => {
  const handleNewGame = () => {
    const id = nanoid(12);
    return `${id}/create`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>🏒 Pro mode</CardTitle>
        <CardDescription>Create and share your dream lineup in simple and effective way.</CardDescription>
        <CardDescription>
          In pro mode, you can save your lineups and utilize features like ultimate bravery!
        </CardDescription>
      </CardHeader>
      <CardContent className="text-orange-600 justify-center flex">
        <ExclamationTriangleIcon />
      </CardContent>
      <CardContent className="text-center text-orange-600">Under development</CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild>
          <Link href={handleNewGame()}>+ New lineup</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
