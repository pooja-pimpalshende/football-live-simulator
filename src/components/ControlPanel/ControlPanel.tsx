import { FC } from 'react';
import { Button, Progress } from '@shadcn-ui';
import { MAX_MINUTES, SIMULATION_STATES } from '../../constants';
import { SimulationState } from '../../store';

interface ControlPanelProps {
  simulationState: SimulationState;
  totalGoals: number;
  elapsed: number;
  onStart: () => void;
  onRestart: () => void;
  onFinish: () => void;
}

export const ControlPanel: FC<ControlPanelProps> = ({
  simulationState,
  elapsed,
  onStart,
  onRestart,
  onFinish,
}) => {
  const getButtonConfig = () => {
    switch (simulationState) {
      case SIMULATION_STATES.IDLE:
        return {
          text: 'Start Simulation',
          color: 'bg-green-600 hover:bg-green-700',
          action: onStart,
          'data-testid': 'start-button',
        };
      case SIMULATION_STATES.RUNNING:
        return {
          text: 'Finish Simulation',
          color: 'bg-red-600 hover:bg-red-700',
          action: onFinish,
          'data-testid': 'finish-button',
        };
      case SIMULATION_STATES.FINISHED:
        return {
          text: 'Restart Simulation',
          color: 'bg-blue-600 hover:bg-blue-700',
          action: onRestart,
          'data-testid': 'restart-button',
        };
      default:
        return {
          text: 'Start Simulation',
          color: 'bg-green-600 hover:bg-green-700',
          action: onStart,
          'data-testid': 'start-button',
        };
    }
  };

  const buttonConfig = getButtonConfig();

  return (
    <div className={`${'bg-white border-gray-200'} rounded-lg shadow-lg p-6 border`}>
      <div className="text-center space-y-4">
        <div className="flex justify-center space-x-4">
          <Button
            onClick={buttonConfig.action}
            data-testid={buttonConfig['data-testid']}
            className={`!rounded-button whitespace-nowrap cursor-pointer ${buttonConfig.color} text-white text-lg px-8 py-3 font-semibold transition-all duration-200 transform hover:scale-105`}
          >
            {buttonConfig.text}
          </Button>
        </div>

        {(simulationState === SIMULATION_STATES.RUNNING ||
          simulationState === SIMULATION_STATES.FINISHED) && (
          <div className="w-full mt-4">
            <Progress
              className="transition-all duration-700"
              data-testid="progress"
              value={(elapsed / MAX_MINUTES) * 100}
            />
            <div className="text-xs text-gray-500 mt-1">
              {elapsed} / {MAX_MINUTES} sec
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
