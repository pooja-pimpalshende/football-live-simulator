import { render } from '@testing-library/react';

import MatchSimulator from './MatchSimulator';

describe('MatchSimulator', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MatchSimulator />);
    expect(baseElement).toBeTruthy();
  });
});
