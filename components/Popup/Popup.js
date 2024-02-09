import React from "react";

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-container">
      <button className="popup-close" onClick={onClose}>Close</button>
      <p>{message}</p>
    </div>
  );
}

export default Popup;



