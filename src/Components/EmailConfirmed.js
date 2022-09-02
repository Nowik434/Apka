import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

export default function EmailConfirmation() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box alignItems='center' sx={{ height: '100vh', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center'}}>
         <span style={{borderRight: '3px solid #937748', paddingRight: '10px'}}>Twój adres email został potwierdzony</span>
        </Typography>
        <Typography variant="h6" component="h3" sx={{ textAlign: 'center'}}>
            Możesz się teraz zalogować
        </Typography>
        <Button href="/login" variant="contained" sx={{justifyContent: 'center', display: 'flex', mt: 4 }}>Przejdź do logowania</Button>
        </Box>
      </Container>
    </React.Fragment>
  );
}
