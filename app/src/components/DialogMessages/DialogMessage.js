import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import './DialogMessage.scss';

const DialogMessage = ({ message, buttonText, handleConfirm, isDelete, title }) => {
  return (
    <div className="dialog-message-container">
      {!isDelete ? (
        <div className="dialog-message-add-container">
          <FontAwesomeIcon
            icon={faCircleCheck}
            style={{ color: '#f65261', width: '30px', height: '30px' }}
          />
          <h3 className="dialog-message-add-container-title">{title}</h3>
          <p>{message && <div className="dialog-message-text">{message}</div>}</p>
        </div>
      ) : (
        <>
          {message && <div className="dialog-message-text">{message}</div>}
          <button className="dialog-message-button" onClick={handleConfirm}>
            {buttonText}
          </button>
        </>
      )}
    </div>
  );
};

DialogMessage.propTypes = {
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  isDelete: PropTypes.bool.isRequired
};

export default DialogMessage;
