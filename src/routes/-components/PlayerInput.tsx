import { playerNamesAtom } from '@/state';
import { useAtom } from 'jotai';
import { X } from 'lucide-react';
import { useEffect } from 'react';

const MIN_PLAYERS = 4;

export function PlayerNamesInput() {
  const [players, setPlayers] = useAtom(playerNamesAtom);

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
    // grab the last input and focus it
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

  return (
    <>
      <div className="space-y-3">
        {players.map((player, index) => (
          <div
            key={index}
            className="grid grid-cols-[30px_minmax(0,1fr)_30px] justify-left gap-3"
          >
            <span className="text-gray-400 font-medium text-lg">
              {index + 1}.
            </span>
            <input
              id={`player-${index}`}
              type="text"
              value={player}
              onChange={(e) => handlePlayerChange(index, e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, index)}
              placeholder={index === 0 ? 'Enter names here' : ''}
              className="bg-transparent text-gray-900 text-lg placeholder-gray-400 focus:outline-none"
            />
            {players.length > MIN_PLAYERS && player && (
              <button
                onClick={() => removePlayer(index)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        ))}
      </div>

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
