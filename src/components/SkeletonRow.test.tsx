import { render } from '@testing-library/react';
import SkeletonRow from './SkeletonRow';

describe('SkeletonRow', () => {
  it('should render without crashing', () => {
    render(<SkeletonRow />);
  });
});
