import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./styles/index.css";

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("#root element not found for booting react app");

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);