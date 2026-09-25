import { useState } from "react";
import type { Dayjs } from "dayjs";
import BudgetItems from "./BudgetItems";
import type { BudgetItem, BudgetType } from "../types";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function BudgetTracker() {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [type, setType] = useState<BudgetType>("Expense");
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [error, setError] = useState<string>("");

  const addItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!description || !amount || !date || !type) {
      setError("All fields must be filled in.");
      return;
    }

    const parsedAmount = Number(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Amount must be a valid positive number.");
      return;
    }

    const finalAmount = type === "Expense" ? -parsedAmount : parsedAmount;

    const newItem: BudgetItem = {
      id: Date.now(),
      description,
      amount: finalAmount,
      type,
      date: date.format("YYYY-MM-DD"),
    };

    setItems([...items, newItem]);
    setDescription("");
    setAmount("");
    setDate(null);
    setType("Expense");
    setError("");
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const totalBalance = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Budget Tracker
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Box
            component="form"
            onSubmit={addItem}
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              alignItems: "center",
              mb: 2,
            }}
          >
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
              label="Amount"
              type="number"
              variant="outlined"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <DatePicker
              label="Date"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              slotProps={{
                textField: {
                  variant: "outlined",
                },
              }}
            />

            <TextField
              select
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value as BudgetType)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="Expense">Expense</MenuItem>
              <MenuItem value="Income">Income</MenuItem>
            </TextField>

            <Button variant="contained" type="submit">
              Add
            </Button>
          </Box>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Typography variant="h6">
            Current Saldo: {totalBalance} €
          </Typography>
        </Paper>

        <BudgetItems items={items} onDelete={deleteItem} />
      </Box>
    </Box>
  );
}

export default BudgetTracker;