import { useEffect } from 'react';
import { useTeamsQuery } from './useTeamsQuery';
import { useDispatch } from 'react-redux';
import { setMatches } from '../store/match.slice';
import { UseResultsQuery } from './useResultsQuery';

export function UseCombinedMatchesQuery() {
  const {
    data: teams,
    isPending: teamsPending,
    error: teamsError,
    status: teamsStatus,
  } = useTeamsQuery();

  const {
    data: results,
    isPending: resultsPending,
    error: resultsError,
    status: resultsStatus,
  } = UseResultsQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      teams &&
      teamsStatus === 'success' &&
      results &&
      resultsStatus === 'success'
    ) {
      const matches = results.map((result, idx: number) => {
        const home = teams.find((team) => team.name === result.homeTeam);
        const away = teams.find((team) => team.name === result.awayTeam);
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
      dispatch(setMatches(matches));
    }
  }, [teams, dispatch, teamsStatus, results, resultsStatus]);

  return {
    teamsPending,
    teamsError,
    resultsPending,
    resultsError,
  };
}

export default UseCombinedMatchesQuery;
