import React, { type FormEvent } from 'react';
import { Component, type CSSProperties } from 'react';

const styles = {
  form: {
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    borderRadius: '2em',
    boxShadow: '0 2px 6px 0 rgba(60,64,67,.15)',
    padding: '0.25em 1.25em',
    width: 'auto',
    maxWidth: '40rem',
    margin: '2rem auto',
    border: '1px solid #eee',
  } as CSSProperties,
  input: {
    flex: 1,
    fontSize: '1.25rem',
    padding: '0.75em 0',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    boxShadow: 'none',
  } as CSSProperties,
  iconButton: {
    background: 'none',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    padding: '0 0.5em',
    display: 'flex',
    alignItems: 'center',
    height: '2.5em',
  } as CSSProperties,
  iconButtonFocus: {
    outline: 'none',
    boxShadow: 'none',
  } as CSSProperties,
  icon: {
    width: '1.5em',
    height: '1.5em',
    color: '#5f6368',
    display: 'block',
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

  render() {
    return (
      <form style={styles.form} onSubmit={this.handleSubmit} role="search">
        <input
          type="text"
          placeholder="Search..."
          ref={this.inputRef}
          style={styles.input}
          aria-label="Search input"
        />
        <button
          type="submit"
          style={styles.iconButton}
          aria-label="Search"
          onFocus={(e) => {
            Object.assign(e.currentTarget.style, styles.iconButtonFocus);
          }}
          onBlur={(e) => {
            Object.assign(e.currentTarget.style, styles.iconButton);
          }}
        >
          <svg
            style={styles.icon}
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
