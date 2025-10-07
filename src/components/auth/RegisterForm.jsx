import { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // mock registration
    console.log(form);
    navigate("/login");
  };

  return (
    <Paper elevation={4} sx={{ p: 4, width: 350, mx: "auto", mt: 10 }}>
      <Typography variant="h5" mb={2} textAlign="center">Create Account</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          fullWidth
          margin="normal"
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Register
        </Button>
        <Button
          fullWidth
          variant="text"
          sx={{ mt: 1 }}
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </Button>
      </Box>
    </Paper>
  );
}
