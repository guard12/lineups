
import { useDrop } from 'react-dnd';

import { Button } from '@/components/ui/button';

import type { PlayerProps } from '@/app/types';

type SpotProps = {
  id: string;
  onDrop: (id: string, item: { id: string; name: string }) => void;
  onSwap: (item: { id: string; name: string }) => void;
  onRemove: (spotId: string) => void;
  player?: { id: string; name: string } | null;
  position: string;
  isSubstitue?: boolean;
}

export const DroppableSpot: React.FC<SpotProps> = ({ id, onDrop, player, position, onSwap, isSubstitue, onRemove }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'PLAYER',
    drop: (item: PlayerProps) => {
      if (player) {
        onSwap(player);
      }
      onDrop(id, item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div>
      {position}
    <div
    // @ts-expect-error type error
      ref={drop}
      style={{
        width: isSubstitue ? '80px' : '100px',
        height: isSubstitue ? '80px' : '100px',
        border: !player ? '1px dashed black' : undefined,
        margin: '12px',
        backgroundColor: isOver ? 'lightgreen' : 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="rounded-md flex flex-col"
    >
      {player ? player.name : 'Empty Spot'}
      {player && <Button onClick={() => onRemove(id)} variant="link">[remove]</Button>}
    </div>
    </div>
  );
};