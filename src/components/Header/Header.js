/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useParams, useMatch, Link } from 'react-router-dom';
import './Header.scss';

function Header({ handleClose, handleClick }) {
  const [headerColor, setHeaderColor] = useState('');

  const params = useParams();

  const matchMovieDetails = useMatch(`/movie-details/${params.id}`);

  const listenScrollEvent = () => {
    window.scrollY > 10 ? setHeaderColor('#232323') : setHeaderColor('');
  };
  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  });
  return (
    <header
      className="header-container"
      style={{ backgroundColor: headerColor }}
    >
      <p className="header-title">
        <strong className="header-title-first">netflix</strong>
        roulette
      </p>
      {matchMovieDetails ? (
        <Link to="/">
          <FontAwesomeIcon
            className="header-icon"
            icon={faMagnifyingGlass}
            rotation={90}
            onClick={handleClose}
          />
        </Link>
      ) : (
        <button type="button" className="header-button" onClick={handleClick}>
          + Add Movie
        </button>
      )}
    </header>
  );
}

Header.propTypes = {
  handleClose: PropTypes.func,
  handleClick: PropTypes.func,
};

export default Header;
