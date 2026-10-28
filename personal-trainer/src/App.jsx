
import { useState } from "react";
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Navbar from "./components/Navbar";
import Customers from "./pages/Customers";
import Trainings from "./pages/Trainings";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8B5CF6",
      light: "#A78BFA",
    },
    background: {
      default: "#11121A",
      paper: "#1C1D29",
    },
    text: {
      primary: "#F4F4F8",
      secondary: "#A1A1B5",
    },
    divider: "#303041",
  },
  typography: {
    fontFamily: "'Inter', Arial, sans-serif",
    h4: {
      fontWeight: 750,
      letterSpacing: "-0.8px",
    },
    h6: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

function App() {
  const [currentPage, setCurrentPage] = useState("customers");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box className="app-layout">
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <Container maxWidth="xl" className="main-content">
          {currentPage === "customers" ? (
            <Customers />
          ) : (
            <Trainings />
          )}

          <Box component="footer" className="app-footer">
            © {new Date().getFullYear()} Pasilan Studio
            {" · "}Training Management
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
