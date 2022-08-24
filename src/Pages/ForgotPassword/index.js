import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../../Components/Copyright";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Logo } from "../../Components/Logo";
import Paper from "@mui/material/Paper";
import { forgot } from "../../Slices/auth";

export default function ForgotPassword() {
  const [loadnig, setLoading] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const error = useSelector((state) => state.message);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(forgot(email))
      .unwrap()
      .then((res) => {
        if (res.status === 200) {
          setIsSend(true);
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        elevation={4}
        sx={{ p: 4, marginTop: 8, display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            alignItems: "center",
          }}
        >
          <Logo />
          <Typography component="h1" variant="h5" sx={{textAlign: 'center'}}>
            Resetowanie hasła
          </Typography>
          {isSend ? (
            <>
              <Typography component="p" sx={{mt: 2, textAlign: 'center'}}>
                Wysłano link do zresetowania hasła na adres email: <span style={{fontWeight: 'bold'}}>{email}</span>
              </Typography>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 2}}
                onClick={() => navigate('/')}
              >
                Wróć do logowania
              </Button>
            </>
          ) : (
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adres email"
                name="email"
                autoComplete="email"
                error={emailError ? true : false}
                helperText={emailError}
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              {error.message !== "" && (
                <Alert severity="error">
                  <AlertTitle>{error.message}</AlertTitle>
                </Alert>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Zresetuj hasło
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Powrót do logowania"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
