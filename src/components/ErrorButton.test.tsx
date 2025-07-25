import { render } from '@testing-library/react';
import ErrorButton from './ErrorButton';

describe('ErrorButton', () => {
  it('should render without crashing', () => {
    const { getByRole } = render(<ErrorButton onThrowError={() => {}} />);
    expect(getByRole('button')).toBeInTheDocument();
  });
});
