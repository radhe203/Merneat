import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import Approutes from "./Approutes.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Approutes />
    </Provider>
  </React.StrictMode>
);
