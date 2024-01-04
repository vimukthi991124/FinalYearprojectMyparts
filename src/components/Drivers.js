import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Grid } from "@mui/material";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Logic for handling login
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{ sx: { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{ sx: { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ borderRadius: 2 }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
