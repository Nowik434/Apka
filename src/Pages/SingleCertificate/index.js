import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { getCertificates } from "../../Slices/certificates";
import { useParams } from "react-router-dom";
import { createSelector } from 'reselect';
import Copyright from '../../Components/Copyright';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from "react-to-print";


export default function SingleCertificate() {
let { certificateId } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);


const selectCertificates = createSelector(
    (state) => state.certificates,
  (certificates) => certificates.filter((cert)=> cert.attributes.cerId === certificateId)[0].attributes
)

const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

const cert = useSelector(selectCertificates)
  
  useEffect(() => {
    dispatch(getCertificates(user.user.email))
    console.log(cert)
  }, []);

  return (
    <main>
        {cert && 
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
            gutterBottom
          >
            Certyfikat
          </Typography>
          <Typography
            variant="h4"
            align="center"
            color="text.secondary"
            paragraph
          >
            {cert && cert.name}
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
          >
            Numer certyfikatu: {cert && cert.cerId}
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
          >
            Data wydania: {cert && cert.date}
          </Typography>
          <div style={{marginTop: '20px', marginBottom: '20px'}}>
          <img
                src={cert && cert.url}
                alt={cert && cert.name}
                loading="lazy"
                style={{maxWidth: '100%'}}
                ref={componentRef}
            />
          </div>
            <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="outlined" endIcon={<DownloadIcon/>}><a style={{textDecoration: 'none', color: '#d2ab67'}} href={cert.url} download target="_blank">Pobierz</a></Button>
            <Button variant="outlined" endIcon={<PrintIcon/>} onClick={handlePrint}>Drukuj</Button>
          </Stack>
        </Container>
      </Box>
      }
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </main>
  );
}
