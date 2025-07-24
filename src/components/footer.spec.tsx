import { render, screen } from '@testing-library/react';
import { Footer } from './footer';

describe('Footer', () => {
  it('renders copyright notice', () => {
    render(<Footer />);
    expect(
      screen.getByText(/© 2025 - Experience the thrill/i)
    ).toBeInTheDocument();
  });
});
