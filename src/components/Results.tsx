import type { SwapiPerson } from '../swapi';
import ResultsBody from './ResultsBody';
import ResultsHeader from './ResultsHearder';

interface ErrorObject {
  text: string;
  errorCode?: number;
}

interface ResultsProps {
  people: SwapiPerson[];
  loading?: boolean;
  error?: ErrorObject | null;
}

function Results({ people, loading, error }: ResultsProps) {
  return (
    <div className="w-full h-[50vh] min-h-[50vh]">
      <ResultsHeader />
      <ResultsBody
        people={people}
        loading={loading}
        error={error ?? undefined}
      />
    </div>
  );
}

export default Results;
