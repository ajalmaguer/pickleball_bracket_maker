import type { PlayerId, RoundRobin } from '@/types';
import type { SetStateAction, WritableAtom } from 'jotai';
import { useAtom } from 'jotai/react';
import { type ReactNode } from 'react';
import { usePlayerNames } from '@/hooks/usePlayerNames';
import { useModal } from '@/hooks/useModal';
import { NCourtTable } from './NCourtTable';
import { ShareModal } from './ShareModal';

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
  description?: ReactNode;
  namesStorage: WritableAtom<string[], [SetStateAction<string[]>], void>;
  courtStorage: WritableAtom<string[], [SetStateAction<string[]>], void>;
  completedRoundsStorage: WritableAtom<
    boolean[],
    [SetStateAction<boolean[]>],
    void
  >;
  roundRobin: RoundRobin;
  playerGridClass?: string;
};

export function RoundRobinPage({
  title,
  description,
  namesStorage,
  courtStorage,
  completedRoundsStorage,
  roundRobin,
  playerGridClass,
}: RoundRobinPageProps) {
  const { playerNames, handleNameChange, handleShare, shareUrl } =
    usePlayerNames(namesStorage);
  const shareModal = useModal();
  const [courts, setCourts] = useAtom(courtStorage);
  const [completedRounds, setCompletedRounds] = useAtom(completedRoundsStorage);

  const tableRows = roundRobin.map((round) => {
    const matchups: [ReactNode, ReactNode][] = [];
    round.forEach(({ serve, receive }) => {
      matchups.push([
        formatNames(serve, playerNames),
        formatNames(receive, playerNames),
      ]);
    });
    return {
      matchups,
    };
  });

  function handleCourtChange(index: number, value: string) {
    setCourts((current) => {
      const newArray = [...current];
      newArray[index] = value;
      return newArray;
    });
  }

  function handleRoundComplete(index: number) {
    setCompletedRounds((current) => {
      const newArray = [...current];
      newArray[index] = !newArray[index];
      return newArray;
    });
  }

  return (
    <div>
      <div className="flex justify-between">
        <button className="print-btn" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
        <button
          className="print-btn"
          onClick={() => {
            handleShare();
            shareModal.open();
          }}
          type="button"
        >
          Share
        </button>
        {shareModal.isOpen && (
          <ShareModal shareUrl={shareUrl} onClose={shareModal.close} />
        )}
      </div>

      <div className="header">
        <div>
          <div className="title">{title}</div>
        </div>
        <div className="subtitle">
          {courts.length} courts · {tableRows.length} rounds
        </div>
        {description && <div className="description">{description}</div>}
      </div>

      <NCourtTable
        rows={tableRows}
        courts={courts}
        handleCourtChange={handleCourtChange}
        completedRounds={completedRounds}
        handleRoundComplete={handleRoundComplete}
      />

      <div className="players">
        <div className="players-label">Players</div>
        <div className={['players-grid', playerGridClass ?? ''].join(' ')}>
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
