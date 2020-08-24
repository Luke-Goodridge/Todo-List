import React from "react";

const btnStyle = {
    backgroundColor : "#F08080",
    border : "none",
    position : "absolute",
    left: "0",
    top : "0",
    height : "100px",
    margin : "10px",
    cursor : "pointer"
}

const clearStorage = () => {
    localStorage.clear();
    console.log("DEBUG: Local Storage cleared.");
}
const ClearStorageBtn = () => <button style={btnStyle} onClick={clearStorage}><strong>DEBUG:</strong><br/> Clear local storage</button>

export default ClearStorageBtn;