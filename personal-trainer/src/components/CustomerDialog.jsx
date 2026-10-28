
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Alert,
} from "@mui/material";

const emptyCustomer = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  streetaddress: "",
  postcode: "",
  city: "",
};

const fields = [
  { name: "firstname", label: "First Name" },
  { name: "lastname", label: "Last Name" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone" },
  { name: "streetaddress", label: "Street Address" },
  { name: "postcode", label: "Postcode" },
  { name: "city", label: "City" },
];

function CustomerDialog({ open, onClose, onSave, customer }) {
  const [form, setForm] = useState(emptyCustomer);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(
        customer
          ? Object.fromEntries(
              Object.keys(emptyCustomer).map((key) => [
                key,
                customer[key] ?? "",
              ])
            )
          : { ...emptyCustomer }
      );
      setError("");
    }
  }, [customer, open]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={saving ? undefined : onClose}
      fullWidth maxWidth="sm">
      <DialogTitle>
        {customer ? "Edit Customer" : "Add New Customer"}
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            {fields.map((field) => (
              <Grid key={field.name} size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  size="small"
                  name={field.name}
                  label={field.label}
                  type={field.type || "text"}
                  value={form[field.name]}
                  onChange={handleChange}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} disabled={saving}>
            Cancel
          </Button>

          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? "Saving..." : customer ? "Save Changes" : "Add Customer"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CustomerDialog;
