import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string';
import type { SetStateAction, WritableAtom } from 'jotai';
import { useAtom } from 'jotai/react';
import { useCallback, useEffect, useState } from 'react';

const PLAYERS_PARAM = 'players';

export function usePlayerNames(
  namesStorage: WritableAtom<string[], [SetStateAction<string[]>], void>,
) {
  const [playerNames, setPlayerNames] = useAtom(namesStorage);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    const encodedPlayers = new URLSearchParams(window.location.search).get(
      PLAYERS_PARAM,
    );

    if (!encodedPlayers) {
      return;
    }

    try {
      const decodedPlayers = decompressFromEncodedURIComponent(encodedPlayers);
      const players = decodedPlayers ? JSON.parse(decodedPlayers) : null;
      const isStringArray =
        Array.isArray(players) &&
        players.every((player) => typeof player === 'string');

      if (isStringArray) {
        setPlayerNames(players);
      }
    } catch {
      // Ignore malformed shared player data and keep the stored names.
    }
  }, [setPlayerNames]);

  const clearSharedPlayers = useCallback(() => {
    const url = new URL(window.location.href);

    if (!url.searchParams.has(PLAYERS_PARAM)) {
      return;
    }

    url.searchParams.delete(PLAYERS_PARAM);
    window.history.replaceState(window.history.state, '', url);
  }, []);

  const handleNameChange = useCallback(
    (index: number, value: string) => {
      clearSharedPlayers();
      setPlayerNames((current) => {
        const newArray = [...current];
        newArray[index] = value;
        return newArray;
      });
    },
    [clearSharedPlayers, setPlayerNames],
  );

  const handleShare = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.set(
      PLAYERS_PARAM,
      compressToEncodedURIComponent(JSON.stringify(playerNames)),
    );
    setShareUrl(url.toString());
  }, [playerNames]);

  return {
    playerNames,
    handleNameChange,
    handleShare,
    shareUrl,
  };
}
