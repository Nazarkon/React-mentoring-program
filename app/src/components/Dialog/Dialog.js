import React from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './Dialog.scss';

const Dialog = ({ title, children, handleClose }) => {
  return (
    <Portal>
      <div className="dialog-container">
        <FontAwesomeIcon
          onClick={handleClose}
          className="dialog-close-icon"
          data-testid="close-icon"
          icon={faTimes}
          style={{ color: 'white' }}
        />
        <div className="dialog-container-main">
          <div className="dialog-title">{title}</div>
          <div className="dialog-custom">{children}</div>
        </div>
      </div>
    </Portal>
  );
};

Dialog.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default Dialog;
