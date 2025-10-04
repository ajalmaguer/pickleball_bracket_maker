export type MatchWithoutByes = {
  court: number;
  team1: [number, number];
  team2: [number, number];
};

export type Match = {
  court: number;
  team1: [number | null, number | null];
  team2: [number | null, number | null];
};

export type Round = (Match | MatchWithoutByes)[];

export type Schedule = Round[];

// Round robin algorithm using circular rotation method
export function generateSchedule(n: number): Schedule | null {
  if (n < 4) {
    alert('Minimum number of players is 4.');
    return null;
  }
  // if (n % 4 !== 0 || n < 4) {
  //   alert('Invalid number of players. Please enter a number divisible by 4.');
  //   return null;
  // }

  const numRounds = n - 1;
  const numCourts = n / 4;
  const rounds = [];

  // Create array of player indices
  const players = Array.from({ length: n }, (_, i) => i + 1);

  // Fix player 1, rotate others
  const fixed = players[0];
  const rotating = players.slice(1);

  for (let round = 0; round < numRounds; round++) {
    const roundMatches: Match[] = [];
    const currentRound = [fixed, ...rotating];

    // Pair up players for this round
    for (let court = 0; court < numCourts; court++) {
      const idx = court * 4;
      roundMatches.push({
        court: court + 1,
        team1: [currentRound[idx] || null, currentRound[idx + 1] || null],
        team2: [currentRound[idx + 2] || null, currentRound[idx + 3] || null],
      });
    }

    rounds.push(roundMatches);

    // Rotate players (circular rotation)
    const popped = rotating.pop();
    if (popped !== undefined) {
      rotating.unshift(popped);
    }
  }

  return rounds;
}
