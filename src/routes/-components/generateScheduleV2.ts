export interface Pairing {
  left: number;
  right: number;
}
export interface Game {
  court: number;
  team1: [number, number];
  team2: [number, number];
}

export interface Schedule {
  games: Game[][];
}

export function createPlayers(numPlayers: number): number[] {
  return Array.from({ length: numPlayers }, (_, i) => i + 1);
}

export function createCirclePairs(players: number[]) {
  const n = players.length;
  const pairs = [];

  // For a circle, we pair adjacent positions going around
  // For an even number, we go: 0-1, (n-1)-2, (n-2)-3, etc.

  for (let i = 0; i < n / 2; i++) {
    if (i === 0) {
      // First pair: positions 0 and 1
      pairs.push({
        left: players[0],
        right: players[1],
      });
    } else {
      // Remaining pairs: from the end going inward
      pairs.push({
        left: players[n - i],
        right: players[i + 1],
      });
    }
  }

  return pairs;
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

export function generateSchedule(numPlayers: number): Schedule {
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
