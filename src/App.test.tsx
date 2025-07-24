import '@testing-library/jest-dom';
import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import App from './App';

beforeEach(() => {
  jest.clearAllMocks();
  Storage.prototype.getItem = jest.fn();
  Storage.prototype.setItem = jest.fn();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => {
  (console.error as jest.Mock).mockRestore();
});

describe('App', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders main title and search input', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', {
        name: 'Star Wars Characters Search',
        level: 1,
      })
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders HighlightToggle and toggles highlight state', () => {
    render(<App />);
    const checkbox = screen.getByLabelText('Highlight search term');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
    act(() => {
      fireEvent.click(checkbox);
    });
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      'highlight',
      'false'
    );
  });

  it('calls setItem on search input change (debounced)', async () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    act(() => {
      fireEvent.change(input, { target: { value: 'Luke' } });
      jest.runAllTimers();
    });
    await waitFor(() => {
      expect(Storage.prototype.setItem).toHaveBeenCalledWith(
        'searchTerm',
        'Luke'
      );
    });
  });

  it('calls setItem on search (Enter key)', async () => {
    jest.useRealTimers();
    render(<App />);
    const input = screen.getByRole('textbox');
    act(() => {
      fireEvent.change(input, { target: { value: 'Leia ' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    });
    await waitFor(() => {
      expect(Storage.prototype.setItem).toHaveBeenCalledWith(
        'searchTerm',
        'Leia '
      );
    });
  });

  it('renders ErrorButton and triggers artificial error', async () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /throw error/i });
    await act(async () => {
      fireEvent.click(button);
    });
    await waitFor(() => {
      expect(screen.getByText(/test error/i)).toBeInTheDocument();
    });
  });

  it('renders ResultsContainer and ErrorBoundary', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});

describe('App localStorage integration', () => {
  it('reads searchTerm and highlight from localStorage on mount', () => {
    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementationOnce((key) => (key === 'searchTerm' ? 'Vader' : null))
      .mockImplementationOnce((key) => (key === 'highlight' ? 'false' : null));
    render(<App />);
    expect(Storage.prototype.getItem).toHaveBeenCalledWith('searchTerm');
    expect(Storage.prototype.getItem).toHaveBeenCalledWith('highlight');
    expect(screen.getByRole('textbox')).toHaveValue('Vader');
    expect(screen.getByLabelText('Highlight search term')).not.toBeChecked();
  });
});
