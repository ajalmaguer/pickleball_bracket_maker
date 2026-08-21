import { decompressFromEncodedURIComponent } from 'lz-string';
import { useCallback, useEffect, useState } from 'react';

const PLAYERS_PARAM = 'players';

export function useSharedPlayers() {
  const [sharedPlayers, setSharedPlayers] = useState<string[] | null>(null);

  const clearSharedPlayers = useCallback(() => {
    const url = new URL(window.location.href);

    if (!url.searchParams.has(PLAYERS_PARAM)) {
      return;
    }

    url.searchParams.delete(PLAYERS_PARAM);
    window.history.replaceState(window.history.state, '', url);
    setSharedPlayers(null);
  }, []);

  useEffect(() => {
    const encodedPlayers = new URLSearchParams(window.location.search).get(
      PLAYERS_PARAM,
    );

    if (!encodedPlayers) {
      console.log('Shared players array:', null);
      return;
    }

    try {
      const decodedPlayers = decompressFromEncodedURIComponent(encodedPlayers);
      const players = decodedPlayers ? JSON.parse(decodedPlayers) : null;
      const isStringArray =
        Array.isArray(players) &&
        players.every((player) => typeof player === 'string');

      if (!isStringArray) {
        console.log('Shared players array:', null);
        return;
      }

      console.log('Shared players array:', players);
      setSharedPlayers(players);
    } catch {
      console.log('Shared players array:', null);
    }
  }, []);

  return { sharedPlayers, clearSharedPlayers };
}
