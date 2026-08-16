export type PlayerId = number;
export type Match = {
  serve: [PlayerId, PlayerId];
  receive: [PlayerId, PlayerId];
};
export type RoundRobin = Match[][];
export type TeamCountMap = {
  [teamId: PlayerId]: {
    with: { [opponentId: PlayerId]: number };
    against: { [opponentId: PlayerId]: number };
  };
};

export function analyzeMatchups(roundRobin: RoundRobin, log?: boolean) {
  const flattenedRoundRobin = roundRobin.flat();
  const teamCountMap: TeamCountMap = {};

  function trackTeam({
    playerId,
    teamMateId,
    opponentIds,
  }: {
    playerId: PlayerId;
    teamMateId: PlayerId;
    opponentIds: [PlayerId, PlayerId];
  }) {
    let currentPlayer = teamCountMap[playerId];
    if (!currentPlayer) {
      currentPlayer = {
        with: {
          [teamMateId]: 1,
        },
        against: {
          [opponentIds[0]]: 1,
          [opponentIds[1]]: 1,
        },
      };
    } else {
      if (!currentPlayer.with[teamMateId]) {
        currentPlayer.with[teamMateId] = 1;
      } else {
        currentPlayer.with[teamMateId] = currentPlayer.with[teamMateId] + 1;
      }

      if (!currentPlayer.against[opponentIds[0]]) {
        currentPlayer.against[opponentIds[0]] = 1;
      } else {
        currentPlayer.against[opponentIds[0]] =
          currentPlayer.against[opponentIds[0]] + 1;
      }

      if (!currentPlayer.against[opponentIds[1]]) {
        currentPlayer.against[opponentIds[1]] = 1;
      } else {
        currentPlayer.against[opponentIds[1]] =
          currentPlayer.against[opponentIds[1]] + 1;
      }
    }

    teamCountMap[playerId] = currentPlayer;
  }

  for (const match of flattenedRoundRobin) {
    trackTeam({
      playerId: match.serve[0],
      teamMateId: match.serve[1],
      opponentIds: match.receive,
    });

    trackTeam({
      playerId: match.serve[1],
      teamMateId: match.serve[0],
      opponentIds: match.receive,
    });

    trackTeam({
      playerId: match.receive[0],
      teamMateId: match.receive[1],
      opponentIds: match.serve,
    });

    trackTeam({
      playerId: match.receive[1],
      teamMateId: match.receive[0],
      opponentIds: match.serve,
    });
  }

  if (log) {
    console.log('final teamCountMap = ', JSON.stringify(teamCountMap, null, 1));
  }
  return teamCountMap;
}
