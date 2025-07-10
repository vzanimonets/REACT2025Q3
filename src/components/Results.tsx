import type { SwapiPerson } from '../swapi';
import ResultsBody from './ResultsBody';
import ResultsHeader from './ResultsHearder';

interface ResultsProps {
  people: SwapiPerson[];
  loading?: boolean;
  error?: string;
}

function Results({ people, loading, error }: ResultsProps) {
  return (
    <div className="w-full h-[24em] min-h-[24em]">
      <ResultsHeader />
      <ResultsBody people={people} loading={loading} error={error} />
    </div>
  );
}

export default Results;
