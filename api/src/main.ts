import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

const teams = [
  {
    id: 1,
    homeTeam: 'Germany',
    awayTeam: 'Poland',
    homeScore: 0,
    awayScore: 0,
    homeFlag: '🇩🇪',
    awayFlag: '🇵🇱',
    lastScorer: null,
  },
  {
    id: 2,
    homeTeam: 'Brazil',
    awayTeam: 'Mexico',
    homeScore: 0,
    awayScore: 0,
    homeFlag: '🇧🇷',
    awayFlag: '🇲🇽',
    lastScorer: null,
  },
  {
    id: 3,
    homeTeam: 'Argentina',
    awayTeam: 'Uruguay',
    homeScore: 0,
    awayScore: 0,
    homeFlag: '🇦🇷',
    awayFlag: '🇺🇾',
    lastScorer: null,
  },
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

app.use(express.json());
app.post('/api/results', (req, res) => {
  const { matchId, homeScore, awayScore } = req.body;
  const match = results.find((m) => m.matchId === matchId);
  if (match) {
    match.homeScore = homeScore;
    match.awayScore = awayScore;
    res.json(match);
  } else {
    res.status(404).json({ error: 'Match not found' });
  }
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
