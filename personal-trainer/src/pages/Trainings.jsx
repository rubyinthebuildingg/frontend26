
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Chip,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import {
  CalendarMonthOutlined,
  SearchOutlined,
  TimerOutlined,
} from "@mui/icons-material";

import dayjs from "dayjs";
import { getTrainings } from "../services/api";

function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getTrainings()
      .then(setTrainings)
      .catch((err) => {
        console.error(err);
        setError("Could not load trainings. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  const rows = useMemo(
    () =>
      trainings.map((training) => ({
        ...training,
        date: training.date ? new Date(training.date) : null,
        customerName: training.customer
          ? `${training.customer.firstname ?? ""} ${
              training.customer.lastname ?? ""
            }`.trim()
          : "Unknown",
      })),
    [trainings]
  );

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return rows.filter((training) =>
      [
        training.activity,
        training.duration,
        training.customerName,
        training.date && dayjs(training.date).isValid()
          ? dayjs(training.date).format("DD.MM.YYYY HH:mm")
          : "",
      ]
        .map((value) => String(value ?? ""))
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [rows, search]);

  const totalMinutes = rows.reduce(
    (total, training) => total + Number(training.duration || 0),
    0
  );

  const columns = [
    {
      field: "date",
      headerName: "Date & Time",
      flex: 1.5,
      minWidth: 190,
      type: "dateTime",
      valueFormatter: (value) =>
        value && dayjs(value).isValid()
          ? dayjs(value).format("DD.MM.YYYY HH:mm")
          : "",
    },
    {
      field: "activity",
      headerName: "Activity",
      flex: 1.3,
      minWidth: 150,
      renderCell: (params) => (
        <Chip
          label={params.value || "Unknown"}
          size="small"
          className="activity-chip"
        />
      ),
    },
    {
      field: "duration",
      headerName: "Duration (min)",
      flex: 1,
      minWidth: 140,
      type: "number",
    },
    {
      field: "customerName",
      headerName: "Customer",
      flex: 1.5,
      minWidth: 180,
    },
  ];

  return (
    <Box className="page-container">
      <Box className="page-heading">
        <Typography className="eyebrow">
          TRAINING OVERVIEW
        </Typography>

        <Typography variant="h4">
          Training Sessions
        </Typography>

        <Typography color="text.secondary">
          Every session counts. Track your studio's progress.
        </Typography>
      </Box>

      <Box className="stats-row">
        <Paper className="stat-card" elevation={0}>
          <Box className="stat-icon">
            <CalendarMonthOutlined />
          </Box>

          <Box>
            <Typography className="stat-label">
              TOTAL SESSIONS
            </Typography>

            <Typography className="stat-value">
              {loading ? "..." : error ? "—" : trainings.length}
            </Typography>
          </Box>
        </Paper>

        <Paper className="stat-card" elevation={0}>
          <Box className="stat-icon">
            <TimerOutlined />
          </Box>

          <Box>
            <Typography className="stat-label">
              TRAINING HOURS
            </Typography>

            <Typography className="stat-value">
              {loading ? "..." : error ? "—" : (totalMinutes / 60).toFixed(1)}
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Paper className="table-card" elevation={0}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          spacing={2}
          className="table-heading"
        >
          <Box>
            <Typography variant="h6">
              Session History
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {filteredRows.length} sessions displayed
            </Typography>
          </Box>

          <TextField
            size="small"
            placeholder="Search trainings..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="studio-search"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>

        {error && (
          <Alert severity="error" sx={{ m: 2 }}>
            {error}
          </Alert>
        )}

        <DataGrid
          rows={filteredRows}
          columns={columns}
          loading={loading}
          showToolbar
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          sx={{
            border: 0,
            minHeight: 460,
          }}
        />
      </Paper>
    </Box>
  );
}

export default Trainings;
