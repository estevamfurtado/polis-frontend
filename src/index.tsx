import { ColorModeScript } from '@chakra-ui/react'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import theme from './theme';


import "./assets/css/reset.css";
import "./assets/css/style.css";

let vh = window.innerHeight * 0.01;
const rootEl = document.getElementById("root") as HTMLElement;
rootEl.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

console.log(theme.config.initialColorMode);

const root = ReactDOM.createRoot(rootEl);
root.render(
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </>
);
