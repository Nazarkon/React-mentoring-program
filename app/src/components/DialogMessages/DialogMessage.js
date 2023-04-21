import React from 'react';
import PropTypes from 'prop-types';
import './DialogMessage.scss';

const DialogMessage = ({ message, buttonText, handleConfirm }) => {
  return (
    <div className="dialog-message-container">
      {message && <div className="dialog-message-text">{message}</div>}
      <button className="dialog-message-button" onClick={handleConfirm}>
        {buttonText}
      </button>
    </div>
  );
};

DialogMessage.propTypes = {
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  handleConfirm: PropTypes.func.isRequired
};

export default DialogMessage;
