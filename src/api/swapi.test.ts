import { fetchPeople } from './swapi';

const mockFetch = jest.fn();
global.fetch = mockFetch as jest.Mock;

describe('fetchPeople', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls correct URL with search and page', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [{ name: 'Luke' }] }),
      status: 200,
      statusText: 'OK',
    });
    const data = await fetchPeople({ search: 'Luke', page: 2 });
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('search=Luke')
    );
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('page=2'));
    expect(data).toEqual({ results: [{ name: 'Luke' }] });
  });

  it('trims search param', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
      status: 200,
      statusText: 'OK',
    });
    await fetchPeople({ search: '  Leia  ' });
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('search=Leia')
    );
  });

  it('does not add search param if empty', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
      status: 200,
      statusText: 'OK',
    });
    await fetchPeople({ search: '   ' });
    expect(mockFetch).not.toHaveBeenCalledWith(
      expect.stringContaining('search=')
    );
  });

  it('throws on non-ok response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });
    await expect(fetchPeople({ search: 'fail' })).rejects.toThrow(
      /SWAPI request failed: 500/
    );
  });

  it('throws on network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    await expect(fetchPeople({ search: 'fail' })).rejects.toThrow(
      'Network error'
    );
  });
});
