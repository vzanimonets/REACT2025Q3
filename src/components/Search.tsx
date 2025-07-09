import React, { type FormEvent, Component } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

interface SearchState {
  hasValue: boolean;
}

class Search extends Component<SearchProps, SearchState> {
  private inputRef = React.createRef<HTMLInputElement>();

  constructor(props: SearchProps) {
    super(props);
    this.state = { hasValue: false };
  }

  componentDidMount() {
    const savedTerm = localStorage.getItem('searchTerm') || '';
    if (this.inputRef.current) {
      this.inputRef.current.value = savedTerm;
      this.setState({ hasValue: !!savedTerm });
    }
  }

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = this.inputRef.current?.value.trim() || '';
    localStorage.setItem('searchTerm', query);
    this.props.onSearch(query);
  };

  handleInput = () => {
    this.setState({ hasValue: !!this.inputRef.current?.value });
  };

  handleClear = () => {
    if (this.inputRef.current) {
      this.inputRef.current.value = '';
      this.inputRef.current.focus();
      this.setState({ hasValue: false });
    }
  };

  render() {
    return (
      <form
        className="flex items-center bg-white rounded-full shadow-md px-5 py-1 w-auto max-w-2xl mx-auto my-8 border border-gray-200"
        onSubmit={this.handleSubmit}
        role="search"
      >
        <input
          type="text"
          placeholder="Search by name..."
          ref={this.inputRef}
          className="flex-1 min-w-[300px] text-xl py-3 bg-transparent border-none outline-none shadow-none"
          aria-label="Search input"
          onInput={this.handleInput}
        />
        {this.state.hasValue && (
          <button
            type="button"
            className="bg-transparent border-none outline-none cursor-pointer px-2 flex items-center h-10 mr-1"
            aria-label="Clear search input"
            onClick={this.handleClear}
          >
            <svg
              className="w-5 h-5 text-gray-400 block"
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
          className="bg-transparent border-none outline-none cursor-pointer px-2 flex items-center h-10"
          aria-label="Search"
        >
          <svg
            className="w-6 h-6 text-gray-600 block"
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
}
export default Search;
