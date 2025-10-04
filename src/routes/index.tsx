import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Users, Calendar, Play } from 'lucide-react';
import {
  generateSchedule,
  type Match,
  type MatchWithoutByes,
} from './generateSchedule';

export const Route = createFileRoute('/')({
  component: App,
});

function hasNoByes(match: Match | MatchWithoutByes): match is MatchWithoutByes {
  const { team1, team2 } = match;
  console.log(team1, team2);
  return team1.every((player) => !!player) && team2.every((player) => !!player);
}

const PickleballScheduler = () => {
  const [numPlayers, setNumPlayers] = useState<string | number>(8);
  const [schedule, setSchedule] = useState<ReturnType<
    typeof generateSchedule
  > | null>(null);
  const [playerNames, setPlayerNames] = useState<string[]>([]);

  const handleGenerate = () => {
    if (typeof numPlayers !== 'number') {
      alert('Please enter a valid number of players (must be divisible by 4).');
      return;
    }
    const generated = generateSchedule(numPlayers);
    setSchedule(generated);

    // Initialize default player names if not set
    if (playerNames.length !== numPlayers) {
      setPlayerNames(
        Array.from({ length: numPlayers }, (_, i) => `Player ${i + 1}`)
      );
    }
  };

  const handlePlayerNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const getPlayerName = (num: number) => {
    return playerNames[num - 1] || `Player ${num}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Pickleball Round Robin Scheduler
            </h1>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Players (must be divisible by 4)
              </label>
              <input
                type="number"
                min="4"
                // step="4"
                value={numPlayers}
                onChange={(e) => {
                  e.target.value
                    ? setNumPlayers(parseInt(e.target.value))
                    : setNumPlayers('');
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleGenerate}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <Play className="w-5 h-5" />
              Generate Schedule
            </button>
          </div>
        </div>

        {schedule && typeof numPlayers === 'number' && (
          <>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Player Names
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: numPlayers }, (_, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Player {i + 1}
                    </label>
                    <input
                      type="text"
                      placeholder={`Player ${i + 1}`}
                      value={playerNames[i] || ''}
                      onChange={(e) =>
                        handlePlayerNameChange(i, e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {schedule && (
          <>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Schedule ({schedule.length} rounds, {schedule[0].length}{' '}
                  courts)
                </h2>
              </div>

              <div className="space-y-6">
                {schedule.map((round, roundIdx) => (
                  <div
                    key={roundIdx}
                    className="border-l-4 border-green-500 pl-6 py-4 bg-gray-50 rounded-r-lg"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Round {roundIdx + 1}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {round.map((match, matchIdx) => (
                        <div
                          key={matchIdx}
                          className="bg-white p-4 rounded-lg shadow border border-gray-200"
                        >
                          <div className="text-sm font-semibold text-green-600 mb-3">
                            Court {match.court}
                          </div>
                          {hasNoByes(match) ? (
                            <>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-blue-600 font-medium">
                                    {getPlayerName(match.team1[0])} &{' '}
                                    {getPlayerName(match.team1[1])}
                                  </span>
                                </div>
                                <div className="text-gray-400 text-xs font-semibold">
                                  VS
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-purple-600 font-medium">
                                    {getPlayerName(match.team2[0])} &{' '}
                                    {getPlayerName(match.team2[1])}
                                  </span>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>Byes:</div>
                              <ul className="list-disc list-inside text-gray-600">
                                {[...match.team1, ...match.team2]
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
                  ✓ Uses {schedule[0].length} court
                  {schedule[0].length > 1 ? 's' : ''} simultaneously
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
