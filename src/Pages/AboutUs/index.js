import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

import { ListItemText } from "@mui/material";
import { useDocumentTitle } from "../../Hooks/useDocumentTitle";
import { Footer } from "../../Components/Footer";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export default function AboutUs() {
  useDocumentTitle("O Nas");

  return (
    <>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
            >
              Nasza Działalność
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            <Typography variant="h6" gutterBottom>
              Fundacja VCC prowadzi działania badawczo-rozwojowe w zakresie
              kształcenia zawodowego oraz transferu wiedzy i innowacji z
              wykorzystaniem zasobów kapitału intelektualnego. Działalność
              Fundacji VCC koncentruje się wokół teoretycznych i
              metodologicznych aspektów ustawicznego kształcenia zawodowego oraz
              potwierdzania kwalifikacji zawodowych, szczególnie w systemie
              pozaformalnym i nieformalnym. Głównym zadaniem Fundacji VCC jest
              obserwacja i analiza trendów i zmian zachodzących na rynku pracy
              oraz badanie zapotrzebowania na określone kwalifikacje. Fundacja
              VCC jest promotorem koncepcji uczenia się przez całe życie,
              kształcenia ustawicznego i mobilności zawodowej. Poprzez
              organizowanie konsultacji, konferencji czy debat społecznych
              bezpośrednio wpływa na ich rozwój, promocję i upowszechnienie.
              Wynikiem prac Fundacji jest jednolity system kształcenia i
              potwierdzania kwalifikacji zawodowych – system VCC (Vocational
              Competence Certificate), którego Fundacja jest właścicielem i
              operatorem.
            </Typography>
            <Typography variant="h6" gutterBottom>
              GŁÓWNE ZADANIA FUNDACJI VCC:
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="monitorowanie potrzeb światowego rynku pracy, tendencji i zmian na nim zachodzących," />
              </ListItem>
              <ListItem>
                <ListItemText primary="monitorowanie zapotrzebowania na nowe zawody i kwalifikacje," />
              </ListItem>
              <ListItem>
                <ListItemText primary="określanie kwalifikacji dla nowopowstałych zawodów," />
              </ListItem>
              <ListItem>
                <ListItemText primary="testowanie i implementacja nowych rozwiązań w zakresie kształcenia zawodowego," />
              </ListItem>
              <ListItem>
                <ListItemText primary="wskazywanie kierunków i metod kształcenia zawodowego w systemie pozaformalnym i nieformalnym," />
              </ListItem>
              <ListItem>
                <ListItemText primary="certyfikowanie kwalifikacji w sposób ujednolicony, zgodny z krajowymi i unijnymi wytycznymi w tym zakresie," />
              </ListItem>
              <ListItem>
                <ListItemText primary="promocja mobilności zawodowej pracowników," />
              </ListItem>
              <ListItem>
                <ListItemText primary="promocja uczenia się przez całe życie." />
              </ListItem>
            </List>
          </Grid>
        </Container>
      </main>
      <Footer />
    </>
  );
}
