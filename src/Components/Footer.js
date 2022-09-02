import React from "react";
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const footers = [
    {
      title: 'O NAS',
      description: [
        {title: 'Historia', url: 'https://vccsystem.eu/'},
        {title: 'Działalność', url: 'https://vccsystem.eu/'},
        {title: 'Lokalizacja', url: 'https://vccsystem.eu/'},
      ]
    },
    {
      title: 'O ZSK',
      description: [
        {title: 'Czym jest ZSK?', url: 'https://vccsystem.eu/'},
        {title: 'Jak uzyskać certyfikat?', url: 'https://vccsystem.eu/'},
      ],
    },
    {
      title: 'INFORMACJE',
      description: [
        {title: 'Jak zostać egzaminatorem?', url: 'https://vccsystem.eu/'},
        {title: 'Jak zgłosić się na egzamin?', url: 'https://vccsystem.eu/'},
      ]
    },
    {
      title: 'KONTAKT',
      description: [
        {title: 'Lokalizacja', url: 'https://vccsystem.eu/'},
        {title: 'Napisz do Nas', url: 'https://vccsystem.eu/'},
      ]
    },
  ];

export const Footer = () => {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Container
        maxWidth="md"
        component="footer"
        sx={{
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            mt: 8,
            py: [3, 6],
        }}
        >
        <Grid container spacing={4} justifyContent="space-evenly">
            {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
                </Typography>
                <ul style={{listStyle: 'none', paddingLeft: 0}}>
                {footer.description.map((item) => (
                    <li key={item.title}>
                        <Link href={item.url} variant="subtitle1" color="text.secondary" style={{textDecoration: 'none'}}>
                            {item.title}
                        </Link>
                    </li>
                ))}
                </ul>
            </Grid>
            ))}
        </Grid>
        </Container>
    </Box>
  );
};
