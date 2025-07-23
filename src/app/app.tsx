import { useEffect, useRef } from 'react';
import { Card, CardContent, Badge, Progress, Button } from '@shadcn-ui';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  resetMatches,
  setElapsed,
  setMatches,
  setStarted,
  setTotalGoals,
} from '../store/matchSlice';

export function App() {
  const dispatch = useDispatch();
  const { started, totalGoals, elapsed, matches } = useSelector(
    (state: RootState) => state.match
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const matchesRef = useRef(matches);
  const totalGoalsRef = useRef(totalGoals);

  useEffect(() => {
    matchesRef.current = matches;
    totalGoalsRef.current = totalGoals;
  }, [matches, totalGoals]);

  useEffect(() => {
    if ((totalGoals === 9 || elapsed >= 90) && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      dispatch(setStarted(false));
    }
  }, [totalGoals, elapsed, matches, dispatch]);

  const startSimulation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    dispatch(
      setMatches(
        matches.map((match) => ({
          ...match,
          homeScore: 0,
          awayScore: 0,
          lastScorer: null,
        }))
      )
    );
    dispatch(setStarted(true));
    dispatch(setElapsed(0));
    dispatch(setTotalGoals(0));
    let seconds = 0;
    intervalRef.current = setInterval(() => {
      seconds += 1;
      dispatch(setElapsed(seconds));

      const currentMatches = matchesRef.current;
      const currentTotalGoals = totalGoalsRef.current;

      if (seconds % 10 === 0 && seconds <= 90 && currentTotalGoals < 9) {
        const matchIndex = Math.floor(Math.random() * currentMatches.length);
        const team = Math.random() < 0.5 ? 'homeScore' : 'awayScore';
        const updatedMatches = currentMatches.map((match, index) =>
          index === matchIndex
            ? {
                ...match,
                [team]: match[team] + 1,
                lastScorer: team === 'homeScore' ? 'home' : 'away',
              }
            : { ...match, lastScorer: null }
        );

        dispatch(setMatches(updatedMatches));
        dispatch(setTotalGoals(currentTotalGoals + 1));
        setTimeout(() => {
          dispatch(
            setMatches(
              updatedMatches.map((match) => ({
                ...match,
                lastScorer: null,
              }))
            )
          );
        }, 1500);
      }
    }, 1000);
  };

  const restartSimulation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    dispatch(setTotalGoals(0));
    dispatch(resetMatches());
    dispatch(setStarted(false));
    dispatch(setElapsed(0));
    setTimeout(() => {
      startSimulation();
    }, 0);
  };

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
              <span data-testid="total-goals" className="text-lg font-semibold">
                Total Goals: {totalGoals}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Match Cards */}
        <div className="space-y-6 mb-8">
          {matches.map((match) => (
            <Card
              data-testid="match-score"
              key={match.id}
              className={`${'bg-white border-gray-200'} shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  {/* Home Team */}
                  <div
                    className={`flex items-center space-x-3 flex-1 ${
                      match.lastScorer === 'home' ? 'animate-pulse' : ''
                    }`}
                  >
                    <span
                      role="img"
                      aria-label="country-flag"
                      className={`${match.homeFlag} text-2xl`}
                    >
                      {match.homeFlag}
                    </span>
                    <span className="text-xl font-bold">{match.homeTeam}</span>
                    {match.lastScorer === 'home' && (
                      <Badge className="bg-orange-500 text-white animate-bounce">
                        <i className="fas fa-futbol mr-1"></i>
                        GOAL!
                      </Badge>
                    )}
                  </div>

                  {/* Score */}
                  <div className="flex flex-col items-center mx-8">
                    <div className="text-4xl font-bold text-center mb-2">
                      <span
                        className={`${
                          match.lastScorer === 'home'
                            ? 'text-orange-500'
                            : 'text-gray-900'
                        }`}
                      >
                        {match.homeScore}
                      </span>
                      <span className={`mx-4 ${'text-gray-500'}`}>:</span>
                      <span
                        className={`${
                          match.lastScorer === 'away'
                            ? 'text-orange-500'
                            : 'text-gray-900'
                        }`}
                      >
                        {match.awayScore}
                      </span>
                    </div>
                    <div
                      className={`text-sm ${'text-gray-500'} flex items-center`}
                    >
                      {started ? `${elapsed}'` : "0'"}
                      <span role="img" aria-label="clock">
                        ⏰
                      </span>{' '}
                    </div>
                  </div>

                  {/* Away Team */}
                  <div
                    className={`flex items-center space-x-3 flex-1 justify-end ${
                      match.lastScorer === 'away' ? 'animate-pulse' : ''
                    }`}
                  >
                    {match.lastScorer === 'away' && (
                      <Badge className="bg-orange-500 text-white animate-bounce">
                        <i className="fas fa-futbol mr-1"></i>
                        GOAL!
                      </Badge>
                    )}
                    <span className="text-xl font-bold">{match.awayTeam}</span>
                    <span
                      role="img"
                      aria-label="country-flag"
                      className={`${match.awayFlag} text-2xl`}
                    >
                      {match.awayFlag}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Control Panel */}
        <div
          className={`${'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}
        >
          <div className="text-center space-y-4">
            <div className="flex justify-center space-x-4">
              {!started && totalGoals < 9 && (
                <Button data-testid="start-button" onClick={startSimulation}>
                  Start Simulation
                </Button>
              )}
              {started && totalGoals < 9 && (
                <Button data-testid="finish-button" onClick={restartSimulation}>
                  Finish Simulation
                </Button>
              )}
              {totalGoals === 9 && (
                <Button
                  data-testid="restart-button"
                  onClick={restartSimulation}
                >
                  Restart Simulation
                </Button>
              )}
            </div>
            {/* Progress Bar */}
            {started && (
              <div className="w-full mt-4">
                <Progress
                  className="transition-all duration-700"
                  value={(elapsed / 90) * 100}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {elapsed} / 90 sec
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`${'bg-white border-gray-200'} border-t mt-12`}>
        <div className="max-w-6xl mx-auto px-6 py-6 text-center">
          <p className={`text-sm ${'text-gray-500'}`}>
            Football Match Simulator © 2025 - Experience the thrill of live
            football
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
