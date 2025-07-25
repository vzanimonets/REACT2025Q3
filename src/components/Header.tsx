import TableCell from './TableCell';

const Header = () => (
  <div className="grid grid-cols-10 font-bold border-b border-gray-200 dark:border-gray-700 py-3 bg-gray-50 dark:bg-gray-800 text-sm md:text-base sticky top-0 z-10 text-black dark:text-white">
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

export default Header;
