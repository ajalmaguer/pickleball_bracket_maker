import type { PlayerId, RoundRobin } from '@/types';
import { createFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai/react';
import { atomWithStorage } from 'jotai/utils';
import { type ReactNode } from 'react';
import { Table } from './-components/table';

const storage = atomWithStorage('5-8-players', [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
]);

const mixedDoubles: RoundRobin = [
  [
    { serve: [1, 2], receive: [3, 4] },
    { serve: [5, 6], receive: [7, 8] },
  ],
  [
    { serve: [1, 3], receive: [5, 7] },
    { serve: [2, 4], receive: [6, 8] },
  ],
  [
    { serve: [1, 4], receive: [6, 7] },
    { serve: [2, 3], receive: [5, 8] },
  ],
  [
    { serve: [1, 5], receive: [2, 6] },
    { serve: [3, 7], receive: [4, 8] },
  ],
  [
    { serve: [1, 6], receive: [3, 8] },
    { serve: [2, 5], receive: [4, 7] },
  ],
  [
    { serve: [1, 7], receive: [2, 8] },
    { serve: [3, 5], receive: [4, 6] },
  ],
  [
    { serve: [1, 8], receive: [4, 5] },
    { serve: [2, 7], receive: [3, 6] },
  ],
];

export const Route = createFileRoute('/5-8-players')({
  component: FiveToEightPlayers,
});

function formatNames(
  [playerAId, playerBId]: [PlayerId, PlayerId],
  playerNames: string[],
): ReactNode {
  const playerAName = playerNames[playerAId - 1] || playerAId;
  const playerBName = playerNames[playerBId - 1] || playerBId;
  return `${playerAName} & ${playerBName}`;
}

function FiveToEightPlayers() {
  const [playerNames, setPlayerNames] = useAtom(storage);

  const tableRows = mixedDoubles.map((round, b) => {
    console.log({ round, b });
    const [matchA, matchB] = round;
    return [
      formatNames(matchA.serve, playerNames),
      formatNames(matchA.receive, playerNames),
      formatNames(matchB.serve, playerNames),
      formatNames(matchB.receive, playerNames),
    ] as [ReactNode, ReactNode, ReactNode, ReactNode];
  });

  function handleCourtChange(index: number, value: string) {
    console.log({ index, value });
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    console.log({ event, index, value: event.currentTarget.value });
    setPlayerNames((current) => {
      const newArray = [...current];
      newArray[index] = event.target.value;
      return newArray;
    });
  }

  return (
    <div className="page">
      <button className="print-btn" onClick={() => window.print()}>
        Print / Save as PDF
      </button>

      <div className="header">
        <div className="title">Round Robin — 5–8 Players</div>
        <div className="subtitle">2 courts · 7 rounds</div>
      </div>

      <Table
        rows={tableRows}
        courts={['Court A', 'Court B']}
        handleCourtChange={handleCourtChange}
      />

      <div className="players">
        <div className="players-label">Players</div>
        <div className="players-grid">
          {playerNames.map((name, index) => {
            return (
              <div className="player-chip" key={index}>
                <div className="player-num">{index + 1}</div>
                <input
                  id={`player-${index}-input`}
                  type="text"
                  onChange={(event) => handleChange(event, index)}
                  value={name}
                  placeholder={`Player ${index + 1}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
