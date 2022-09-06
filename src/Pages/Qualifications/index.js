import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import { getQualifications } from "../../Slices/qualifications";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import DropdownShareButton from "../../Components/DropdownShareButton";
import { Fade } from '@mui/material';
import { getCertificates } from "../../Slices/certificates";
import { useDocumentTitle } from "../../Hooks/useDocumentTitle";
import { Footer } from "../../Components/Footer";

const UPLOADS_URL = process.env.REACT_APP_UPLOADS_URL;

export default function Qualifications() {
  useDocumentTitle('kwalifikacje')
  const [displaySelected, setDisplaySelected] = useState(false)
  const [filtered, setFiltered] = useState()
  const dispatch = useDispatch();
  const yourTypes = useSelector((state) => state.certificates.reduce(
    (unique, item) => (unique.includes(item.attributes.type) ? unique : [...unique, item.attributes.type]),
    [],
  ));
  const qualifications = useSelector((state) => state.qualifications);
  const filteredQualifications = (type) => type.map(type => qualifications.filter(el=>el.attributes.type === type && el)).flat();
  

  

  useEffect(() => {
    if(qualifications){
      dispatch(getQualifications());
      dispatch(getCertificates());
    }
    setFiltered(filteredQualifications(yourTypes))
  }, [displaySelected]);


  // console.log('qq', qualifications)
  // console.log('filteredQuali', filteredQualifications(yourTypes))
  // console.log('Quali', filtered)

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
              variant="h2"
              align="center"
              color="text.primary"
            >
              Kwalifikacje dla Ciebie
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Na bazie posiadanych przez Ciebie certyfikatów wybraliśmy
              Kwalifikacje, którymi możesz być zainteresowany.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant={displaySelected ? "contained" : "outlined"} onClick={()=>setDisplaySelected(true)}>Wybrane dla Ciebie</Button>
              <Button variant={displaySelected ? "outlined" : "contained"} onClick={()=>setDisplaySelected(false)}>Wszystkie</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {
              displaySelected && (
                filtered.map(({id, attributes}) => (
                  <Fade key={id} in={true} timeout={400}>
                  <Grid item key={id} xs={12} sm={6} md={6} >
                  <Card sx={{height: '100%'}}>
                  <CardMedia
                    component="img"
                    alt="zdjęcie"
                    height="140"
                    image={attributes.src.data ? `${UPLOADS_URL}${attributes.src.data[0].attributes.url}` : null}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {attributes.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {attributes.desc}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <DropdownShareButton shareUrl={attributes.share_url}/>
                    <a href={attributes.share_url} style={{margin: '0px 0px 0px auto', textDecoration: 'none'}} target="_blank"><Button size="small" >Dowiedz się więcej</Button></a>
                  </CardActions>
                </Card>
                </Grid>
                </Fade>
                ))
              )
                }
                {
              !displaySelected && (
                qualifications.map(({id, attributes}) => (
                  <Fade key={id} in={true} timeout={400}>
                  <Grid item key={id} xs={12} sm={6} md={6}>
                  <Card sx={{height: '100%'}}>
                  <CardMedia
                    component="img"
                    alt="zdjęcie"
                    height="140"
                    image={attributes.src.data ? `${UPLOADS_URL}${attributes.src.data[0].attributes.url}` : null}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {attributes.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {attributes.desc}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <DropdownShareButton shareUrl={attributes.share_url}/>
                    <a href={attributes.share_url} style={{margin: '0px 0px 0px auto', textDecoration: 'none'}} target="_blank"><Button size="small" >Dowiedz się więcej</Button></a>
                  </CardActions>
                </Card>
                </Grid>
                </Fade>
                ))
              )
            }
            </Grid>
        </Container>
      </main>
      <Footer/>
    </>
  );
}
