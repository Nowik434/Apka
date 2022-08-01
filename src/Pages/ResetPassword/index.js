import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../Components/Copyright';
import {loginUser} from '../../Actions/authenticationActions';
import {login} from '../../Slices/auth'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Navigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import messageReducer from '../../Slices/message';
import { Logo } from '../../Components/Logo';
import Paper from '@mui/material/Paper';


export default function ResetPassword() {
  const [loadnig, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  // const [error, setError] = useState('')
  const [checked, setChecked] = useState(false);

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const error = useSelector((state) => state.message)
  


  const handleSubmit = (event) => {
    event.preventDefault();  
    dispatch(login({username, password}))
      .unwrap()
      .then((res) => {
        if(res.user !== undefined) {
          console.log('navigate from login', res.user)
          navigate("/")
          // window.location.reload();
        }
      })
      .catch((err) => {
        console.log('errrr', err.message)
        setLoading(false);
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adres email"
              name="email"
              autoComplete="email"
              error={usernameError?true:false}
              helperText={usernameError}
              autoFocus
              onChange={(e)=>setUsername(e.target.value)}
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
        </Box>
        </Paper>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}