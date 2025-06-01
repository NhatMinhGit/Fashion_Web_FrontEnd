import React, { useState } from "react";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => setIsOpen(!isOpen);

  return (
    <div className="popup-container" style={{ position: "relative" }}>
      <button className="popup-button" id="mainPopupBtn" onClick={togglePopup}>
        ☰
      </button>
      {isOpen && (
        <div
          className="popup-links"
          id="popupLinks"
          style={{
            position: "absolute",
            top: "40px",
            left: 0,
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            borderRadius: "4px",
            padding: "5px",
            zIndex: 1000,
            display: "flex",
            gap: "10px",
          }}
        >
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="popup-link facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://zalo.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="popup-link zalo"
          >
            <i className="fas fa-comment-dots"></i>
          </a>
        </div>
      )}
    </div>
  );
};

export default Popup;
