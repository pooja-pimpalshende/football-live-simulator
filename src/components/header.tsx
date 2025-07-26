import React from 'react';
import { useSimulation } from '../hooks';

export const Header: React.FC = () => {
  const { totalGoals } = useSimulation();
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
  );
};
