import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

export default function Error404() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box alignItems='center' sx={{ height: '100vh', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
        <Typography variant="h4" component="h2" >
         <span style={{borderRight: '3px solid #937748', paddingRight: '10px'}}>404</span> Strona nie istnieje
        </Typography>
        <Button href="/" variant="contained" sx={{justifyContent: 'center', display: 'flex', mt: 4 }}>Powrót na stronę główną</Button>
        </Box>
      </Container>
    </React.Fragment>
  );
}
