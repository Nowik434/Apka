import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../Components/Copyright';
import { Logo } from '../../Components/Logo';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';


export default function TermsAndConditions() {
    const navigate = useNavigate();

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
          <Typography component="h2" variant="h6">
            Regulamin
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Typography variant="body2" gutterBottom>
            Zgodnie z art.6 ust.1 lit. a ogólnego rozporządzenia o ochronie danych osobowych z dnia 27 kwietnia 2016 r.(Dz. Urz. UE L 119 z 04.05.2016) wyrażam zgodę na przetwarzanie moich danych osobowych w celach marketingowych.
Zostałem(-am) poinformowany(-a), że przysługuje mi prawo dostępu do swoich danych, możliwości ich poprawiania, żądania zaprzestania ich przetwarzania.
Administratorem danych jest Fundacja VCC, Matki Teresy z Kalkuty 18/16, 20-538 Lublin.
            </Typography>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => navigate(-1)}
            >
                Powrót
            </Button>
          </Box>
        </Box>
        </Paper>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}