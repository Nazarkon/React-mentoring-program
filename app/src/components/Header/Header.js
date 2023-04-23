import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = ({ isMovieDetailsOpen, handleClose }) => {
  const [headerColor, setHeaderColor] = useState('');

  const listenScrollEvent = () => {
    window.scrollY > 10 ? setHeaderColor('#232323') : setHeaderColor('');
  };
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  });
  return (
    <header className="header-container" style={{ backgroundColor: headerColor }}>
      <p className="header-title">
        <strong className="header-title-first">netflix</strong>roulette
      </p>
      {isMovieDetailsOpen ? (
        <Link to="/">
          <FontAwesomeIcon
            className="header-icon"
            icon={faMagnifyingGlass}
            rotation={90}
            onClick={handleClose}
          />
        </Link>
      ) : (
        <button className="header-button">+ Add Movie</button>
      )}
    </header>
  );
};

Header.propTypes = {
  isMovieDetailsOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default Header;
