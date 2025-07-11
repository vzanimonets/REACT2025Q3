import React, { Component } from 'react';
import Search from './Search';

interface SearchContainerProps {
  value: string;
  onChange: (value: string) => void;
}

class SearchContainer extends Component<SearchContainerProps> {
  handleInputChange = (value: string) => {
    this.props.onChange(value);
  };

  handleSearch = () => {
    const trimmed = this.props.value.trim();
    localStorage.setItem('searchTerm', trimmed);
    this.props.onChange(trimmed);
  };

  render() {
    return (
      <Search
        value={this.props.value}
        onChange={this.handleInputChange}
        onSearch={this.handleSearch}
      />
    );
  }
}

export default SearchContainer;
