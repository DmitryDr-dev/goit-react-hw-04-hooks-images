// package import
import { useState } from 'react';
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';

// styles import
import './Searchbar.css';

export function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  // DONE function to track changes on input
  const handleInputChange = e => {
    setQuery(e.target.value);
  };

  // DONE function to submit form
  const handleFormSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      return toast.error('Please enter the search query!');
    }

    onSubmit(query);

    setQuery('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleFormSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
