import { fireEvent, screen } from '@testing-library/dom';
import { ControlPanel } from './ControlPanel';
import { render } from '@testing-library/react';

vi.mock('@shadcn-ui', () => ({
  Button: (props: any) => <button {...props} />,
  Progress: (props: any) => <div data-testid="progress" {...props} />,
}));

describe('ControlPanel', () => {
  it('shows start button when not started and total goals = 0', () => {
    render(
      <ControlPanel
        started={false}
        totalGoals={0}
        elapsed={0}
        onStart={vi.fn()}
        onRestart={vi.fn()}
      />
    );
    expect(screen.getByTestId('start-button')).toBeInTheDocument();
  });

  it('shows finish button when started and total goals < 9', () => {
    render(
      <ControlPanel
        started={true}
        totalGoals={5}
        elapsed={10}
        onStart={vi.fn()}
        onRestart={vi.fn()}
      />
    );
    expect(screen.getByTestId('finish-button')).toBeInTheDocument();
  });

  it('shows restart button when total goals is 9', () => {
    render(
      <ControlPanel
        started={true}
        totalGoals={9}
        elapsed={90}
        onStart={vi.fn()}
        onRestart={vi.fn()}
      />
    );
    expect(screen.getByTestId('restart-button')).toBeInTheDocument();
  });

  it('shows progress bar and elapsed time when started', () => {
    render(
      <ControlPanel
        started={true}
        totalGoals={5}
        elapsed={35}
        onStart={vi.fn()}
        onRestart={vi.fn()}
      />
    );
    expect(screen.getByTestId('progress')).toBeInTheDocument();
    expect(screen.getByText('35 / 90 sec')).toBeInTheDocument();
  });

  it('calls onStart when start button is clicked', () => {
    const onStart = vi.fn();
    render(
      <ControlPanel
        started={false}
        totalGoals={0}
        elapsed={0}
        onStart={onStart}
        onRestart={vi.fn()}
      />
    );
    fireEvent.click(screen.getByTestId('start-button'));
    expect(onStart).toHaveBeenCalled();
  });

  it('calls onRestart when restart button is clicked', () => {
    const onRestart = vi.fn();
    render(
      <ControlPanel
        started={true}
        totalGoals={9}
        elapsed={90}
        onStart={vi.fn()}
        onRestart={onRestart}
      />
    );
    fireEvent.click(screen.getByTestId('restart-button'));
    expect(onRestart).toHaveBeenCalled();
  });
});
