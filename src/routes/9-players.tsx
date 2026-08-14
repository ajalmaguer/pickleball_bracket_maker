import type { RoundRobin } from '@/types';
import { createFileRoute } from '@tanstack/react-router';
import { atomWithStorage } from 'jotai/utils';
import { RoundRobinPage } from './-components/RoundRobinPage';

const namesStorage = atomWithStorage('9-players--names', [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
]);

const courtStorage = atomWithStorage('9-players--courts', [
  'Court A',
  'Court B',
]);

const roundRobin: RoundRobin = [
  [
    { serve: [2, 3], receive: [4, 7] },
    { serve: [5, 9], receive: [6, 8] },
  ],
  [
    { serve: [3, 1], receive: [5, 8] },
    { serve: [6, 7], receive: [4, 9] },
  ],
  [
    { serve: [1, 2], receive: [6, 9] },
    { serve: [4, 8], receive: [5, 7] },
  ],
  [
    { serve: [5, 6], receive: [7, 1] },
    { serve: [8, 3], receive: [9, 2] },
  ],
  [
    { serve: [6, 4], receive: [8, 2] },
    { serve: [9, 1], receive: [7, 3] },
  ],
  [
    { serve: [4, 5], receive: [9, 3] },
    { serve: [7, 2], receive: [8, 1] },
  ],
  [
    { serve: [8, 9], receive: [1, 4] },
    { serve: [2, 6], receive: [3, 5] },
  ],
  [
    { serve: [9, 7], receive: [2, 5] },
    { serve: [3, 4], receive: [1, 6] },
  ],
  [
    { serve: [7, 8], receive: [3, 6] },
    { serve: [1, 5], receive: [2, 4] },
  ],
];

export const Route = createFileRoute('/9-players')({
  component: FiveToEightPlayers,
});

function FiveToEightPlayers() {
  return (
    <RoundRobinPage
      title="Round Robin: 9 Players"
      description={
        <>
          <p>
            Every player partners with every other player once and faces each
            other player twice.
          </p>
          <p>One player sits out each round.</p>
        </>
      }
      namesStorage={namesStorage}
      courtStorage={courtStorage}
      roundRobin={roundRobin}
    />
  );
}
