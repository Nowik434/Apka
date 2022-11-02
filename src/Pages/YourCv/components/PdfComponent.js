import React from "react";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PlaceIcon from "@mui/icons-material/Place";
import { Button, Chip, Typography, useMediaQuery } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

function PdfComponent() {
  const profile = useSelector((state) => state.resume.profile);
  const name = profile.name.split(" ");
  const file = useSelector((state) => state.resume.file);
  const about = useSelector((state) => state.resume.about);
  const experienceList = useSelector((state) => state.resume.experienceList);
  const educationList = useSelector((state) => state.resume.educationList);
  const skills = useSelector((state) => state.resume.skills);
  const mobileView = useMediaQuery('(max-width:425px)');

  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4", false);
      pdf.addImage(imgData, "PNG", 0, 0, 600, 0, undefined, false);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  };

  return (
    <>
      <Grid item xs={12} md={12} sx={mobileView ? { textAlign: "center", mt: 14 } : { textAlign: "center", mt: 5 }}>
        <Button variant="outlined" onClick={printDocument}>
          Pobierz PDF
        </Button>
      </Grid>

      <Paper
        elevation={3}
        id="divToPrint"
        sx={
          mobileView
            ? {
                my: 6,
                textAlign: "center",
                transform: "scale(0.4) translate(11%, 15%)",
                transformOrigin: "0 0",
                width: "21cm",
                minHeight: "29.7cm",
                padding: "2cm",
                margin: "1cm auto",
                border: "1px #D3D3D3 solid",
                borderRadius: "5px",
                background: "white",
                marginBottom: '-545px',
              }
            : {
                width: "21cm",
                minHeight: "29.7cm",
                padding: "2cm",
                margin: "1cm auto",
                border: "1px #D3D3D3 solid",
                borderRadius: "5px",
                background: "white",
              }
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <Avatar
              alt="Remy Sharp"
              src={file ? file : "/static/images/avatar/1.jpg"}
              sx={{ width: 200, height: 200 }}
            />
          </Grid>
          <Grid item xs={6} md={8}>
            <Stack spacing={2}>
              <Typography variant="h4" component="h4">
                {name[0]}
              </Typography>
              <Typography variant="h4" component="h4">
                {name[1]}
              </Typography>
              <Divider />
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
                <Grid container spacing={2} sx={{ textAlign: "center" }}>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "-webkit-inline-box",
                      "-webkit-box-pack": "center",
                    }}
                  >
                    <WorkOutlineIcon />
                    <Typography variant="h7" component="h4">
                      Twoje stanowisko
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "-webkit-inline-box",
                      "-webkit-box-pack": "center",
                    }}
                  >
                    <PlaceIcon />
                    <Typography variant="h7" component="h4">
                      Miasto, Kraj
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack spacing={2}>
              <Box>
                <Typography
                  variant="h5"
                  component="h4"
                  sx={{ textAlign: "center", color: "#d2ab67", mt: 3 }}
                >
                  O Mnie
                </Typography>
                <Typography
                  variant="h7"
                  component="h4"
                  sx={{ textAlign: "center" }}
                >
                  {about}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  component="h4"
                  sx={{ textAlign: "center", color: "#d2ab67", mt: 3 }}
                >
                  Umiejętności
                </Typography>
                <Grid container>
                  <Grid
                    sx={{
                      alignSelf: "center",
                      justifyContent: "center",
                      flexGrow: 1,
                      display: "flex",
                      mt: 2,
                    }}
                  >
                    {skills.map((items, id) => {
                      return (
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ paddingBottom: "15px" }}
                        >
                          <Chip key={id} label={items} sx={{ mr: 1 }} />
                        </Stack>
                      );
                    })}
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  component="h4"
                  sx={{ textAlign: "center", color: "#d2ab67", mt: 3 }}
                >
                  Doświadczenie
                </Typography>
                <Grid container sm={12}>
                  <Grid sx={{ alignSelf: "center", flexGrow: 1 }}>
                    {experienceList.map((item, id) => {
                      return (
                        <Paper
                          elevation={0}
                          key={id}
                          sx={{
                            p: 2,
                            bgcolor: "background.default",
                            borderBottom: "1px solid #555",
                            borderRadius: 0,
                          }}
                        >
                          <Grid container spacing={2}>
                            <Grid item sm={2} sx={{ alignSelf: "center" }}>
                              <WorkOutlineIcon
                                fontSize="large"
                                sx={{ color: "#d2ab67" }}
                              />
                            </Grid>
                            <Grid item xs={6} sx={{ alignSelf: "center" }}>
                              <Typography variant="h6">{item.title}</Typography>
                              <Typography
                                variant="h7"
                                display="block"
                                gutterBottom
                                sx={{ mb: 0 }}
                              >
                                {item.company} • {item.startMonth}{" "}
                                {item.startYear}
                                {`${
                                  item.isWorking
                                    ? " - Present"
                                    : " - " + item.endMonth + " " + item.endYear
                                }`}
                              </Typography>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                                sx={{ mb: 0 }}
                              >
                                {item.location}
                              </Typography>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                                sx={{ mb: 0 }}
                              >
                                {item.description}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      );
                    })}
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  component="h4"
                  sx={{ textAlign: "center", color: "#d2ab67", mt: 3 }}
                >
                  Edukacja
                </Typography>
                <Grid container sm={12}>
                  <Grid sx={{ alignSelf: "center", flexGrow: 1 }}>
                    {educationList.map((item, id) => {
                      return (
                        <Paper
                          elevation={0}
                          key={id}
                          sx={{
                            p: 2,
                            bgcolor: "background.default",
                            borderBottom: "1px solid #555",
                            borderRadius: 0,
                          }}
                        >
                          <Grid container spacing={2}>
                            <Grid item sm={2} sx={{ alignSelf: "center" }}>
                              <SchoolIcon
                                fontSize="large"
                                sx={{ color: "#d2ab67" }}
                              />
                            </Grid>
                            <Grid item xs={6} sx={{ alignSelf: "center" }}>
                              <Typography variant="h7">
                                {item.institute}
                              </Typography>
                              <Typography variant="caption">
                                {item.degree} • {item.fieldOfStudy}
                              </Typography>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                                sx={{ mb: 0 }}
                              >
                                {item.startYear} - {item.endYear} • Ocena:{" "}
                                {item.grade}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              sm={4}
                              sx={{
                                display: "flex",
                                flexFlow: "column-reverse",
                                alignItems: "end",
                                alignSelf: "center",
                              }}
                            ></Grid>
                          </Grid>
                        </Paper>
                      );
                    })}
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default PdfComponent;
