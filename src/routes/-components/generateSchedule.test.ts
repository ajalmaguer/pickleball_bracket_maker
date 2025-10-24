import { describe, expect, it } from 'vitest';
import {
  createCirclePairs,
  createGamesFromPairs,
  createPlayers,
  rotatePlayers,
  generateSchedule,
} from './generateSchedule';

describe('createGamesFromPairs', () => {
  it('creates pairs and games for 8 players in a circle pairing format', () => {
    // example:
    // 1  2
    // 8  3
    // 7  4
    // 6  5
    //
    // Game 1: 1&8 vs 2&3
    // Game 2: 7&6 vs 4&5

    const players = createPlayers(8);
    expect(players).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);

    const pairs = createCirclePairs(players);
    expect(pairs).toEqual([
      { left: 1, right: 2 },
      { left: 8, right: 3 },
      { left: 7, right: 4 },
      { left: 6, right: 5 },
    ]);

    // create games
    const games = createGamesFromPairs(pairs);
    expect(games).toEqual([
      {
        court: 1,
        team1: [1, 8],
        team2: [2, 3],
      },
      {
        court: 2,
        team1: [7, 6],
        team2: [4, 5],
      },
    ]);
  });
});

describe('rotatePlayers', () => {
  it('rotates players and generates correct pairs and games for the next round', () => {
    // 1  3
    // 2  4
    // 8  5
    // 7  6

    // Game 1: 1&2 vs 3&4
    // Game 2: 8&7 vs 5&6

    const players = createPlayers(8);
    const rotatedPlayers = rotatePlayers(players);

    const pairs = createCirclePairs(rotatedPlayers);
    expect(pairs).toEqual([
      { left: 1, right: 3 },
      { left: 2, right: 4 },
      { left: 8, right: 5 },
      { left: 7, right: 6 },
    ]);

    const games = createGamesFromPairs(pairs);
    expect(games).toEqual([
      {
        court: 1,
        team1: [1, 2],
        team2: [3, 4],
      },
      {
        court: 2,
        team1: [8, 7],
        team2: [5, 6],
      },
    ]);
  });
});

describe('generateSchedule', () => {
  it('generates a full schedule for 8 players over 7 rounds', () => {
    // ROUND 1
    // 1  2
    // 8  3
    // 7  4
    // 6  5
    // Game 1: 1&8 vs 2&3
    // Game 2: 7&6 vs 4&5
    //
    // ROUND 2
    // 1  3
    // 2  4
    // 8  5
    // 7  6
    // Game 1: 1&2 vs 3&4
    // Game 2: 8&7 vs 5&6
    //
    // ROUND 3
    // 1  4
    // 3  5
    // 2  6
    // 8  7
    // Game 1: 1&3 vs 4&5
    // Game 2: 2&8 vs 6&7
    //
    // ROUND 4
    // 1  5
    // 4  6
    // 3  7
    // 2  8
    // Game 1: 1&4 vs 5&6
    // Game 2: 3&2 vs 7&8
    //
    // ROUND 5
    // 1  6
    // 5  7
    // 4  8
    // 3  2
    // Game 1: 1&5 vs 6&7
    // Game 2: 4&3 vs 8&2
    //
    // ROUND 6
    // 1  7
    // 6  8
    // 5  2
    // 4  3
    // Game 1: 1&6 vs 7&8
    // Game 2: 5&4 vs 2&3
    //
    // ROUND 7
    // 1  8
    // 7  2
    // 6  3
    // 5  4
    // Game 1: 1&7 vs 8&2
    // Game 2: 6&5 vs 3&4

    const schedule = generateSchedule(8);
    expect(schedule.games.length).toBe(7);
    expect(schedule).toMatchSnapshot();
  });

  it('generates a schedule for 4 players over 3 rounds', () => {
    const schedule = generateSchedule(4);
    expect(schedule.games.length).toBe(3);
    expect(schedule).toMatchSnapshot();
  });

  describe('for 5 players', () => {
    it('generates a schedule for 6 players over 5 rounds because one the players gets a bye each round', () => {
      const schedule = generateSchedule(5);
      expect(schedule.games.length).toBe(5);
      expect(schedule).toMatchSnapshot();
    });
  });
});
