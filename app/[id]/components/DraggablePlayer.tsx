import { useDrag } from 'react-dnd';

import type { PlayerProps } from '@/app/types';

export const DraggablePlayer: React.FC<PlayerProps> = ({ id, name, profile_picture_path }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'PLAYER',
    item: { id, name, profile_picture_path },
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
      }}
      className="bg-slate-100 dark:bg-slate-900 rounded-md p-2 mt-2"
    >
      {name}
    </div>
  );
};
