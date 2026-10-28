
import { AppBar, Toolbar, Button, Typography } from "@mui/material";

function Navbar({ currentPage, setCurrentPage }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Personal Trainer
        </Typography>

        <Button
          color="inherit"
          variant={currentPage === "customers" ? "outlined" : "text"}
          onClick={() => setCurrentPage("customers")}
        >
          Customers
        </Button>

        <Button
          color="inherit"
          variant={currentPage === "trainings" ? "outlined" : "text"}
          onClick={() => setCurrentPage("trainings")}
        >
          Trainings
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
