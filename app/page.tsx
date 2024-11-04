'use client'
 
import { useRouter } from 'next/navigation'
import { nanoid } from 'nanoid';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function Home() {
  const router = useRouter()

  const handleNewGame = () => {
    const id = nanoid(12);
    router.push(`${id}`);
  }

  return (
    <div className="hidden flex-col md:flex ">
        <div className="border-b">
          <div className="flex h-16 items-center justify-center px-4">
            <h1 className="font-bold">Lineups 🏒</h1>
          </div>
        </div>
      <div className="flex justify-center mt-8">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create new game</CardTitle>
            <CardDescription>Create and share your dream lineup in simple and effective way.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name of the game</Label>
                  <Input id="name" placeholder="🍺 Beer competition" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => handleNewGame()}>+ New game</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
);
}
