import React from "react";
import ReactDOM from "react-dom";
import { AppContextProvider } from "./context/globalContext";
import { CartContextProvider } from "./context/cartContext";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
