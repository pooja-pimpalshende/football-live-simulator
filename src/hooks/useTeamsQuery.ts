import { useQuery } from '@tanstack/react-query';

export function useTeamsQuery() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const res = await fetch('/api/teams');
      if (!res.ok) throw new Error('Failed to fetch teams data');

      return res.json();
    },
  });
}
