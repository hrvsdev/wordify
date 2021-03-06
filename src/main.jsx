import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import "./styles/home/index.scss";
import "./styles/home/left-side.scss";
import "./styles/home/middle-side.scss";
import "./styles/home/right-side.scss";
import "./styles/Auth.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
