import type { SwapiPerson } from '../api/swapi';
import TableCell from './TableCell';

interface CardProps {
  person: SwapiPerson;
  searchTerm?: string;
  highlight?: boolean;
}

function highlightText(text: string, highlight: string | undefined) {
  if (!highlight) return text;
  const regex = new RegExp(
    `(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'ig'
  );
  return text.split(regex).map((part, i) => {
    const isMatch = highlight.toLowerCase() === part.toLowerCase();
    return isMatch ? (
      <mark key={i} className="bg-yellow-200 text-black px-0.5 rounded">
        {part}
      </mark>
    ) : (
      part
    );
  });
}

function Card({ person, searchTerm, highlight }: CardProps) {
  return (
    <div
      data-testid="person-row"
      className="grid grid-cols-10 border-b border-gray-200 dark:border-gray-700 items-center py-3 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-sm md:text-base"
    >
      <TableCell>
        {highlight ? highlightText(person.name, searchTerm) : person.name}
      </TableCell>
      <TableCell>{person.height}</TableCell>
      <TableCell>{person.mass}</TableCell>
      <TableCell>{person.hair_color}</TableCell>
      <TableCell>{person.skin_color}</TableCell>
      <TableCell>{person.eye_color}</TableCell>
      <TableCell>{person.birth_year}</TableCell>
      <TableCell>{person.gender}</TableCell>
      <TableCell>{person.films.length}</TableCell>
      <TableCell>{person.vehicles.length + person.starships.length}</TableCell>
    </div>
  );
}

export default Card;
