import { fireEvent, screen } from '@testing-library/dom';
import { ControlPanel } from './ControlPanel';
import { render } from '@testing-library/react';
import { SimulationState } from '../../store';

vi.mock('@shadcn-ui', () => ({
  Button: (props: React.ComponentProps<'button'>) => <button {...props} />,
  Progress: (props: React.ComponentProps<'div'>) => <div data-testid="progress" {...props} />,
}));

const SIMULATION_STATES: Record<string, SimulationState> = {
  IDLE: 'idle',
  RUNNING: 'running',
  FINISHED: 'finished',
};

describe('ControlPanel', () => {
  it('shows start button when simulation is idle', () => {
    render(
      <ControlPanel
        simulationState={SIMULATION_STATES.IDLE}
        totalGoals={0}
        elapsed={0}
        onStart={vi.fn()}
        onRestart={vi.fn()}
        onFinish={vi.fn()}
      />,
    );
    expect(screen.getByTestId('start-button')).toBeInTheDocument();
  });

  it('shows finish button when simulation is running', () => {
    render(
      <ControlPanel
        simulationState={SIMULATION_STATES.RUNNING}
        totalGoals={2}
        elapsed={10}
        onStart={vi.fn()}
        onRestart={vi.fn()}
        onFinish={vi.fn()}
      />,
    );
    expect(screen.getByTestId('finish-button')).toBeInTheDocument();
  });

  it('shows restart button when simulation is finished', () => {
    render(
      <ControlPanel
        simulationState={SIMULATION_STATES.FINISHED}
        totalGoals={5}
        elapsed={90}
        onStart={vi.fn()}
        onRestart={vi.fn()}
        onFinish={vi.fn()}
      />,
    );
    expect(screen.getByTestId('restart-button')).toBeInTheDocument();
  });

  it('shows progress bar and elapsed time when running', () => {
    render(
      <ControlPanel
        simulationState={SIMULATION_STATES.RUNNING}
        totalGoals={3}
        elapsed={35}
        onStart={vi.fn()}
        onRestart={vi.fn()}
        onFinish={vi.fn()}
      />,
    );
    expect(screen.getByTestId('progress')).toBeInTheDocument();
    expect(screen.getByText('35 / 90 sec')).toBeInTheDocument();
  });

  it('shows progress bar and elapsed time when finished', () => {
    render(
      <ControlPanel
        simulationState={SIMULATION_STATES.FINISHED}
        totalGoals={7}
        elapsed={90}
        onStart={vi.fn()}
        onRestart={vi.fn()}
        onFinish={vi.fn()}
      />,
    );
    expect(screen.getByTestId('progress')).toBeInTheDocument();
    expect(screen.getByText('90 / 90 sec')).toBeInTheDocument();
  });

  it('calls onStart when start button is clicked', () => {
    const onStart = vi.fn();
    render(
      <ControlPanel
        simulationState={SIMULATION_STATES.IDLE}
        totalGoals={0}
        elapsed={0}
        onStart={onStart}
        onRestart={vi.fn()}
        onFinish={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByTestId('start-button'));
    expect(onStart).toHaveBeenCalled();
  });

  it('calls onFinish when finish button is clicked', () => {
    const onFinish = vi.fn();
    render(
      <ControlPanel
        simulationState={SIMULATION_STATES.RUNNING}
        totalGoals={2}
        elapsed={10}
        onStart={vi.fn()}
        onRestart={vi.fn()}
        onFinish={onFinish}
      />,
    );
    fireEvent.click(screen.getByTestId('finish-button'));
    expect(onFinish).toHaveBeenCalled();
  });

  it('calls onRestart when restart button is clicked', () => {
    const onRestart = vi.fn();
    render(
      <ControlPanel
        simulationState={SIMULATION_STATES.FINISHED}
        totalGoals={9}
        elapsed={90}
        onStart={vi.fn()}
        onRestart={onRestart}
        onFinish={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByTestId('restart-button'));
    expect(onRestart).toHaveBeenCalled();
  });
});
