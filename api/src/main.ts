import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

const teams = [
  { id: 1, name: 'Germany', flag: '🇩🇪' },
  { id: 2, name: 'Poland', flag: '🇵🇱' },
  { id: 3, name: 'Brazil', flag: '🇧🇷' },
  { id: 4, name: 'Mexico', flag: '🇲🇽' },
  { id: 5, name: 'Argentina', flag: '🇦🇷' },
  { id: 6, name: 'Uruguay', flag: '🇺🇾' },
];

const results = [
  {
    matchId: 1,
    homeTeam: 'Germany',
    awayTeam: 'Poland',
    homeScore: 0,
    awayScore: 0,
  },
  {
    matchId: 2,
    homeTeam: 'Brazil',
    awayTeam: 'Mexico',
    homeScore: 0,
    awayScore: 0,
  },
  {
    matchId: 3,
    homeTeam: 'Argentina',
    awayTeam: 'Uruguay',
    homeScore: 0,
    awayScore: 0,
  },
];

app.get('/api/teams', (_req, res) => {
  res.json(teams);
});

app.get('/api/results', (_req, res) => {
  res.json(results);
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
