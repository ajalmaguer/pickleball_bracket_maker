type PairingPlaceholder = {
  left: number | null | undefined;
  right: number | null | undefined;
};

export type Pairing = {
  left: number | null;
  right: number | null;
};

export type Game = {
  court: number;
  team1: [number | null, number | null];
  team2: [number | null, number | null];
};

export type GameWithoutByes = {
  court: number;
  team1: [number, number];
  team2: [number, number];
};

export type Schedule = {
  games: Game[][];
};

export function createPlayers(numPlayers: number): number[] {
  if (!Number.isInteger(numPlayers) || numPlayers <= 0) return [];
  return Array.from({ length: numPlayers }, (_, i) => i + 1);
}

export function createCirclePairs(players: number[], debug = false): Pairing[] {
  const n = players.length;
  const pairs: PairingPlaceholder[] = [];

  // generate empty pairs but the pairs need to have space for a multiple of four players that's bigger than the number of players
  const targetSpaces = Math.ceil(n / 4) * 4;
  const targetEmptyPairs = targetSpaces / 2;
  const byeCount = targetSpaces - n;
  const countOfPairsWithByes = Math.ceil(byeCount / 2);

  if (debug) {
    console.log('for n=', n);
    console.log('targetLength', targetSpaces);
    console.log('targetEmptyPairs', targetEmptyPairs);
    console.log('byeCount', byeCount);
    console.log('countOfPairsWithByes', countOfPairsWithByes);
  }

  // create the empty pairs
  while (pairs.length < targetEmptyPairs - countOfPairsWithByes) {
    pairs.push({ left: undefined, right: undefined });
  }

  // add the pairs with byes
  if (byeCount === 1) {
    pairs.push({ left: undefined, right: null });
  } else if (byeCount === 2) {
    pairs.push({ left: null, right: null });
  } else if (byeCount === 3) {
    pairs.push({ left: null, right: undefined });
    pairs.push({ left: null, right: null });
  }

  // add player 1 to first left
  pairs[0].left = players[0];

  // fill in the rest of the pairs with players counter clockwise starting from the right going down then back up the left side
  let playerIdx = 1;

  // fill right side from top to bottom
  for (let i = 0; i < pairs.length; i++) {
    if (pairs[i].right === undefined && playerIdx < players.length) {
      pairs[i].right = players[playerIdx];
      playerIdx++;
    }
  }

  // fill left side from bottom to top
  for (let i = pairs.length - 1; i >= 0; i--) {
    if (pairs[i].left === undefined && playerIdx < players.length) {
      pairs[i].left = players[playerIdx];
      playerIdx++;
    }
  }

  if (debug) {
    console.table(pairs);
  }

  return pairs as Pairing[];
}

export function createGamesFromPairs(pairs: Pairing[]): Game[] {
  const games: Game[] = [];

  // Pair rows: first with second, third with fourth, etc.

  for (let i = 0; i < pairs.length; i += 2) {
    if (i + 1 < pairs.length) {
      games.push({
        court: i / 2 + 1,
        team1: [pairs[i].left, pairs[i + 1].left],
        team2: [pairs[i].right, pairs[i + 1].right],
      });
    }
  }

  return games;
}

export function rotatePlayers(_players: number[]): number[] {
  const players = [..._players];
  if (players.length <= 1) {
    return [...players];
  }

  // Berger table rotation:
  // Keep first player fixed, move second player to end, shift others left
  const fixed = players[0];
  const rotated = [fixed];
  rotated.push(...players.slice(2));
  rotated.push(players[1]);
  return rotated;
}

export function generateSchedule(numPlayersInput: number): Schedule {
  const numPlayers = numPlayersInput;
  // const numPlayers =
  //   numPlayersInput % 2 === 0 ? numPlayersInput : numPlayersInput + 1;

  const numberOfRounds = numPlayers - 1;
  let players = createPlayers(numPlayers);
  const schedule: Schedule = { games: [] };

  for (let round = 0; round < numberOfRounds; round++) {
    const pairs = createCirclePairs(players);
    const games = createGamesFromPairs(pairs);
    schedule.games.push(games);
    players = rotatePlayers(players);
  }

  return schedule;
}
