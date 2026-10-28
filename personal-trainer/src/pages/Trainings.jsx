
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Alert, Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { getTrainings } from "../services/api";

function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getTrainings()
      .then(setTrainings)
      .catch(() => setError("Could not load trainings."))
      .finally(() => setLoading(false));
  }, []);

  const rows = trainings.map((training) => ({
    ...training,
    date: new Date(training.date),
    customerName: training.customer
      ? `${training.customer.firstname} ${training.customer.lastname}`
      : "Unknown",
  }));

  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1.5,
      type: "dateTime",
      valueFormatter: (value) =>
        value ? dayjs(value).format("DD.MM.YYYY HH:mm") : "",
    },
    {
      field: "duration",
      headerName: "Duration (min)",
      flex: 1,
      type: "number",
    },
    {
      field: "activity",
      headerName: "Activity",
      flex: 1.5,
    },
    {
      field: "customerName",
      headerName: "Customer",
      flex: 1.5,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Trainings
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        showToolbar
        slots={{ toolbar: GridToolbar }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        sx={{ minHeight: 450 }}
      />
    </Box>
  );
}

export default Trainings;
