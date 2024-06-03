import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Countries from "./components/Countries";
import Country from "./components/Country";
import { REST_COUNTRIES_URL } from "./helpers/constants";
import { ColorModeContext, createCustomTheme } from "./helpers/context";
import Breadcrumbs from "./shared/Breadcrumbs";
import Header from "./shared/Header";
import useAxiosFetch from "./shared/useAxiosFetch";

function App() {
  const location = useLocation();
  const [header, setHeader] = useState("");
  const [mode, setMode] = useState("light");

  const { data, loading } = useAxiosFetch(
    REST_COUNTRIES_URL,
    {},
    0,
    false,
    true
  );

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [pathname]);



  useEffect(() => {
    if (location.pathname === "/") {
      setHeader(<Breadcrumbs crumbs={[{ path: "/", title: "Countries" }]} />);
    }
  }, [location]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={createCustomTheme(mode)}>
        <CssBaseline />
        <Box className="App">
          <Container
            maxWidth="lg"
            component="header"
            sx={{ py: 3, borderBottom: "1px solid #ccc" }}
          >
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item sx={{ display: "flex", alignItems: "center" }}>
                <FontAwesomeIcon icon={faGlobe} size="2x" className="mr-2" />
                <Typography variant="h5">World Info</Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={colorMode.toggleColorMode}>
                  {createCustomTheme(mode).palette.mode === "dark" ? (
                    <DarkModeIcon sx={{ color: "#fff" }} />
                  ) : (
                    <LightModeIcon sx={{ color: "#000" }} />
                  )}
                </IconButton>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="lg" sx={{ py: 3 }}>
            <Header title={header} />
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Routes>
                <Route
                  path="/"
                  element={<Countries data={data} loading={loading} />}
                />
                <Route
                  path="/:name"
                  element={<Country updateHeader={setHeader} />}
                />
              </Routes>
            )}
          </Container>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
