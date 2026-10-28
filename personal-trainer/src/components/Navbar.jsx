
import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import {
  FitnessCenter,
  PeopleAltOutlined,
  CalendarMonthOutlined,
  Circle,
} from "@mui/icons-material";

function Navbar({ currentPage, setCurrentPage }) {
  return (
    <Box component="header" className="studio-header">
      <Box className="brand-section">
        <Box className="brand-icon">
          <FitnessCenter />
        </Box>

        <Box>
          <Typography className="brand-title">
            PASILAN STUDIO
          </Typography>
          <Typography className="brand-subtitle">
            TRAINING MANAGEMENT
          </Typography>
        </Box>
      </Box>

      <Stack direction="row" spacing={1} className="nav-links">
        <Button
          className={`nav-button ${
            currentPage === "customers" ? "active" : ""
          }`}
          startIcon={<PeopleAltOutlined />}
          onClick={() => setCurrentPage("customers")}
        >
          Customers
        </Button>

        <Button
          className={`nav-button ${
            currentPage === "trainings" ? "active" : ""
          }`}
          startIcon={<CalendarMonthOutlined />}
          onClick={() => setCurrentPage("trainings")}
        >
          Trainings
        </Button>
      </Stack>

      <Chip
        className="live-badge"
        icon={<Circle sx={{ fontSize: "9px !important" }} />}
        label="Live Database"
        size="small"
      />
    </Box>
  );
}

export default Navbar;
