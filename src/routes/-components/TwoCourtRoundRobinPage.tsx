import type { PlayerId, RoundRobin } from '@/types';
import type { SetStateAction, WritableAtom } from 'jotai';
import { useAtom } from 'jotai/react';
import type { ReactNode } from 'react';
import { Table } from './TwoCourtTable';
import { Link } from '@tanstack/react-router';

function formatNames(
  [playerAId, playerBId]: [PlayerId, PlayerId],
  playerNames: string[],
): ReactNode {
  const playerAName = playerNames[playerAId - 1] || playerAId;
  const playerBName = playerNames[playerBId - 1] || playerBId;
  return `${playerAName} & ${playerBName}`;
}

type RoundRobinPageProps = {
  title: string;
  namesStorage: WritableAtom<string[], [SetStateAction<string[]>], void>;
  courtStorage: WritableAtom<string[], [SetStateAction<string[]>], void>;
  roundRobin: RoundRobin;
  mixedDoubles?: boolean;
};

export function TwoCourtRoundRobinPage({
  title,
  namesStorage,
  courtStorage,
  roundRobin,
  mixedDoubles,
}: RoundRobinPageProps) {
  const [playerNames, setPlayerNames] = useAtom(namesStorage);
  const [courts, setCourts] = useAtom(courtStorage);

  const tableRows = roundRobin.map((round, b) => {
    const [matchA, matchB] = round;
    return [
      formatNames(matchA.serve, playerNames),
      formatNames(matchA.receive, playerNames),
      formatNames(matchB?.serve || '', playerNames),
      formatNames(matchB?.receive || '', playerNames),
    ] as [ReactNode, ReactNode, ReactNode, ReactNode];
  });

  function handleCourtChange(index: number, value: string) {
    setCourts((current) => {
      const newArray = [...current];
      newArray[index] = value;
      return newArray;
    });
  }

  function handleNameChange(index: number, value: string) {
    setPlayerNames((current) => {
      const newArray = [...current];
      newArray[index] = value;
      return newArray;
    });
  }

  return (
    <div className="page">
      <div className="navbar-container">
        <button className="print-btn" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
        <div>
          <ul className="navbar-links">
            <li>
              <Link to="/5-8-players">5 - 8 players</Link>
            </li>
            <li>
              <Link to="/5-8-players-mixed">5 - 8 players mixed</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="header">
        <div className="title">{title}</div>
        <div className="subtitle">
          {courts.length} courts · {tableRows.length} rounds
        </div>
      </div>

      <Table
        rows={tableRows}
        courts={courts}
        handleCourtChange={handleCourtChange}
      />

      <div className="players">
        <div className="players-label">Players</div>
        <div
          className={['players-grid', mixedDoubles ? 'mixed-doubles' : ''].join(
            ' ',
          )}
        >
          {playerNames.map((name, index) => {
            return (
              <div className="player-chip" key={index}>
                <div className="player-num">{index + 1}</div>
                <input
                  id={`player-${index}-input`}
                  type="text"
                  onChange={(event) =>
                    handleNameChange(index, event.target.value)
                  }
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
