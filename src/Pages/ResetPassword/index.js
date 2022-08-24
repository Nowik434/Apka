import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../Components/Copyright';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Logo } from '../../Components/Logo';
import Paper from '@mui/material/Paper';
import { reset } from '../../Slices/auth';


export default function ResetPassword() {
  const [loadnig, setLoading] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');

  const {code} = useParams();
// console.log(code)
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.message)
  


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(code, password, repeatPassword)
    dispatch(reset({code, password, repeatPassword}))
      .unwrap()
      .then((res) => {
        if (res && res.status === 200) {
          setIsSend(true);
        }
      });
  };


  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={4} sx={{p: 4, marginTop: 8,
            display: 'flex',
            flexDirection: 'column'}}>
        <Box
          sx={{
            alignItems: 'center',
          }}
        >
            <Logo />
          <Typography component="h1" variant="h5">
            Resetowanie hasła
          </Typography>
          {isSend ? (
            <>
              <Typography component="p" sx={{mt: 2, textAlign: 'center'}}>
                Twoje hasło zostało pomyślnie zresetowane
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
<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              type="password"
              required
              fullWidth
              id="password"
              label="Hasło"
              name="password"
              autoComplete="password"
              error={passwordError?true:false}
              helperText={passwordError}
              autoFocus
              onChange={(e)=>setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              id="repeatPassword"
              label="Powtórz hasło"
              name="repeatPassword"
              autoComplete="password"
              error={repeatPasswordError?true:false}
              helperText={repeatPasswordError}
              autoFocus
              onChange={(e)=>setRepeatPassword(e.target.value)}
            />
            {error.message !== '' && <Alert severity="error">
              <AlertTitle>{error.message}</AlertTitle>
            </Alert>}
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
                  {"Zaloguj"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          )}
        </Box>
        </Paper>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}