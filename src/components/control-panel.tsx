import React from 'react';
import { Button, Progress } from '@shadcn-ui';

interface ControlPanelProps {
  started: boolean;
  totalGoals: number;
  elapsed: number;
  onStart: () => void;
  onRestart: () => void;
  onFinish: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  started,
  totalGoals,
  elapsed,
  onStart,
  onRestart,
  onFinish,
}) => (
  <div
    className={`${'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}
  >
    <div className="text-center space-y-4">
      <div className="flex justify-center space-x-4">
        {!started && totalGoals < 9 && (
          <Button data-testid="start-button" onClick={onStart}>
            Start Simulation
          </Button>
        )}
        {started && totalGoals < 9 && (
          <Button data-testid="finish-button" onClick={onFinish}>
            Finish Simulation
          </Button>
        )}
        {totalGoals === 9 && (
          <Button data-testid="restart-button" onClick={onRestart}>
            Restart Simulation
          </Button>
        )}
      </div>

      {started && (
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
