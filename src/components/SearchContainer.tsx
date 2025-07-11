import { Component } from 'react';
import Search from './Search';
import { debounce } from '../utils/debounce';

interface SearchContainerProps {
  value: string;
  onChange: (value: string) => void;
}

class SearchContainer extends Component<SearchContainerProps> {
  debouncedOnChange = debounce((value: unknown) => {
    this.props.onChange(value as string);
  }, 100);

  handleInputChange = (value: string) => {
    this.debouncedOnChange(value);
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
