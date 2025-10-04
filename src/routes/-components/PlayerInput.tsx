import { playerNamesAtom } from '@/state';
import { useAtom } from 'jotai';
import { GripVertical, X } from 'lucide-react';
import { useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const MIN_PLAYERS = 4;

interface SortablePlayerItemProps {
  id: string;
  index: number;
  player: string;
  playersLength: number;
  onPlayerChange: (index: number, value: string) => void;
  onEnterKey: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  onRemove: (index: number) => void;
}

function SortablePlayerItem({
  id,
  index,
  player,
  playersLength,
  onPlayerChange,
  onEnterKey,
  onRemove,
}: SortablePlayerItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="grid grid-cols-[30px_30px_minmax(0,1fr)_30px] items-center gap-3"
    >
      <button
        {...attributes}
        {...listeners}
        className="text-gray-400 hover:text-gray-600 transition-colors cursor-grab active:cursor-grabbing touch-none"
        aria-label="Drag to reorder"
      >
        <GripVertical size={20} />
      </button>
      <span className="text-gray-400 font-medium text-lg">{index + 1}.</span>
      <input
        id={`player-${index}`}
        type="text"
        value={player}
        onChange={(e) => onPlayerChange(index, e.target.value)}
        onKeyDown={(e) => onEnterKey(e, index)}
        placeholder={index === 0 ? 'Enter names here' : ''}
        className="bg-transparent text-gray-900 text-lg placeholder-gray-400 focus:outline-none"
      />
      <div className="w-[30px] flex justify-center">
        {playersLength > MIN_PLAYERS && player && (
          <button
            onClick={() => onRemove(index)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export function PlayerNamesInput() {
  const [players, setPlayers] = useAtom(playerNamesAtom);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handlePlayerChange = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const handleEnterKey = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key !== 'Enter') {
      return;
    }
    if (index === players.length - 1) {
      e.preventDefault();
      setPlayers([...players, '']);
    } else {
      const nextInput = document.getElementById(`player-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  useEffect(() => {
    console.log('Players length:', players.length);
    if (players.length > 0) {
      const lastIndex = players.length - 1;
      const lastInput = document.getElementById(`player-${lastIndex}`);
      lastInput?.focus();
    }
  }, [players.length]);

  const removePlayer = (index: number) => {
    if (players.length > MIN_PLAYERS) {
      const newPlayers = players.filter((_, i) => i !== index);
      setPlayers(newPlayers);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = players.findIndex((_, i) => `player-${i}` === active.id);
      const newIndex = players.findIndex((_, i) => `player-${i}` === over.id);
      setPlayers(arrayMove(players, oldIndex, newIndex));
    }
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={players.map((_, i) => `player-${i}`)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {players.map((player, index) => (
              <SortablePlayerItem
                key={`player-${index}`}
                id={`player-${index}`}
                index={index}
                player={player}
                playersLength={players.length}
                onPlayerChange={handlePlayerChange}
                onEnterKey={handleEnterKey}
                onRemove={removePlayer}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={() => setPlayers([...players, ''])}
          className="text-gray-400 italic text-base hover:text-gray-600 transition-colors text-left"
        >
          Press Enter ↵ or click here to add more
        </button>
      </div>
    </>
  );
}
