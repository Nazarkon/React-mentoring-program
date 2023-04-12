import React, {useState} from "react";
import { Portal } from "react-portal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import "./Dialog.scss"

const Dialog = ({title, body, handleClose}) => {

  return (
        <Portal>
          <div className="dialog-container">
              <FontAwesomeIcon onClick={handleClose} className="dialog-close-icon" data-testid="close-icon" icon={faTimes}  style={{ color: 'white' }} />
            <div className="dialog-container-main">
              <div className="dialog-title">{title}</div>
              {body && <div className="dialog-custom">{body}</div>}
            </div>
          </div>
        </Portal>
  );
}

export default Dialog