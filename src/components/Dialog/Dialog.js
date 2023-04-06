import React, {useState} from "react";
import { Portal } from "react-portal";
import "@fontsource/montserrat";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import "./Dialog.scss"

const Dialog = ({title, body, handleClose, isOpen, buttons, message}) => {

  const buttonElements = buttons?.map((button, index) => (
    <button className="dialog-button" key={index} onClick={button.onClick}>
      {button.label}
    </button>
  ));

  return (
    <div>
      {isOpen && (
        <Portal>
          <div className="dialog-container">
              <FontAwesomeIcon onClick={handleClose} className="dialog-close-icon" icon={faTimes}  style={{ color: 'white' }} />
            <div className="dialog-container-main">
              <div className="dialog-title">{title}</div>
              {message && <div className="dialog-message">{message}</div>}
              {body && <div className="dialog-custom">{body}</div>}
              {buttonElements && <div className="dialog-buttons">{buttonElements}</div>}
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}

export default Dialog