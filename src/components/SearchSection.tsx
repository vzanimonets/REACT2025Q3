import React, { Component, type ChangeEvent } from 'react';

interface SearchSectionProps {
  initialValue: string;
  onSearch: (searchTerm: string) => void;
}

interface SearchSectionState {
  inputValue: string;
}

class SearchSection extends Component<SearchSectionProps, SearchSectionState> {
  constructor(props: SearchSectionProps) {
    super(props);
    this.state = {
      inputValue: props.initialValue || '',
    };
  }

  componentDidMount() {
    // If initialValue is not provided, try to get from localStorage
    if (!this.props.initialValue) {
      const saved = localStorage.getItem('searchTerm') || '';
      this.setState({ inputValue: saved });
    }
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearch = () => {
    const trimmed = this.state.inputValue.trim();
    localStorage.setItem('searchTerm', trimmed);
    this.props.onSearch(trimmed);
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  render() {
    return (
      <div className="flex flex-row gap-2 w-full max-w-xl">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 text-lg"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Search for a character..."
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={this.handleSearch}
        >
          Search
        </button>
      </div>
    );
  }
}

export default SearchSection;
