import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../Components/Copyright';
import {login} from '../../Slices/auth'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Logo } from '../../Components/Logo';
import { useRememberMe } from '../../Hooks/useRememberMe';
import { useDocumentTitle } from '../../Hooks/useDocumentTitle';

export default function Login() {
  useDocumentTitle('logowanie')
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [checked, setChecked] = useState(false);

  const {saveToLocal} = useRememberMe(checked, {username, password})

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.message)

  const checkboxChange = (e) => {
    setChecked(e);
  };

  useEffect(()=>{
    const localData = JSON.parse(localStorage.getItem("rememberMe"))
    setChecked(localData ? true : false)
    setUsername(localData ? localData.username : username);
    setPassword(localData ? localData.password : password);
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    if(!username.includes('@')){
      setUsernameError('Login musi zawierać znak @');
    } else if(username.length < 5){
      setUsernameError('Login musi być dłuższy niż 5 znaków');
    } else {
      setUsernameError(null);
    }

    if(password.length < 5){
      setPasswordError('Hasło musi być dłuższe niż 5 znaków');
    } else {
      setPasswordError(null);
    }
    saveToLocal()
    dispatch(login({username, password}))
      .unwrap()
      .then((res) => {
        if(res.user !== undefined) {
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
      <Container component="main" maxWidth="xs" sx={{mb: 4}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

            <Logo/>

          <Typography component="h1" variant="h5">
            Logowanie
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
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Hasło"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordError?true:false}
              helperText={passwordError}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox checked={checked} color="primary" onChange={(e) =>checkboxChange(e.target.checked)}/>}
              label="Zapamiętaj mnie"
            />
            {error.message !== '' && <Alert severity="error">
              <AlertTitle sx={{mb: 0}}>{error.message}</AlertTitle>
            </Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Zaloguj
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Zapomniałeś hasło?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Nie masz konta? Zarejestruj się"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}
