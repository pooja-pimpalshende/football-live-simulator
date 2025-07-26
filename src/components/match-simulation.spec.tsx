import { render } from '@testing-library/react';

import MatchSimulation from './match-simulation';

describe('MatchSimulation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MatchSimulation />);
    expect(baseElement).toBeTruthy();
  });
});
