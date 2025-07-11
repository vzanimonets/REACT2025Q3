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
      <div className="w-full overflow-x-auto sm:overflow-x-visible">
        <div className="min-w-max">
          <ResultsHeader />
          <ResultsBody
            people={people}
            loading={loading}
            error={error ?? undefined}
          />
        </div>
      </div>
    </div>
  );
}

export default Results;
