import React, { type FormEvent } from 'react';
import { Component, type CSSProperties } from 'react';

const styles = {
  form: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    justifyContent: 'center',
    padding: '2rem 0',
  } as CSSProperties,
  input: {
    fontSize: '1.25rem',
    padding: '0.5em 1em',
    border: '1px solid #ccc',
    borderRadius: '0.5em',
    outline: 'none',
    transition: 'border-color 0.2s',
    width: '16.25rem', // 260px -> 16.25rem
  } as CSSProperties,
  inputFocus: {
    borderColor: '#007bff',
  } as CSSProperties,
  inputBlur: {
    borderColor: '#ccc',
  } as CSSProperties,
  button: {
    fontSize: '1.25rem',
    padding: '0.5em 2em',
    border: 'none',
    borderRadius: '0.5em',
    background: '#f7f7f7',
    cursor: 'pointer',
    fontWeight: 500,
    boxShadow: '0 0.125em 0.5em rgba(0,0,0,0.03)',
    transition: 'background 0.2s',
  } as CSSProperties,
  buttonHover: {
    background: '#e9ecef',
  } as CSSProperties,
};

class Search extends Component {
  private inputRef = React.createRef<HTMLInputElement>();

  componentDidMount() {
    const savedTerm = localStorage.getItem('searchTerm') || '';
    if (this.inputRef.current) {
      this.inputRef.current.value = savedTerm;
    }
  }

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = this.inputRef.current?.value.trim();
    if (query) {
      localStorage.setItem('searchTerm', query);
      console.log('Search query:', query);
    }
  };

  handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    Object.assign(e.currentTarget.style, styles.buttonHover);
  };

  handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    Object.assign(e.currentTarget.style, styles.button);
  };

  handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    Object.assign(e.currentTarget.style, styles.inputFocus);
  };

  handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    Object.assign(e.currentTarget.style, styles.inputBlur);
  };

  render() {
    return (
      <form style={styles.form} onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          ref={this.inputRef}
          style={styles.input}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          aria-label="Search input"
        />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          aria-label="Search button"
        >
          Search
        </button>
      </form>
    );
  }
}
export default Search;
