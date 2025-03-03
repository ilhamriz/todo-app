import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import SnackbarProvider from "./Provider/snackbar-provider";

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
