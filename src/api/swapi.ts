import type { SwapiPerson, SwapiPeopleResponse } from '../types';

const BASE_URL = 'https://swapi.py4e.com/api/people/';

export async function fetchPeople({
  search = '',
  page = 1,
}: {
  search?: string;
  page?: number;
}) {
  const params = new URLSearchParams();
  if (search.trim()) params.append('search', search.trim());
  if (page > 1) params.append('page', String(page));
  const url = `${BASE_URL}?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `SWAPI request failed: ${response.status} ${response.statusText}`
    );
  }
  return response.json();
}

export type { SwapiPerson, SwapiPeopleResponse };
