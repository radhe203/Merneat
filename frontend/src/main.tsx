import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import Approutes from "./Approutes.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Approutes />
      <Toaster visibleToasts={1} richColors position="bottom-right" duration={5000} closeButton/>
    </Provider>
  </React.StrictMode>
);
