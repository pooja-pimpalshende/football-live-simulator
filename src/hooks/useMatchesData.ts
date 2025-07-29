import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateSimulationState } from '../store';
import { useTeamsQuery } from './useTeamsQuery';
import { useResultsQuery } from './useResultsQuery';

export function useMatchesData() {
  const { data: teams, isPending: teamsPending, error: teamsError } = useTeamsQuery();

  const { data: results, isPending: resultsPending, error: resultsError } = useResultsQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!teams || !results) return;

    const matches = results?.map((result, idx: number) => {
      const home = teams?.find((team) => team.name === result.homeTeam);
      const away = teams?.find((team) => team.name === result.awayTeam);
      return {
        id: idx + 1,
        homeTeam: result.homeTeam,
        awayTeam: result.awayTeam,
        homeScore: result.homeScore,
        awayScore: result.awayScore,
        homeFlag: home?.flag || '',
        awayFlag: away?.flag || '',
        lastScorer: null,
      };
    });
    dispatch(updateSimulationState({ matches }));
  }, [teams, dispatch, results]);

  return {
    teamsPending,
    teamsError,
    resultsPending,
    resultsError,
  };
}
