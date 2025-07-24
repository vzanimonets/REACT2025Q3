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
    const { getByText, getAllByText } = render(<Card {...baseProps} />);
    expect(getByText('Luke Skywalker')).toBeInTheDocument();
    expect(getByText('172')).toBeInTheDocument();
    expect(getByText('77')).toBeInTheDocument();
    expect(getByText('blond')).toBeInTheDocument();
    expect(getByText('fair')).toBeInTheDocument();
    expect(getByText('blue')).toBeInTheDocument();
    expect(getByText('19BBY')).toBeInTheDocument();
    expect(getByText('male')).toBeInTheDocument();
    expect(getAllByText('0').length).toBe(2);
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
