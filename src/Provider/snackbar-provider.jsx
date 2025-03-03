import { createContext, useEffect, useMemo, useState } from "react";
import css from "./snackbar-provider.module.scss";

export const SnackbarContext = createContext();
const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "success",
    message: "",
  });

  useEffect(() => {
    if (snackbar?.open) {
      setTimeout(() => {
        setSnackbar((state) => ({ ...state, open: false }));
      }, 3000);
    }
  }, [snackbar]);

  const contextValue = useMemo(
    () => ({
      setSnackbar: (message, type = "success") => {
        if (message)
          setSnackbar((state) => ({ ...state, message, type, open: true }));
      },
    }),
    [setSnackbar]
  );

  return (
    <SnackbarContext.Provider value={contextValue}>
      <div
        className={`${css.snackbar} ${css[snackbar?.type]} ${
          snackbar?.open && css.snackbar_show
        }`}
      >
        <span>{snackbar?.message}</span>
      </div>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
