import type { SwapiPerson } from '../api/swapi';

interface CardProps {
  person: SwapiPerson;
}

function Card({ person }: CardProps) {
  return (
    <div className="grid grid-cols-10 border-b border-gray-100 items-center py-3 hover:bg-gray-200 transition-colors text-sm md:text-base">
      <div className="truncate pl-4 text-left">{person.name}</div>
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
