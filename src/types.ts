export type PlayerId = number;
export type Match = {
  serve: [PlayerId, PlayerId];
  receive: [PlayerId, PlayerId];
};
export type Round = Match[];
export type RoundRobin = Round[];
