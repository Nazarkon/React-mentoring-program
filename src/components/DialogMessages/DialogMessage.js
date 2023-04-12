import React from "react";
import "./DialogMessage.scss"

const DialogMessage = ({message, buttonText, handleConfirm}) => {
    return (
        <div className="dialog-message-container">
            {message && <div className="dialog-message-text">{message}</div>}
            <button className="dialog-message-button" onClick={handleConfirm}>{buttonText}</button>
        </div>
    )
}

export default DialogMessage