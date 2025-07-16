import { render } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('should render without crashing', () => {
    render(
      <Card
        person={{ name: 'Luke Skywalker', birth_year: '19BBY', gender: 'male' }}
        highlight={false}
      />
    );
  });
});
