import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders copyright notice', () => {
    render(<Footer />);
    expect(
      screen.getByText(/© 2025 - Experience the thrill/i)
    ).toBeInTheDocument();
  });
});
