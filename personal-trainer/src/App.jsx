
import { useState } from "react";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Customers from "./pages/Customers";
import Trainings from "./pages/Trainings";

function App() {
  const [currentPage, setCurrentPage] = useState("customers");

  return (
    <>
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        {currentPage === "customers" ? (
          <Customers />
        ) : (
          <Trainings />
        )}
      </Container>
    </>
  );
}

export default App;
