import type { SwapiPerson } from '../api/swapi';

interface CardProps {
  person: SwapiPerson;
}

function Card({ person }: CardProps) {
  return (
    <div className="grid grid-cols-10 border-b border-gray-100 items-center py-2 hover:bg-gray-50 transition-colors text-xs md:text-base">
      <div className="truncate">{person.name}</div>
      <div className="truncate">{person.height}</div>
      <div className="truncate">{person.mass}</div>
      <div className="truncate">{person.hair_color}</div>
      <div className="truncate">{person.skin_color}</div>
      <div className="truncate">{person.eye_color}</div>
      <div className="truncate">{person.birth_year}</div>
      <div className="truncate">{person.gender}</div>
      <div className="truncate">{person.films.length}</div>
      <div className="truncate">
        {person.vehicles.length + person.starships.length}
      </div>
    </div>
  );
}

export default Card;
