
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Alert, Box, Typography } from "@mui/material";
import { getCustomers } from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCustomers()
      .then(setCustomers)
      .catch(() => setError("Could not load customers."))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { field: "firstname", headerName: "First Name", flex: 1 },
    { field: "lastname", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "streetaddress", headerName: "Address", flex: 1.5 },
    { field: "postcode", headerName: "Postcode", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
  ];

  const rows = customers.map((customer) => ({
    ...customer,
    id: customer._links.self.href.split("/").pop(),
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Customers
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

export default Customers;
