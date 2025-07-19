import type { SwapiPerson } from '../api/swapi';
import type { ErrorObject } from '../types';
import ResultsBody from './ResultsBody';
import ResultsHeader from './ResultsHeader';

interface ResultsProps {
  people: SwapiPerson[];
  loading?: boolean;
  error?: ErrorObject | null;
  searchTerm?: string;
  highlight?: boolean;
}

function Results({
  people,
  loading,
  error,
  searchTerm,
  highlight,
}: ResultsProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px]">
        <div className="max-h-96 overflow-y-auto">
          <ResultsHeader />
          <ResultsBody
            people={people}
            loading={loading}
            error={error ?? undefined}
            searchTerm={searchTerm}
            highlight={highlight}
          />
        </div>
      </div>
    </div>
  );
}

export default Results;
