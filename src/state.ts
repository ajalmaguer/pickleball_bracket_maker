import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { generateSchedule } from './routes/-components/generateSchedule';

export const numPlayersAtom = atom<string | number>(8);
export const scheduleAtom = atomWithStorage<ReturnType<
  typeof generateSchedule
> | null>('schedule', null);
export const playerNamesAtom = atomWithStorage<string[]>('playerNames', []);
