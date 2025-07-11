import type { SwapiPerson } from '../api/swapi';

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
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-200 text-black px-0.5 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function Card({ person, searchTerm, highlight }: CardProps) {
  return (
    <div className="grid grid-cols-10 border-b border-gray-200 items-center py-3 hover:bg-gray-200 transition-colors text-sm md:text-base">
      <div className="truncate pl-4 text-left">
        {highlight ? highlightText(person.name, searchTerm) : person.name}
      </div>
      <div className="truncate pl-4 text-left">{person.height}</div>
      <div className="truncate pl-4 text-left">{person.mass}</div>
      <div className="truncate pl-4 text-left">{person.hair_color}</div>
      <div className="truncate pl-4 text-left">{person.skin_color}</div>
      <div className="truncate pl-4 text-left">{person.eye_color}</div>
      <div className="truncate pl-4 text-left">{person.birth_year}</div>
      <div className="truncate pl-4 text-left">{person.gender}</div>
      <div className="truncate pl-4 text-left">{person.films.length}</div>
      <div className="truncate pl-4 text-left">
        {person.vehicles.length + person.starships.length}
      </div>
    </div>
  );
}

export default Card;
