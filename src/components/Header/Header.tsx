import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

export const Header: FC = memo(() => {
  const totalGoals = useSelector((state: RootState) => state.match.totalGoals);
  return (
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
        {totalGoals > 0 && (
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span role="img" aria-label="trophy">
                🏆
              </span>{' '}
              <span data-testid="total-goals" className="text-lg font-semibold">
                Total Goals: {totalGoals}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
});
