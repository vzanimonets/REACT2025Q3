import TableCell from './TableCell';

const ResultsHeader = () => (
  <div className="grid grid-cols-10 font-bold border-b border-gray-200 py-3 bg-gray-50 text-sm md:text-base sticky top-0 z-10">
    <TableCell isHeader>Name</TableCell>
    <TableCell isHeader>Height</TableCell>
    <TableCell isHeader>Mass</TableCell>
    <TableCell isHeader>Hair Color</TableCell>
    <TableCell isHeader>Skin Color</TableCell>
    <TableCell isHeader>Eye Color</TableCell>
    <TableCell isHeader>Birth Year</TableCell>
    <TableCell isHeader>Gender</TableCell>
    <TableCell isHeader>Films</TableCell>
    <TableCell isHeader>Vehicles+Starships</TableCell>
  </div>
);

export default ResultsHeader;
