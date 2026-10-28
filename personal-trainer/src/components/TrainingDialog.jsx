
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function TrainingDialog({ open, onClose, onSave, customer }) {
  const [date, setDate] = useState(dayjs());
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("60");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setDate(dayjs());
      setActivity("");
      setDuration("60");
      setError("");
    }
  }, [open]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!date || !date.isValid()) {
      setError("Please select a valid date and time.");
      return;
    }

    if (!Number.isInteger(Number(duration)) || Number(duration) <= 0) {
      setError("Duration must be a positive whole number.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await onSave({
        date: date.toDate(),
        activity: activity.trim(),
        duration: Number(duration),
      });

      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={saving ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add Training Session</DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Customer: {customer?.firstname} {customer?.lastname}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <DateTimePicker
                label="Training Date & Time"
                value={date}
                onChange={setDate}
                ampm={false}
                slotProps={{
                  textField: { fullWidth: true, required: true },
                }}
              />

              <TextField
                label="Activity"
                placeholder="e.g. Gym training"
                value={activity}
                onChange={(event) => setActivity(event.target.value)}
                required
                fullWidth
              />

              <TextField
                label="Duration (minutes)"
                type="number"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
                slotProps={{
                  htmlInput: { min: 1, step: 1 },
                }}
                required
                fullWidth
              />
            </Stack>
          </LocalizationProvider>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} disabled={saving}>
            Cancel
          </Button>

          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? "Saving..." : "Add Training"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default TrainingDialog;
