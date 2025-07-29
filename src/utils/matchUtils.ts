import { HOME, AWAY } from '../constants';
import { Match } from '../store';

export const resetAllMatches = (matches: Match[]): Match[] =>
  matches.map((match) => ({
    ...match,
    homeScore: 0,
    awayScore: 0,
    lastScorer: null,
  }));

export const updateMatchWithGoal = (
  matches: Match[],
  matchIndex: number,
  team: 'homeScore' | 'awayScore',
): Match[] =>
  matches.map((match, index) =>
    index === matchIndex
      ? {
          ...match,
          [team]: match[team] + 1,
          lastScorer: team === 'homeScore' ? HOME : AWAY,
        }
      : { ...match, lastScorer: null },
  );

export const clearLastScorer = (matches: Match[]): Match[] =>
  matches.map((match) => ({
    ...match,
    lastScorer: null,
  }));
