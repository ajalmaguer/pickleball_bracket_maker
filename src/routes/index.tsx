import { createFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { Calendar, Users } from 'lucide-react';
import { playerNamesAtom, scheduleAtom } from '../state';
import {
  generateSchedule,
  type Game,
  type GameWithoutByes,
} from './-components/generateSchedule';
import { PlayerNamesInput } from './-components/PlayerInput';

export const Route = createFileRoute('/')({
  component: App,
});

function hasNoByes(game: Game | GameWithoutByes): game is GameWithoutByes {
  // function hasNoByes(something: any) {
  const { team1, team2 } = game;
  return team1.every((player) => !!player) && team2.every((player) => !!player);
}

const PickleballScheduler = () => {
  const [schedule, setSchedule] = useAtom(scheduleAtom);
  const [playerNames, setPlayerNames] = useAtom(playerNamesAtom);

  const handleGenerate = () => {
    const numPlayers = playerNames.length;

    const generated = generateSchedule(numPlayers);
    if (!generated) {
      alert('Failed to generate schedule. Please check the number of players.');
      return;
    }
    setSchedule(generated);

    // Initialize default player names if not set
    if (!playerNames.length) {
      setPlayerNames(
        Array.from({ length: numPlayers }, (_, i) => `Player ${i + 1}`)
      );
    }
  };

  const getPlayerName = (num: number) => {
    return playerNames[num - 1] || `Bye`;
  };

  const generateButtonText = schedule
    ? 'Regenerate bracket'
    : 'Generate bracket';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Pickleball Bracket Maker
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Player Names</h2>
          <div className="mb-8">
            <PlayerNamesInput />
          </div>
          <button
            onClick={handleGenerate}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            {generateButtonText}
          </button>
        </div>

        {schedule && (
          <>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Schedule ({schedule.games.length} rounds)
                </h2>
              </div>

              <div className="space-y-6">
                {schedule.games.map((round, roundIdx) => (
                  <div
                    key={roundIdx}
                    className="border-l-4 border-green-500 px-6 py-4 bg-gray-50 rounded-r-lg"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Round {roundIdx + 1}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {round.map((game, matchIdx) => (
                        <div
                          key={matchIdx}
                          className="bg-white p-4 rounded-lg shadow border border-gray-200"
                        >
                          <div className="text-sm font-semibold text-green-600 mb-3">
                            Court {game.court}
                          </div>
                          {hasNoByes(game) ? (
                            <>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-blue-600 font-medium">
                                    {getPlayerName(game.team1[0])} &{' '}
                                    {getPlayerName(game.team1[1])}
                                  </span>
                                </div>
                                <div className="text-gray-400 text-xs font-semibold">
                                  VS
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-purple-600 font-medium">
                                    {getPlayerName(game.team2[0])} &{' '}
                                    {getPlayerName(game.team2[1])}
                                  </span>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>Byes:</div>
                              <ul className="list-disc list-inside text-gray-600">
                                {[...game.team1, ...game.team2]
                                  .filter((p) => p !== null)
                                  .map((p) => (
                                    <li key={p}>{getPlayerName(p!)}</li>
                                  ))}
                              </ul>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                Schedule Properties:
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>
                  ✓ Each player partners with every other player exactly once
                </li>
                <li>✓ Each player opposes each other player twice</li>
                <li>✓ All players play in every round (no sitting out)</li>
                <li>
                  ✓ Uses {schedule.games[0].length} court
                  {schedule.games[0].length > 1 ? 's' : ''} simultaneously
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

function App() {
  return <PickleballScheduler />;
}
