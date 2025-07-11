import { Component } from 'react';
import Search from './Search';

interface SearchContainerState {
  searchTerm: string;
}

class SearchContainer extends Component<object, SearchContainerState> {
  constructor(props: object) {
    super(props);
    const savedTerm = localStorage.getItem('searchTerm') || '';
    this.state = {
      searchTerm: savedTerm,
    };
  }

  handleInputChange = (value: string) => {
    this.setState({ searchTerm: value });
  };

  handleSearch = () => {
    const trimmed = this.state.searchTerm.trim();
    localStorage.setItem('searchTerm', trimmed);
    // Optionally, you can emit an event or call a callback here to notify parent
  };

  render() {
    return (
      <Search
        value={this.state.searchTerm}
        onChange={this.handleInputChange}
        onSearch={this.handleSearch}
      />
    );
  }
}

export default SearchContainer;
