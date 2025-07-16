import { render } from '@testing-library/react';
import Message from './Message';

describe('Message', () => {
  it('should render without crashing', () => {
    render(<Message text="Test" />);
  });
});
