import type { SwapiPerson } from '../swapi';
import Card from './Card';
import Spinner from './Spinner';

interface CardListProps {
  people: SwapiPerson[];
  loading?: boolean;
}

function CardList({ people, loading }: CardListProps) {
  return (
    <>
      <div className="grid grid-cols-5 font-bold border-b border-gray-300 py-2 bg-gray-50">
        <div className="col-span-2 pl-2">Name</div>
        <div className="col-span-2">Birth Year</div>
        <div className="col-span-1">Gender</div>
      </div>
      <div className="w-full h-80 overflow-y-auto flex items-top justify-center">
        {loading ? (
          <Spinner />
        ) : people.length === 0 ? (
          <div className="w-full text-center py-8">No results found.</div>
        ) : (
          <div className="w-full">
            {people.map((person) => (
              <Card key={person.url} person={person} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default CardList;
