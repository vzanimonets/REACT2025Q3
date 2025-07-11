import React from 'react';

const SkeletonRow: React.FC = () => (
  <div className="grid grid-cols-10 border-b border-gray-100 items-center py-3 animate-pulse">
    {Array.from({ length: 10 }).map((_, i) => (
      <div
        key={i}
        className="h-4 bg-gray-200 rounded pl-4 text-left mx-2"
        style={{ width: '80%' }}
      />
    ))}
  </div>
);

export default SkeletonRow;
