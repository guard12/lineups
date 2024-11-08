import { useDrop, useDrag } from 'react-dnd';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import type { PlayerProps } from '@/app/types';

type SpotProps = {
  id: string;
  onDrop: (id: string, item: { id: string; name: string }) => void;
  onSwap: (item: { id: string; name: string }) => void;
  onRemove: (spotId: string) => void;
  player?: PlayerProps | null;
  position: string;
  isSubstitue?: boolean;
};

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

  const [{ isDragging }, drag] = useDrag({
    type: 'PLAYER',
    item: { id: player?.id, name: player?.name, profile_picture_path: player?.profile_picture_path },
    canDrag: !!player, // Only allow drag if there's a player in the spot
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleRemove = () => {
    if (player) onRemove(id);
  };

  const bgColor = isOver
    ? 'bg-green-100 dark:bg-green-900'
    : player
      ? 'bg-blue-100 dark:bg-blue-900'
      : 'bg-white dark:bg-slate-800';

  return (
    <div>
      {position}
      <div
        ref={(node) => {
          drag(node);
          drop(node);
        }}
        style={{
          width: isSubstitue ? '80px' : '100px',
          height: isSubstitue ? '80px' : '100px',
          border: !player ? '1px dashed black' : undefined,
          margin: '12px',
          opacity: isDragging ? 0.5 : 1,
        }}
        className={`rounded-md flex flex-col justify-center items-center ${bgColor}`}
        onDoubleClick={handleRemove}
      >
        {player ? (
          <div className="flex flex-col items-center gap-1">
            {player.profile_picture_path && (
              <Avatar>
                <AvatarImage src={`https://api.holdsport.dk${player.profile_picture_path}`} />
                <AvatarFallback>PL</AvatarFallback>
              </Avatar>
            )}
            <Label>{player.name}</Label>
          </div>
        ) : (
          'Empty Spot'
        )}
      </div>
    </div>
  );
};
