import { useEffect, useRef, useState } from 'react';

const initialMatches = [
  { id: 1, home: 'Germany', away: 'Poland', homeScore: 0, awayScore: 0 },
  { id: 2, home: 'Brazil', away: 'Mexico', homeScore: 0, awayScore: 0 },
  { id: 3, home: 'Argentina', away: 'Uruguay', homeScore: 0, awayScore: 0 },
];

export function App() {
  const [started, setStarted] = useState(false);
  const [totalGoals, setTotalGoals] = useState(0);
  const [matches, setMatches] = useState(initialMatches);
  const [shouldAutoStart, setShouldAutoStart] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (totalGoals === 9 && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [totalGoals]);

  const startSimulation = () => {
    setStarted(true);
    intervalRef.current = setInterval(() => {
      setMatches((prevMatches) => {
        const matchIndex = Math.floor(Math.random() * prevMatches.length);
        const team = Math.random() < 0.5 ? 'homeScore' : 'awayScore';
        const newMatches = prevMatches.map((match, index) =>
          index === matchIndex ? { ...match, [team]: match[team] + 1 } : match
        );
        return newMatches;
      });

      setTotalGoals((prev) => (prev < 9 ? prev + 1 : prev));
    }, 10000);
  };

  const restartSimulation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTotalGoals(0);
    setMatches(initialMatches);
    setStarted(false);
    setShouldAutoStart(true);
  };

  useEffect(() => {
    if (shouldAutoStart) {
      setShouldAutoStart(false);
      startSimulation();
    }
  }, [shouldAutoStart]);

  return (
    <>
      {/* Header */}
      <header className={`${'bg-white border-gray-200'} border-b shadow-sm`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-green-600">
              <span role="img" aria-label="football">
                ⚽️
              </span>{' '}
              Football Live
            </h1>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <i className="fas fa-trophy text-yellow-500"></i>
              <span role="img" aria-label="trophy">
                🏆
              </span>{' '}
              <span className="text-lg font-semibold">
                Total Goals: {totalGoals}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div>
        {matches.map((match) => (
          <div data-testid="match-score" key={match.id}>
            {match.home} {match.homeScore}:{match.awayScore} {match.away}
          </div>
        ))}
        {!started && totalGoals < 9 && (
          <button data-testid="start-button" onClick={startSimulation}>
            Start
          </button>
        )}
        {started && totalGoals < 9 && (
          <button data-testid="finish-button" onClick={restartSimulation}>
            Finish
          </button>
        )}
        {totalGoals === 9 && (
          <button data-testid="restart-button" onClick={restartSimulation}>
            Restart
          </button>
        )}
        <div data-testid="total-goals">{totalGoals}</div>
      </div>
    </>
  );
}

export default App;
