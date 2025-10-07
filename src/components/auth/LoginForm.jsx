
import { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // mock login
    console.log(form);
    navigate("/dashboard");
  };

  return (
    <Paper elevation={4} sx={{ p: 4, width: 350, mx: "auto", mt: 10 }}>
      <Typography variant="h5" mb={2} textAlign="center">Login</Typography>
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
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Login
        </Button>
        <Button
          fullWidth
          variant="text"
          sx={{ mt: 1 }}
          onClick={() => navigate("/register")}
        >
          Create Account
        </Button>
      </Box>
    </Paper>
  );
}
