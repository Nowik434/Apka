import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { Link as Link2, useNavigate } from "react-router-dom";
import { getCertificates } from "../../Slices/certificates";
import AdditionalForm from "../../Components/AdditionalForm";
import Skeleton from "@mui/material/Skeleton";
import Copyright from "../../Components/Copyright";

export default function Main() {
  const dispatch = useDispatch();
  // let navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const certificates = useSelector((state) => state.certificates);

  useEffect(() => {
    dispatch(getCertificates(user.user.email));
  }, []);


  return (
    <>
        <main>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 0,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Galeria Certyfikatów
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                Galeria posiadanych przez Ciebie certyfikatów
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
              </Stack>
            </Container>
          </Box>
          {user.user.phone ? (
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {certificates.map(({ id, attributes }) => (
                <Grid item key={id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={attributes.url}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {attributes.name}
                      </Typography>
                      <Typography>{attributes.date}</Typography>
                    </CardContent>
                    <CardActions sx={{ alignSelf: "center" }}>
                      <Link2
                        to={`/certificates/${attributes.cerId}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="outlined"
                          size="small"
                        >
                          Wyświetl
                        </Button>
                      </Link2>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        
      ) : (
        <>
          <Container sx={{position: 'relative'}}>
          <AdditionalForm />
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                <Stack spacing={1}>
                  <Skeleton variant="rectangular" height={180} />
                  <Skeleton variant="text" height={50}/>
                </Stack>
              </Grid>
              <Grid item md={4} xs={12}>
                <Stack spacing={1}>
                  <Skeleton variant="rectangular" height={180} />
                  <Skeleton variant="text" height={50}/>
                </Stack>
              </Grid>
              <Grid item md={4} xs={12}>
                <Stack spacing={1}>
                  <Skeleton variant="rectangular" height={180} />
                  <Skeleton variant="text" height={50}/>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Tekst w footer
        </Typography>
      </Box>
      </main>
    </>
  );
}
