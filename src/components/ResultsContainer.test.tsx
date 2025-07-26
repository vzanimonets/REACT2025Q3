import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import ResultsContainer from './ResultsContainer';
import * as swapi from '../api/swapi';

jest.mock('../api/swapi');
const mockFetchPeople = swapi.fetchPeople as jest.Mock;

import mockPerson from '../mocks/MockPerson';

describe('ResultsContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('calls fetchPeople on mount with searchTerm', async () => {
    mockFetchPeople.mockResolvedValueOnce({
      results: [{ ...mockPerson, name: 'Luke', url: '1' }],
    });
    await act(async () => {
      render(
        <ResultsContainer
          searchTerm="Luke"
          artificialError={null}
          highlight={false}
        />
      );
    });
    await waitFor(() => {
      expect(mockFetchPeople).toHaveBeenCalledWith({ search: 'Luke' });
      expect(screen.getByText('Luke')).toBeInTheDocument();
    });
  });

  it('calls fetchPeople again when searchTerm changes', async () => {
    mockFetchPeople.mockResolvedValue({
      results: [{ ...mockPerson, name: 'Leia', url: '2' }],
    });
    let rerender: (ui: React.ReactElement) => void;
    await act(async () => {
      const renderResult = render(
        <ResultsContainer
          searchTerm="Luke"
          artificialError={null}
          highlight={false}
        />
      );
      rerender = renderResult.rerender;
    });
    await waitFor(() => {
      expect(mockFetchPeople).toHaveBeenCalledWith({ search: 'Luke' });
    });
    await act(async () => {
      rerender(
        <ResultsContainer
          searchTerm="Leia"
          artificialError={null}
          highlight={false}
        />
      );
    });
    await waitFor(() => {
      expect(mockFetchPeople).toHaveBeenCalledWith({ search: 'Leia' });
    });
    await waitFor(() => {
      expect(screen.getByText('Leia')).toBeInTheDocument();
    });
  });

  it('shows loading state while fetching', async () => {
    let resolvePromise: ((value: unknown) => void) | undefined;
    mockFetchPeople.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolvePromise = resolve;
        })
    );
    await act(async () => {
      render(
        <ResultsContainer
          searchTerm="Luke"
          artificialError={null}
          highlight={false}
        />
      );
      if (resolvePromise) resolvePromise({ results: [] });
    });
    await waitFor(() => {
      expect(screen.getAllByTestId('skeleton-row').length).toBeGreaterThan(0);
    });
  });

  it('shows error when fetchPeople rejects', async () => {
    mockFetchPeople.mockRejectedValueOnce(new Error('API error'));
    await act(async () => {
      render(
        <ResultsContainer
          searchTerm="fail"
          artificialError={null}
          highlight={false}
        />
      );
    });
    await waitFor(() => {
      expect(screen.getByText(/api error/i)).toBeInTheDocument();
    });
  });

  it('throws artificialError if provided', () => {
    const error = new Error('Artificial!');
    expect(() => {
      render(
        <ResultsContainer
          searchTerm=""
          artificialError={error}
          highlight={false}
        />
      );
    }).toThrow('Artificial!');
  });
});
