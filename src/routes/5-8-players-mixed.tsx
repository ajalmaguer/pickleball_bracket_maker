import type { PlayerId, RoundRobin } from '@/types';
import { createFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai/react';
import { atomWithStorage } from 'jotai/utils';
import { type ReactNode } from 'react';
import { Table } from './-components/table';

const storage = atomWithStorage('5-8-players-mixed', [
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
  // 1 > 1, 5,
  // 2 > 2, 6,
  // 3 > 3, 7,
  // 4 > 4, 8
  [
    { serve: [2, 6], receive: [3, 7] },
    { serve: [4, 8], receive: [1, 5] },
  ],
  [
    { serve: [4, 8], receive: [2, 6] },
    { serve: [3, 7], receive: [1, 5] },
  ],
  [
    { serve: [3, 7], receive: [4, 8] },
    { serve: [2, 6], receive: [1, 5] },
  ],

  // 1 > 1, 6
  // 2 > 2, 7
  // 3 > 3, 8
  // 4 > 4, 5
  [
    { serve: [2, 7], receive: [3, 8] },
    { serve: [4, 5], receive: [1, 6] },
  ],
  [
    { serve: [4, 5], receive: [2, 7] },
    { serve: [3, 8], receive: [1, 6] },
  ],
  [
    { serve: [3, 8], receive: [4, 5] },
    { serve: [2, 7], receive: [1, 6] },
  ],

  // 1 > 1, 7
  // 2 > 2, 8
  // 3 > 3, 5
  // 4 > 4, 6
  [
    { serve: [2, 8], receive: [3, 5] },
    { serve: [4, 6], receive: [1, 7] },
  ],
  [
    { serve: [4, 6], receive: [2, 8] },
    { serve: [3, 5], receive: [1, 7] },
  ],
  [
    { serve: [3, 5], receive: [4, 6] },
    { serve: [2, 8], receive: [1, 7] },
  ],

  // 1 > 1, 8
  // 2 > 2, 5
  // 3 > 3, 6
  // 4 > 4, 7
  [
    { serve: [2, 5], receive: [3, 6] },
    { serve: [4, 7], receive: [1, 8] },
  ],
  [
    { serve: [4, 7], receive: [2, 5] },
    { serve: [3, 6], receive: [1, 8] },
  ],
  [
    { serve: [3, 6], receive: [4, 7] },
    { serve: [2, 5], receive: [1, 8] },
  ],
];

export const Route = createFileRoute('/5-8-players-mixed')({
  component: FiveToEightPlayersMixed,
});

function formatNames(
  [playerAId, playerBId]: [PlayerId, PlayerId],
  playerNames: string[],
): ReactNode {
  const playerAName = playerNames[playerAId - 1] || playerAId;
  const playerBName = playerNames[playerBId - 1] || playerBId;
  return `${playerAName} & ${playerBName}`;
}

function FiveToEightPlayersMixed() {
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
        <div className="title">Mixed Doubles Round Robin — 5–8 Players</div>
        <div className="subtitle">2 courts · 12 rounds</div>
      </div>

      <Table
        rows={tableRows}
        courts={['Court A', 'Court B']}
        handleCourtChange={handleCourtChange}
      />

      <div className="players">
        <div className="players-label">Players</div>
        <div className="players-grid mixed-doubles">
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
