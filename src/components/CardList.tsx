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
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          fontWeight: 'bold',
          borderBottom: '1px solid #ddd',
          padding: '8px 0',
        }}
      >
        <div style={{ flex: 2, paddingLeft: 8 }}>Name</div>
        <div style={{ flex: 3 }}>Description</div>
      </div>
      {people.map((person) => (
        <Card key={person.url} person={person} />
      ))}
    </div>
  );
}

export default CardList;
