import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Store } from "./store/store.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={Store}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
  </BrowserRouter>
);
