import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./assets/css/reset.css";
import "./assets/css/style.css";

let vh = window.innerHeight * 0.01;
const rootEl = document.getElementById("root") as HTMLElement;
rootEl.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});


const root = ReactDOM.createRoot(rootEl);
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
