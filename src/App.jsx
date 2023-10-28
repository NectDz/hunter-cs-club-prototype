import { useState } from "react";
import hunterLogo from "./assets/HunterCS-Logo.png";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <a target="_blank">
          <img src={hunterLogo} className="logo hunter" />
        </a>
      </div>
      <h1>Hunter CS Club</h1>
    </>
  );
}

export default App;
