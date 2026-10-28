
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import {
  PeopleAltOutlined,
  SearchOutlined,
} from "@mui/icons-material";

import { getCustomers } from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCustomers()
      .then(setCustomers)
      .catch((err) => {
        console.error(err);
        setError("Could not load customers. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  const rows = useMemo(
    () =>
      customers.map((customer, index) => ({
        ...customer,
        id:
          customer._links?.self?.href?.split("/").pop() ??
          `customer-${index}`,
      })),
    [customers]
  );

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return rows.filter((customer) =>
      [
        customer.firstname,
        customer.lastname,
        customer.email,
        customer.phone,
        customer.streetaddress,
        customer.postcode,
        customer.city,
      ]
        .map((value) => String(value ?? ""))
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [rows, search]);

  const columns = [
    {
      field: "firstname",
      headerName: "First Name",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "lastname",
      headerName: "Last Name",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "email",
      headerName: "Email Address",
      flex: 1.7,
      minWidth: 210,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1.2,
      minWidth: 140,
    },
    {
      field: "streetaddress",
      headerName: "Street Address",
      flex: 1.5,
      minWidth: 170,
    },
    {
      field: "postcode",
      headerName: "Postcode",
      flex: 0.8,
      minWidth: 100,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
      minWidth: 120,
    },
  ];

  return (
    <Box className="page-container">
      <Box className="page-heading">
        <Typography className="eyebrow">
          MEMBER DIRECTORY
        </Typography>

        <Typography variant="h4">
          Your Customers
        </Typography>

        <Typography color="text.secondary">
          Get to know the people behind every workout.
        </Typography>
      </Box>

      <Box className="stats-row">
        <Paper className="stat-card" elevation={0}>
          <Box className="stat-icon">
            <PeopleAltOutlined />
          </Box>

          <Box>
            <Typography className="stat-label">
              TOTAL CUSTOMERS
            </Typography>

            <Typography className="stat-value">
              {loading ? "..." : error ? "—" : customers.length}
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
              Customer Directory
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {filteredRows.length} customers displayed
            </Typography>
          </Box>

          <TextField
            size="small"
            placeholder="Search customers..."
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

export default Customers;
