import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import {
  CalendarMonthOutlined,
  DeleteOutlined,
  SearchOutlined,
  TimerOutlined,
} from "@mui/icons-material";

import dayjs from "dayjs";
import { getTrainings, deleteTraining } from "../services/api";

function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [deletingTraining, setDeletingTraining] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadTrainings = async () => {
    setLoading(true);
    try {
      const data = await getTrainings();
      setTrainings(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrainings();
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
    [trainings],
  );

  const filteredRows = useMemo(() => {
    const query = search.toLowerCase().trim();

    return rows.filter((training) =>
      [
        training.activity,
        training.duration,
        training.customerName,
        training.date && dayjs(training.date).isValid()
          ? dayjs(training.date).format("DD.MM.YYYY HH:mm")
          : "",
      ].some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(query),
      ),
    );
  }, [rows, search]);

  const totalMinutes = rows.reduce(
    (sum, training) => sum + Number(training.duration || 0),
    0,
  );

  const handleDelete = async () => {
    if (!deletingTraining) return;

    setDeleting(true);

    try {
      await deleteTraining(deletingTraining.id);
      setNotice("Training deleted successfully.");
      setDeletingTraining(null);
      await loadTrainings();
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      field: "date",
      headerName: "Date & Time",
      type: "dateTime",
      flex: 1.5,
      minWidth: 190,
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
      type: "number",
      flex: 1,
      minWidth: 140,
    },
    {
      field: "customerName",
      headerName: "Customer",
      flex: 1.5,
      minWidth: 180,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 110,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Tooltip title="Delete training">
          <IconButton
            size="small"
            color="error"
            onClick={() => setDeletingTraining(params.row)}
          >
            <DeleteOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Box className="page-container">
      <Box className="page-heading">
        <Typography className="eyebrow">TRAINING OVERVIEW</Typography>
        <Typography variant="h4">Training Sessions</Typography>
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
            <Typography className="stat-label">TOTAL SESSIONS</Typography>
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
            <Typography className="stat-label">TRAINING HOURS</Typography>
            <Typography className="stat-value">
              {loading ? "..." : error ? "—" : (totalMinutes / 60).toFixed(1)}
            </Typography>
          </Box>
        </Paper>
      </Box>

      {notice && (
        <Alert severity="success" onClose={() => setNotice("")} sx={{ mb: 2 }}>
          {notice}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper className="table-card" elevation={0}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          spacing={2}
          className="table-heading"
        >
          <Box>
            <Typography variant="h6">Session History</Typography>
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
            sorting: {
              sortModel: [{ field: "date", sort: "desc" }],
            },
          }}
          sx={{ border: 0, minHeight: 460 }}
        />
      </Paper>

      <Dialog
        open={Boolean(deletingTraining)}
        onClose={deleting ? undefined : () => setDeletingTraining(null)}
      >
        <DialogTitle>Delete Training?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the {deletingTraining?.activity}{" "}
            session for {deletingTraining?.customerName}? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button disabled={deleting} onClick={() => setDeletingTraining(null)}>
            No, Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            disabled={deleting}
            onClick={handleDelete}
          >
            {deleting ? "Deleting..." : "Yes, Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Trainings;
