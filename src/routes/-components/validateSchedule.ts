import type { Schedule } from './generateSchedule';

type PlayerMap = {
  [playerId: number]: {
    opponents: { [opponentId: number]: number };
    partners: { [partnerId: number]: number };
  };
};

export function validateSchedule(tournament: Schedule) {
  const games = tournament.games.flatMap((round) => round);
  console.log('games', games);

  const playerMap = {} as PlayerMap;

  // Populate the maps
  for (const game of games) {
    const [player1, player2] = game.team1;
    const [player3, player4] = game.team2;

    if (
      player1 === null ||
      player2 === null ||
      player3 === null ||
      player4 === null
    ) {
      continue; // Skip bye games
    }

    playerMap[player1] = playerMap[player1] || { opponents: {}, partners: {} };
    playerMap[player2] = playerMap[player2] || { opponents: {}, partners: {} };
    playerMap[player3] = playerMap[player3] || { opponents: {}, partners: {} };
    playerMap[player4] = playerMap[player4] || { opponents: {}, partners: {} };

    // Update opponents
    playerMap[player1].opponents[player3] =
      (playerMap[player1].opponents[player3] || 0) + 1;
    playerMap[player1].opponents[player4] =
      (playerMap[player1].opponents[player4] || 0) + 1;
    playerMap[player2].opponents[player3] =
      (playerMap[player2].opponents[player3] || 0) + 1;
    playerMap[player2].opponents[player4] =
      (playerMap[player2].opponents[player4] || 0) + 1;

    playerMap[player3].opponents[player1] =
      (playerMap[player3].opponents[player1] || 0) + 1;
    playerMap[player3].opponents[player2] =
      (playerMap[player3].opponents[player2] || 0) + 1;
    playerMap[player4].opponents[player1] =
      (playerMap[player4].opponents[player1] || 0) + 1;
    playerMap[player4].opponents[player2] =
      (playerMap[player4].opponents[player2] || 0) + 1;

    // Update partners
    playerMap[player1].partners[player2] =
      (playerMap[player1].partners[player2] || 0) + 1;
    playerMap[player2].partners[player1] =
      (playerMap[player2].partners[player1] || 0) + 1;

    playerMap[player3].partners[player4] =
      (playerMap[player3].partners[player4] || 0) + 1;
    playerMap[player4].partners[player3] =
      (playerMap[player4].partners[player3] || 0) + 1;
  }

  return playerMap;
}
