import React from "react";

const btnStyle = {
  backgroundColor: "#F08080",
  border: "none",
  position: "absolute",
  left: "0",
  bottom: "-200px",
  height: "100px",
  margin: "10px",
  cursor: "pointer",
};

const clearStorage = () => {
  localStorage.clear();
  window.location.reload();
  console.log("DEBUG: Local Storage cleared.");
};
const ClearStorageBtn = () => (
  <button style={btnStyle} onClick={clearStorage}>
    <strong>DEBUG:</strong>
    <br /> Clear local storage
  </button>
);

export default ClearStorageBtn;
