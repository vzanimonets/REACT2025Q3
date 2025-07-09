import type { SwapiPerson } from '../swapi';

interface CardProps {
  person: SwapiPerson;
}

function Card({ person }: CardProps) {
  return (
    <div
      style={{
        display: 'flex',
        borderBottom: '1px solid #f0f0f0',
        alignItems: 'center',
        padding: '8px 0',
      }}
    >
      <div style={{ flex: 2, paddingLeft: 8 }}>{person.name}</div>
      <div style={{ flex: 3 }}>
        Birth Year: {person.birth_year}, Gender: {person.gender}
      </div>
    </div>
  );
}

export default Card;
