import type { RoundRobin } from '@/types';
import { createFileRoute } from '@tanstack/react-router';
import { atomWithStorage } from 'jotai/utils';
import { RoundRobinPage } from './-components/RoundRobinPage';

const namesStorage = atomWithStorage('8-players--names', [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
]);

const courtStorage = atomWithStorage('8-players--courts', [
  'Court A',
  'Court B',
]);

const roundRobin: RoundRobin = [
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

export const Route = createFileRoute('/8-players')({
  component: FiveToEightPlayers,
});

function FiveToEightPlayers() {
  return (
    <RoundRobinPage
      title="Round Robin: 8 Players"
      namesStorage={namesStorage}
      courtStorage={courtStorage}
      roundRobin={roundRobin}
    />
  );
}
