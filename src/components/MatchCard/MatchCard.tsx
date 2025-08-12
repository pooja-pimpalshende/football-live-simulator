import { FC, memo } from 'react';
import { Card, CardContent, Badge } from '@shadcn-ui';
import { Match } from '../../store';
import { AWAY, HOME } from '../../constants';

interface MatchCardProps {
  match: Match;
}

export const MatchCard: FC<MatchCardProps> = memo(({ match }) => {
  return (
    <Card
      data-testid="match-score"
      className={`bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {/* Home Team */}
          <div
            className={`flex items-center space-x-3 flex-1 ${
              match.lastScorer === HOME ? 'animate-pulse' : ''
            }`}
          >
            <span role="img" aria-label="country-flag" className={`${match.homeFlag} text-2xl`}>
              {match.homeFlag}
            </span>
            <span className="text-xl font-bold">{match.homeTeam}</span>
            {match.lastScorer === HOME && (
              <Badge className="bg-orange-500 text-white animate-bounce">GOAL!</Badge>
            )}
          </div>
          {/* Score */}
          <div className="flex flex-col items-center mx-8">
            <div className="text-4xl font-bold text-center mb-2">
              <span
                className={`${match.lastScorer === HOME ? 'text-orange-500' : 'text-gray-900'}`}
              >
                {match.homeScore}
              </span>
              <span className={`mx-4 ${'text-gray-500'}`}>:</span>
              <span
                className={`${match.lastScorer === AWAY ? 'text-orange-500' : 'text-gray-900'}`}
              >
                {match.awayScore}
              </span>
            </div>
          </div>
          {/* Away Team */}
          <div
            className={`flex items-center space-x-3 flex-1 justify-end ${
              match.lastScorer === AWAY ? 'animate-pulse' : ''
            }`}
          >
            {match.lastScorer === AWAY && (
              <Badge className="bg-orange-500 text-white animate-bounce">GOAL!</Badge>
            )}
            <span className="text-xl font-bold">{match.awayTeam}</span>
            <span role="img" aria-label="country-flag" className={`${match.awayFlag} text-2xl`}>
              {match.awayFlag}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
