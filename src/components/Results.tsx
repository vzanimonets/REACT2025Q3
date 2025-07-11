import type { SwapiPerson } from '../api/swapi';
import ResultsBody from './ResultsBody';
import ResultsHeader from './ResultsHeader';

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
    <div className="w-full h-full">
      <div className="w-full overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="max-h-124 overflow-y-auto">
            <ResultsHeader />
            <ResultsBody
              people={people}
              loading={loading}
              error={error ?? undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
