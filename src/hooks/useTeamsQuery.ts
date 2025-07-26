import { useQuery, UseQueryResult } from '@tanstack/react-query';

type Team = {
  name: string;
  flag: string;
};

export function useTeamsQuery(): UseQueryResult<Team[]> {
  return useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const res = await fetch('/api/teams');
      if (!res.ok) throw new Error('Failed to fetch teams data');

      return res.json();
    },
  });
}
