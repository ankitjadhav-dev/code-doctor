import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScoreRing } from './score-ring';

describe('ScoreRing', () => {
  it('shows the supplied score', () => {
    render(<ScoreRing score={84} />);
    expect(screen.getByText('84')).toBeInTheDocument();
  });
});
