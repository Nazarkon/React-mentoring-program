import React from 'react';
import PropTypes from 'prop-types';
import './Layout.scss';

function Layout({ children }) {
  return <main className="wrapper">{children}</main>;
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
