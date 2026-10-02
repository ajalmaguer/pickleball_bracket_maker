// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { atom, Provider } from 'jotai';
import { afterEach, describe, expect, it } from 'vitest';
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string';
import type { RoundRobin } from '@/types';
import { RoundRobinPage } from './RoundRobinPage';

const roundRobin: RoundRobin = [[{ serve: [1, 2], receive: [3, 4] }]];

function renderPage(initialNames = ['', '', '', '']) {
  return render(
    <Provider>
      <RoundRobinPage
        title="Test schedule"
        namesStorage={atom<string[]>(initialNames)}
        courtStorage={atom<string[]>(['Court A'])}
        completedRoundsStorage={atom<boolean[]>([false])}
        roundRobin={roundRobin}
      />
    </Provider>,
  );
}

afterEach(() => {
  cleanup();
  window.history.replaceState({}, '', '/');
});

describe('RoundRobinPage sharing', () => {
  it('creates a share URL containing the current player names', async () => {
    renderPage(['Alice', 'Bob', 'Cara', 'Dan']);

    fireEvent.click(screen.getByRole('button', { name: 'Share' }));

    const shareUrl = new URL(
      await screen
        .findByDisplayValue(/players=/)
        .then((input) => (input as HTMLInputElement).value),
    );
    const encodedPlayers = shareUrl.searchParams.get('players');

    expect(encodedPlayers).not.toBeNull();
    expect(
      JSON.parse(decompressFromEncodedURIComponent(encodedPlayers!)),
    ).toEqual(['Alice', 'Bob', 'Cara', 'Dan']);
  });

  it('loads player names from a shared URL', async () => {
    const sharedNames = ['Alice', 'Bob', 'Cara', 'Dan'];
    const encodedPlayers = compressPlayers(sharedNames);
    window.history.replaceState({}, '', `/?players=${encodedPlayers}`);

    renderPage(['', '', '', '']);

    await waitFor(() => {
      expect(
        (screen.getByPlaceholderText('Player 1') as HTMLInputElement).value,
      ).toBe('Alice');
      expect(
        (screen.getByPlaceholderText('Player 2') as HTMLInputElement).value,
      ).toBe('Bob');
      expect(
        (screen.getByPlaceholderText('Player 3') as HTMLInputElement).value,
      ).toBe('Cara');
      expect(
        (screen.getByPlaceholderText('Player 4') as HTMLInputElement).value,
      ).toBe('Dan');
    });
  });

  it('clears shared player names from the URL when a name is edited', async () => {
    const encodedPlayers = compressPlayers(['Alice', 'Bob', 'Cara', 'Dan']);
    window.history.replaceState({}, '', `/?players=${encodedPlayers}`);

    renderPage(['', '', '', '']);

    const firstPlayer = await screen.findByPlaceholderText('Player 1');
    await waitFor(() =>
      expect((firstPlayer as HTMLInputElement).value).toBe('Alice'),
    );

    fireEvent.change(firstPlayer, { target: { value: 'Alicia' } });

    expect(window.location.search).toBe('');
    expect((firstPlayer as HTMLInputElement).value).toBe('Alicia');
  });
});

function compressPlayers(playerNames: string[]) {
  return compressToEncodedURIComponent(JSON.stringify(playerNames));
}
