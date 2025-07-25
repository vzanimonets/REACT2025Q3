import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Card from './Card';
import mockPerson from '../mocks/MockPerson';

describe('Card', () => {
  const baseProps = {
    person: mockPerson,
    highlight: false,
    searchTerm: '',
  };

  it('should render without crashing', () => {
    render(<Card {...baseProps} highlight={false} />);
  });

  it('renders all person fields', () => {
    const expectedValues = [
      'Luke Skywalker',
      '172',
      '77',
      'blond',
      'fair',
      'blue',
      '19BBY',
      'male',
    ];

    const { getByText, getAllByText } = render(<Card {...baseProps} />);
    expectedValues.forEach((value) => {
      expect(getByText(value)).toBeInTheDocument();
    });

    expect(getAllByText('0')).toHaveLength(2);
  });

  it('highlights name when highlight=true and searchTerm matches', () => {
    const { container } = render(
      <Card {...baseProps} highlight={true} searchTerm="Luke" />
    );
    const mark = container.querySelector('mark');
    expect(mark).toBeInTheDocument();
    expect(mark?.textContent?.toLowerCase()).toBe('luke');
  });

  it('renders empty name cell if name is empty', () => {
    const { getByTestId } = render(
      <Card {...baseProps} person={{ ...mockPerson, name: '' }} />
    );
    const row = getByTestId('person-row');
    const firstCell = row.querySelector('div');
    expect(firstCell).toBeInTheDocument();
    expect(firstCell?.textContent).toBe('');
  });
});
