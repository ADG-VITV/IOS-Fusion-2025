import React from "react";

interface GlassPopupProps {
  message: string;
  onClose: () => void;
}

const GlassPopup: React.FC<GlassPopupProps> = ({ message, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        width: "400px",
        minHeight: "180px",
        padding: "28px 24px 28px",
        borderRadius: "16px",
        background: "#1E1E1E", // dark glassy
        boxShadow: "0 8px 32px 0 rgba(20, 24, 40, 0.5)",
        border: "1px solid rgba(255,255,255,0.13)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Finder window dots */}
      <div style={{
        display: "flex",
        gap: "8px",
        position: "absolute",
        top: "16px",
        left: "24px"
      }}>
        <div style={{
          width: "13px",
          height: "13px",
          borderRadius: "50%",
          background: "#fc5f56",
          boxShadow: "0 0 3px #fc5f56"
        }} />
        <div style={{
          width: "13px",
          height: "13px",
          borderRadius: "50%",
          background: "#fdbc2c",
          boxShadow: "0 0 3px #fdbc2c"
        }} />
        <div style={{
          width: "13px",
          height: "13px",
          borderRadius: "50%",
          background: "#33c948",
          boxShadow: "0 0 3px #33c948"
        }} />
      </div>
      {/* Popup message */}
      <span
        style={{
          color: "#fff",
          fontSize: "19px",
          textAlign: "center",
          fontWeight: 500,
          marginTop: "44px",
          marginBottom: "20px",
        }}
      >
        {message}
      </span>
      {/* OK button */}
      <button
        onClick={onClose}
        style={{
          width: "80px",
          padding: "8px 0",
          borderRadius: "30px",
          background: "#2563eb",
          color: "#fbeee7", // moka-like pale beige
          fontWeight: 600,
          fontSize: "17px",
          border: "none",
          outline: "none",
          marginTop: "12px",
          boxShadow: "0 1px 5px rgba(31,38,135,0.09)",
          cursor: "pointer",
          letterSpacing: "0.02em",
        }}
      >
        OK
      </button>
    </div>
  );
};

export default GlassPopup;

