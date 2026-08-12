import type { RoundRobin } from '@/types';
import { createFileRoute } from '@tanstack/react-router';
import { atomWithStorage } from 'jotai/utils';
import { RoundRobinPage } from './-components/RoundRobinPage';

const namesStorage = atomWithStorage('5-8-players-mixed--names', [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
]);

const courtStorage = atomWithStorage('5-8-players-mixed--courts', [
  'Court A',
  'Court B',
]);

const roundRobin: RoundRobin = [
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
  // [
  //   { serve: [3, 7], receive: [4, 8] },
  //   { serve: [2, 6], receive: [1, 5] },
  // ],

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
  // [
  //   { serve: [3, 8], receive: [4, 5] },
  //   { serve: [2, 7], receive: [1, 6] },
  // ],

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
  // [
  //   { serve: [3, 5], receive: [4, 6] },
  //   { serve: [2, 8], receive: [1, 7] },
  // ],

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
  // [
  //   { serve: [3, 6], receive: [4, 7] },
  //   { serve: [2, 5], receive: [1, 8] },
  // ],

  // extra if we have time - third round from each one
  [
    { serve: [3, 7], receive: [4, 8] },
    { serve: [2, 6], receive: [1, 5] },
  ],
  [
    { serve: [3, 8], receive: [4, 5] },
    { serve: [2, 7], receive: [1, 6] },
  ],
  [
    { serve: [3, 5], receive: [4, 6] },
    { serve: [2, 8], receive: [1, 7] },
  ],
  [
    { serve: [3, 6], receive: [4, 7] },
    { serve: [2, 5], receive: [1, 8] },
  ],
];

export const Route = createFileRoute('/5-8-players-mixed')({
  component: FiveToEightPlayersMixed,
});

function FiveToEightPlayersMixed() {
  return (
    <RoundRobinPage
      title="Mixed Doubles Round Robin: 5 - 8 Players"
      namesStorage={namesStorage}
      courtStorage={courtStorage}
      roundRobin={roundRobin}
      mixedDoubles
    />
  );
}
