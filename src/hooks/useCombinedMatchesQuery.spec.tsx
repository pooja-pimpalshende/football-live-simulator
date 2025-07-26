import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import UseCombinedMatchesQuery from './useCombinedMatchesQuery';

describe('UseCombinedMatchesQuery', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => UseCombinedMatchesQuery());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
