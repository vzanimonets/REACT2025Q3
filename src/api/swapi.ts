export interface SwapiPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface SwapiPeopleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SwapiPerson[];
}

const BASE_URL = 'https://swapi.py4e.com/api/people/';

export async function fetchPeople({
  search = '',
  page = 1,
}: {
  search?: string;
  page?: number;
}): Promise<SwapiPeopleResponse> {
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
