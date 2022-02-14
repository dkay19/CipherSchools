import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "./context/context";
import { Provider1 } from "./context/context";
ReactDOM.render(
  <Provider>
    <Provider1>
      <App />
    </Provider1>
  </Provider>,
  document.getElementById("root")
);
