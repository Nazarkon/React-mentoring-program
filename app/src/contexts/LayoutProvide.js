import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LayoutContext from './LayoutContext';

const LayoutProvider = ({ children }) => {
  const [isMovieDetailsAvailable, setMovieDetailsState] = useState(false);
  const updateValue = (newValue) => setMovieDetailsState(newValue);
  return (
    <LayoutContext.Provider value={{ isMovieDetailsAvailable, updateValue }}>
      {children}
    </LayoutContext.Provider>
  );
};

LayoutProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default LayoutProvider;
