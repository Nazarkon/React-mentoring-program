/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import './SearchInput.scss';

import { useLocation, Outlet } from 'react-router-dom';

function SearchInput(props) {
  const { defaultValue, onSearch } = props;

  const location = useLocation();

  const parseQuery = (string) => {
    const queryString = location.search;

    const params = new URLSearchParams(queryString);

    const sortBy = params.get('sortBy');

    const genre = params.get('genre');

    const searchParamsFromUrl = {
      genre,
      sortBy,
      searchString: string,
    };

    return searchParamsFromUrl;
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    onSearch(parseQuery(data.search));
  };

  const element = (
    <>
      <Outlet />
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
    </>
  );
  return element;
}

SearchInput.propTypes = {
  defaultValue: PropTypes.string,
  onSearch: PropTypes.func,
};

export default SearchInput;
