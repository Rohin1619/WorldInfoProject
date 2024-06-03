import { createTheme } from "@mui/material/styles";
import { createContext } from "react";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const createCustomTheme = (mode) => {
  return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#2196f3",
      },
      secondary: {
        main: "#f50057",
      },
    },
    typography: {
      fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
        marginBottom: "1rem",
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 600,
        marginBottom: "1rem",
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 600,
        marginBottom: "1rem",
      },
      h4: {
        fontSize: "1.2rem",
        fontWeight: 600,
        marginBottom: "0.5rem",
      },
      h5: {
        fontSize: "1rem",
        fontWeight: 600,
        marginBottom: "0.5rem",
      },
      body1: {
        fontSize: "1rem",
        marginBottom: "1rem",
      },
      body2: {
        fontSize: "0.875rem",
        marginBottom: "1rem",
      },
      button: {
        textTransform: "none",
      },
    },
    shape: {
      borderRadius: 8,
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: 8,
        },
      },
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
      defaultDark: "#121212",
      paperDark: "#1e1e1e",
    },
  });
};
