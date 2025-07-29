import { useQuery, UseQueryResult } from '@tanstack/react-query';

export type Results = {
  matchId: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
};

export function useResultsQuery(): UseQueryResult<Results[]> {
  return useQuery({
    queryKey: ['results'],
    queryFn: async () => {
      const res = await fetch('/api/results');
      if (!res.ok) throw new Error('Failed to fetch results data');

      return res.json();
    },
  });
}
