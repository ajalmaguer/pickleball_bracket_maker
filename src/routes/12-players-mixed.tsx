import type { RoundRobin } from '@/types';
import { createFileRoute } from '@tanstack/react-router';
import { atomWithStorage } from 'jotai/utils';
import { RoundRobinPage } from './-components/RoundRobinPage';

const namesStorage = atomWithStorage('12-players-mixed--names', [
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

const courtStorage = atomWithStorage('12-players-mixed--courts', [
  'Court A',
  'Court B',
  'Court C',
]);

const roundRobin: RoundRobin = [
  [
    { serve: [2, 7], receive: [1, 8] },
    { serve: [3, 9], receive: [5, 11] },
    { serve: [6, 12], receive: [4, 10] },
  ],
  [
    { serve: [6, 9], receive: [2, 10] },
    { serve: [4, 8], receive: [1, 12] },
    { serve: [3, 7], receive: [5, 11] },
  ],
  [
    { serve: [3, 10], receive: [2, 12] },
    { serve: [4, 11], receive: [6, 7] },
    { serve: [1, 8], receive: [5, 9] },
  ],
  [
    { serve: [4, 8], receive: [5, 10] },
    { serve: [2, 9], receive: [3, 11] },
    { serve: [6, 12], receive: [1, 7] },
  ],
  [
    { serve: [2, 8], receive: [6, 9] },
    { serve: [1, 11], receive: [5, 12] },
    { serve: [3, 10], receive: [4, 7] },
  ],
  [
    { serve: [5, 9], receive: [4, 12] },
    { serve: [2, 10], receive: [1, 11] },
    { serve: [3, 8], receive: [6, 7] },
  ],
  [
    { serve: [5, 10], receive: [2, 11] },
    { serve: [1, 12], receive: [6, 8] },
    { serve: [3, 7], receive: [4, 9] },
  ],
  [
    { serve: [4, 10], receive: [1, 9] },
    { serve: [2, 7], receive: [5, 12] },
    { serve: [3, 11], receive: [6, 8] },
  ],
];

const completedRoundsStorage = atomWithStorage(
  '12-players-mixed--completed-rounds',
  roundRobin.map(() => false),
);

export const Route = createFileRoute('/12-players-mixed')({
  component: NineToTwelvePlayers,
});

function NineToTwelvePlayers() {
  return (
    <RoundRobinPage
      title="Round Robin: 12 Players"
      namesStorage={namesStorage}
      courtStorage={courtStorage}
      completedRoundsStorage={completedRoundsStorage}
      roundRobin={roundRobin}
      playerGridClass="mixed-doubles-12"
    />
  );
}
