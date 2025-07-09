import type { SwapiPerson } from '../swapi';

interface CardProps {
  person: SwapiPerson;
}

function Card({ person }: CardProps) {
  return (
    <div className="grid grid-cols-5 border-b border-gray-100 items-center py-2 hover:bg-gray-50 transition-colors">
      <div className="col-span-2 pl-2">{person.name}</div>
      <div className="col-span-2">{person.birth_year}</div>
      <div className="col-span-1">{person.gender}</div>
    </div>
  );
}

export default Card;
