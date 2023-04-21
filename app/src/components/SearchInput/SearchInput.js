import React from 'react';
import PropTypes from 'prop-types';
import './SearchInput.scss';

const SearchInput = (props) => {
  const { defaultValue, onSearch } = props;

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    onSearch(data.search);
  };

  const element = (
    <form id="search-form" role="search" onSubmit={handleSubmitForm}>
      <label className="search-label">FIND YOUR MOViE</label>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          aria-label="search"
          name="search"
          defaultValue={defaultValue}
          placeholder="What do you want to watch?"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </div>
    </form>
  );
  return element;
};

SearchInput.propTypes = {
  defaultValue: PropTypes.string,
  onSearch: PropTypes.func.isRequired
};

export default SearchInput;
