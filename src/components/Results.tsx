import type { SwapiPerson } from '../swapi';
import ResultsBody from './ResultsBody';
import ResultsHeader from './ResultsHearder';

interface ResultsProps {
  people: SwapiPerson[];
  loading?: boolean;
  error?: string | { text: string; errorCode: number };
}

function Results({ people, loading, error }: ResultsProps) {
  return (
    <div className="w-full h-[50vh] min-h-[50vh]">
      <ResultsHeader />
      <ResultsBody people={people} loading={loading} error={error} />
    </div>
  );
}

export default Results;
