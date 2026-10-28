import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
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
  Add,
  CalendarMonthOutlined,
  DeleteOutlined,
  EditOutlined,
  PeopleAltOutlined,
  SearchOutlined,
} from "@mui/icons-material";

import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  addTraining,
} from "../services/api";

import CustomerDialog from "../components/CustomerDialog";
import TrainingDialog from "../components/TrainingDialog";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [customerDialog, setCustomerDialog] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [trainingCustomer, setTrainingCustomer] = useState(null);
  const [deletingCustomer, setDeletingCustomer] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const data = await getCustomers();
      setCustomers(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const rows = useMemo(
    () =>
      customers.map((customer) => ({
        ...customer,
        id: customer._links.self.href.split("/").pop(),
      })),
    [customers],
  );

  const filteredRows = useMemo(() => {
    const query = search.toLowerCase().trim();

    return rows.filter((customer) =>
      [
        customer.firstname,
        customer.lastname,
        customer.email,
        customer.phone,
        customer.streetaddress,
        customer.postcode,
        customer.city,
      ].some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(query),
      ),
    );
  }, [rows, search]);

  const handleSaveCustomer = async (form) => {
    if (editingCustomer) {
      await updateCustomer(editingCustomer.id, form);
      setNotice("Customer updated successfully.");
    } else {
      await addCustomer(form);
      setNotice("Customer added successfully.");
    }
    await loadCustomers();
  };

  const handleDeleteCustomer = async () => {
    if (!deletingCustomer) return;
    setDeleting(true);
    try {
      await deleteCustomer(deletingCustomer.id);
      setNotice("Customer deleted successfully.");
      setDeletingCustomer(null);
      await loadCustomers();
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleAddTraining = async (training) => {
    const customerUrl = trainingCustomer._links.self.href;
    await addTraining(training, customerUrl);
    setNotice("Training added successfully.");
    setTrainingCustomer(null);
  };

  const columns = [
    { field: "firstname", headerName: "First Name", flex: 1, minWidth: 120 },
    { field: "lastname", headerName: "Last Name", flex: 1, minWidth: 120 },
    { field: "email", headerName: "Email Address", flex: 1.6, minWidth: 200 },
    { field: "phone", headerName: "Phone", flex: 1, minWidth: 140 },
    {
      field: "streetaddress",
      headerName: "Street Address",
      flex: 1.4,
      minWidth: 160,
    },
    { field: "postcode", headerName: "Postcode", flex: 0.8, minWidth: 100 },
    { field: "city", headerName: "City", flex: 1, minWidth: 120 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 160,
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Edit customer">
            <IconButton
              color="primary"
              size="small"
              onClick={() => {
                setEditingCustomer(params.row);
                setCustomerDialog(true);
              }}
            >
              <EditOutlined fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Add training">
            <IconButton
              color="primary"
              size="small"
              onClick={() => setTrainingCustomer(params.row)}
            >
              <CalendarMonthOutlined fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete customer">
            <IconButton
              color="error"
              size="small"
              onClick={() => setDeletingCustomer(params.row)}
            >
              <DeleteOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Box className="page-container">
      <Box className="page-heading">
        <Typography className="eyebrow">MEMBER DIRECTORY</Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <Box>
            <Typography variant="h4">Your Customers</Typography>
            <Typography color="text.secondary">
              Get to know the people behind every workout.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              setEditingCustomer(null);
              setCustomerDialog(true);
            }}
          >
            Add Customer
          </Button>
        </Stack>
      </Box>

      <Box className="stats-row">
        <Paper className="stat-card" elevation={0}>
          <Box className="stat-icon">
            <PeopleAltOutlined />
          </Box>
          <Box>
            <Typography className="stat-label">TOTAL CUSTOMERS</Typography>
            <Typography className="stat-value">
              {loading ? "..." : error ? "—" : customers.length}
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
            <Typography variant="h6">Customer Directory</Typography>
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
          sx={{ border: 0, minHeight: 460 }}
        />
      </Paper>

      <CustomerDialog
        open={customerDialog}
        customer={editingCustomer}
        onClose={() => setCustomerDialog(false)}
        onSave={handleSaveCustomer}
      />

      <TrainingDialog
        open={Boolean(trainingCustomer)}
        customer={trainingCustomer}
        onClose={() => setTrainingCustomer(null)}
        onSave={handleAddTraining}
      />

      <Dialog
        open={Boolean(deletingCustomer)}
        onClose={deleting ? undefined : () => setDeletingCustomer(null)}
      >
        <DialogTitle>Delete Customer?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {deletingCustomer?.firstname}{" "}
            {deletingCustomer?.lastname}? This will also delete all of their
            training sessions. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={deleting} onClick={() => setDeletingCustomer(null)}>
            No, Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            disabled={deleting}
            onClick={handleDeleteCustomer}
          >
            {deleting ? "Deleting..." : "Yes, Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Customers;
