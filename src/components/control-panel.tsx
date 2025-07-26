import React from 'react';
import { Button, Progress } from '@shadcn-ui';
import { SimulationState } from '../store/match.slice';

interface ControlPanelProps {
  simulationState: SimulationState;
  totalGoals: number;
  elapsed: number;
  onStart: () => void;
  onRestart: () => void;
  onFinish: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  simulationState,
  totalGoals,
  elapsed,
  onStart,
  onRestart,
  onFinish,
}) => {
  const getButtonConfig = () => {
    switch (simulationState) {
      case 'idle':
        return {
          text: 'Start Simulation',
          color: 'bg-green-600 hover:bg-green-700',
          action: onStart,
        };
      case 'running':
        return {
          text: 'Finish Simulation',
          color: 'bg-red-600 hover:bg-red-700',
          action: onFinish,
        };
      case 'finished':
        return {
          text: 'Restart Simulation',
          color: 'bg-blue-600 hover:bg-blue-700',
          action: onRestart,
        };
      default:
        return {
          text: 'Start Simulation',
          color: 'bg-green-600 hover:bg-green-700',
          action: onStart,
        };
    }
  };

  const buttonConfig = getButtonConfig();

  return (
    <div
      className={`${'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}
    >
      <div className="text-center space-y-4">
        <div className="flex justify-center space-x-4">
          <Button
            onClick={buttonConfig.action}
            className={`!rounded-button whitespace-nowrap cursor-pointer ${buttonConfig.color} text-white text-lg px-8 py-3 font-semibold transition-all duration-200 transform hover:scale-105`}
          >
            {buttonConfig.text}
          </Button>
        </div>

        {simulationState === 'running' && (
          <div className="w-full mt-4">
            <Progress
              className="transition-all duration-700"
              value={(elapsed / 90) * 100}
            />
            <div className="text-xs text-gray-500 mt-1">{elapsed} / 90 sec</div>
          </div>
        )}
      </div>
    </div>
  );
};
