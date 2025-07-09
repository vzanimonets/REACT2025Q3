import type { SwapiPerson } from '../swapi';
import Card from './Card';

interface CardListProps {
  people: SwapiPerson[];
}

function CardList({ people }: CardListProps) {
  if (!people.length) {
    return <div>No results found.</div>;
  }
  return (
    <>
      <div className="grid grid-cols-5 font-bold border-b border-gray-300 py-2 bg-gray-50">
        <div className="col-span-2 pl-2">Name</div>
        <div className="col-span-3">Description</div>
      </div>
      <div className="w-full h-80 overflow-y-auto">
        {people.map((person) => (
          <Card key={person.url} person={person} />
        ))}
      </div>
    </>
  );
}

export default CardList;
