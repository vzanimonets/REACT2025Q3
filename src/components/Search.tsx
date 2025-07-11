import React, { type FormEvent } from 'react';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

function Search({ value, onChange, onSearch }: SearchProps) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch();
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <form
      className="flex items-center bg-white rounded-full shadow-md px-5 py-1 w-auto max-w-2xl mx-auto my-8 border border-gray-200"
      onSubmit={handleSubmit}
      role="search"
    >
      <label htmlFor="search-input" className="sr-only">
        Search
      </label>
      <input
        id="search-input"
        type="text"
        placeholder="Search by name or attribute..."
        value={value}
        onChange={handleInput}
        className="flex-1 min-w-[300px] text-xl py-3 bg-transparent border-none outline-none shadow-none focus:outline-none placeholder-gray-500"
        aria-label="Search input"
      />
      {value && (
        <button
          type="button"
          className="bg-transparent border-none outline-none cursor-pointer px-4 py-2 rounded-md shadow flex items-center h-10 mr-1 focus:outline-none hover:bg-gray-200 active:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Clear search input"
          onClick={handleClear}
          disabled={!value}
        >
          <svg
            className="w-5 h-5 text-gray-600 block"
            viewBox="0 0 24 24"
            focusable="false"
            aria-hidden="true"
          >
            <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z" />
          </svg>
        </button>
      )}
      <button
        type="submit"
        className="bg-transparent border-none outline-none cursor-pointer px-4 py-2 rounded-md shadow flex items-center h-10 focus:outline-none hover:bg-gray-200 active:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Search"
        disabled={false}
      >
        <svg
          className="w-5 h-5 text-gray-600 block"
          viewBox="0 0 24 24"
          focusable="false"
          aria-hidden="true"
        >
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
        </svg>
      </button>
    </form>
  );
}

export default Search;
