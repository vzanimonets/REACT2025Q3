import { render } from '@testing-library/react';
import ErrorButton from './ErrorButton';

describe('ErrorButton', () => {
  it('should render without crashing', () => {
    render(<ErrorButton onThrowError={() => {}} />);
  });
});
