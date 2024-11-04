'use client'
 
import { useRouter } from 'next/navigation'
import { nanoid } from 'nanoid';
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter()

  const handleNewGame = () => {
    const id = nanoid(12);
    router.push(`${id}`);
  }

  return (
    <div className="max-w-96">
      <h1>Home</h1>
      <Button onClick={() => handleNewGame()}>+ New game</Button>
    </div>
);
}
