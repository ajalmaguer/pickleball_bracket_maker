import type { RoundRobin } from '@/types';
import { createFileRoute } from '@tanstack/react-router';
import { atomWithStorage } from 'jotai/utils';
import { RoundRobinPage } from './-components/RoundRobinPage';

const namesStorage = atomWithStorage('9-12-players-mixed--names', [
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

const courtStorage = atomWithStorage('9-12-players-mixed--courts', [
  'Court A',
  'Court B',
  'Court C',
]);

const roundRobin: RoundRobin = [
  [
    { serve: [6, 8], receive: [4, 9] },
    { serve: [3, 8], receive: [4, 12] },
    { serve: [2, 9], receive: [3, 10] },
  ],
  [
    { serve: [1, 8], receive: [2, 12] },
    { serve: [2, 12], receive: [5, 10] },
    { serve: [1, 11], receive: [6, 8] },
  ],
  [
    { serve: [4, 9], receive: [6, 12] },
    { serve: [6, 7], receive: [1, 8] },
    { serve: [2, 10], receive: [3, 7] },
  ],
  [
    { serve: [4, 8], receive: [1, 7] },
    { serve: [2, 10], receive: [1, 9] },
    { serve: [5, 10], receive: [3, 12] },
  ],
  [
    { serve: [3, 7], receive: [1, 9] },
    { serve: [2, 9], receive: [4, 11] },
    { serve: [5, 12], receive: [4, 11] },
  ],
  [
    { serve: [3, 10], receive: [4, 7] },
    { serve: [6, 9], receive: [2, 7] },
    { serve: [3, 9], receive: [1, 11] },
  ],
  [
    { serve: [5, 12], receive: [2, 7] },
    { serve: [5, 11], receive: [4, 10] },
    { serve: [2, 8], receive: [6, 11] },
  ],
  [
    { serve: [5, 11], receive: [1, 10] },
    { serve: [5, 7], receive: [6, 11] },
    { serve: [4, 12], receive: [2, 11] },
  ],
];

export const Route = createFileRoute('/9-12-players-mixed')({
  component: NineToTwelvePlayers,
});

function NineToTwelvePlayers() {
  return (
    <RoundRobinPage
      title="Round Robin: 9 - 12 Players"
      namesStorage={namesStorage}
      courtStorage={courtStorage}
      roundRobin={roundRobin}
      playerGridClass="mixed-doubles-12"
    />
  );
}
