import type { RoundRobin } from '@/types';
import { createFileRoute } from '@tanstack/react-router';
import { atomWithStorage } from 'jotai/utils';
import { RoundRobinPage } from './-components/RoundRobinPage';

const namesStorage = atomWithStorage('12-players--names', [
  '',
  '',
  '',
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

const courtStorage = atomWithStorage('12-players--courts', [
  'Court A',
  'Court B',
  'Court C',
]);

const roundRobin: RoundRobin = [
  [
    { serve: [3, 4], receive: [2, 7] },
    { serve: [9, 11], receive: [5, 8] },
    { serve: [6, 10], receive: [12, 1] },
  ],
  [
    { serve: [2, 3], receive: [12, 6] },
    { serve: [5, 9], receive: [11, 1] },
    { serve: [8, 10], receive: [4, 7] },
  ],
  [
    { serve: [4, 8], receive: [10, 1] },
    { serve: [12, 2], receive: [11, 5] },
    { serve: [7, 9], receive: [3, 6] },
  ],
  [
    { serve: [11, 12], receive: [10, 4] },
    { serve: [6, 8], receive: [2, 5] },
    { serve: [3, 7], receive: [9, 1] },
  ],
  [
    { serve: [10, 11], receive: [9, 3] },
    { serve: [2, 6], receive: [8, 1] },
    { serve: [5, 7], receive: [12, 4] },
  ],
  [
    { serve: [12, 5], receive: [7, 1] },
    { serve: [9, 10], receive: [8, 2] },
    { serve: [4, 6], receive: [11, 3] },
  ],
  [
    { serve: [8, 9], receive: [7, 12] },
    { serve: [3, 5], receive: [10, 2] },
    { serve: [11, 4], receive: [6, 1] },
  ],
  [
    { serve: [7, 8], receive: [6, 11] },
    { serve: [10, 3], receive: [5, 1] },
    { serve: [2, 4], receive: [9, 12] },
  ],
  [
    { serve: [9, 2], receive: [4, 1] },
    { serve: [6, 7], receive: [5, 10] },
    { serve: [12, 3], receive: [8, 11] },
  ],
  [
    { serve: [5, 6], receive: [4, 9] },
    { serve: [11, 2], receive: [7, 10] },
    { serve: [8, 12], receive: [3, 1] },
  ],
  [
    { serve: [4, 5], receive: [3, 8] },
    { serve: [7, 11], receive: [2, 1] },
    { serve: [10, 12], receive: [6, 9] },
  ],
];

export const Route = createFileRoute('/12-players')({
  component: NineToTwelvePlayers,
});

function NineToTwelvePlayers() {
  return (
    <RoundRobinPage
      title="Round Robin: 12 Players"
      namesStorage={namesStorage}
      courtStorage={courtStorage}
      roundRobin={roundRobin}
    />
  );
}
