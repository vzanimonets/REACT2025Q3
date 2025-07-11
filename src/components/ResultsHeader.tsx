const ResultsHeader = () => (
  <div className="grid grid-cols-10 font-bold border-b border-gray-300 py-2 bg-gray-50 text-xs md:text-base">
    <div className="whitespace-nowrap truncate">Name</div>
    <div className="whitespace-nowrap truncate">Height</div>
    <div className="whitespace-nowrap truncate">Mass</div>
    <div className="whitespace-nowrap truncate">Hair Color</div>
    <div className="whitespace-nowrap truncate">Skin Color</div>
    <div className="whitespace-nowrap truncate">Eye Color</div>
    <div className="whitespace-nowrap truncate">Birth Year</div>
    <div className="whitespace-nowrap truncate">Gender</div>
    <div className="whitespace-nowrap truncate">Films</div>
    <div className="whitespace-nowrap truncate">Vehicles+Starships</div>
  </div>
);
export default ResultsHeader;
