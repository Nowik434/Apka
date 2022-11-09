import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Profile from "./Profile";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
import { NavLink } from "react-router-dom";
import banner from "../../../assets/vccbanner.jpg";
import "../index.css";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Grid, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../../../Components/ChangingProgressProvider";
import BorderLinearProgressBar from "../../../Components/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { getResume, updateResume } from "../../../Slices/resume";
import UsePrompt from "../../../Components/LeaveAlert";
import { useState } from "react";


function Resume() {
  const percentage = 66;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const resume = useSelector((state) => state.resume);
  const isEdited = useSelector((state) => state.resume.isEdited);
  const [isDirty, setIsDirty] = useState(false);

useEffect(()=>{
  setIsDirty(isEdited)
}, [isEdited])

  useEffect(() => {
    dispatch(getResume({ id: user.user.id, token: user.jwt }));
  }, [user]);

  const handleClick = () => {
    dispatch(
      updateResume({
        id: user.user.id,
        token: user.jwt,
        payload: {...resume, isEdited: false},
      })
    );
  };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${banner})` }}
        fluid="true"
        className="p-0 top-image"
      ></div>
      <Container>
        <Profile />
        <Grid container spacing={2} sx={{ justifyContent: "center", mt: 4 }}>
          <Grid item xs={12} sm={10} md={8}>
            <Box sx={{ width: "100%" }}>
              <Stack spacing={1}>
                <About />
                <Experience />
                <Education />
                <Skills />
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ justifyContent: "center", mt: 4 }}>
          <Grid item sm={6}>
            <Grid container spacing={3}>
              <Grid item xs={16} sm={6}>
                <Paper elevation={0} sx={{ p: 6 }}>
                  <Typography>IT</Typography>
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                      pathColor: "#d2ab67",
                      trailColor: "#eee",
                      textColor: "black",
                      strokeLinecap: "butt",
                    })}
                  />
                  <Box sx={{ mt: 4 }}>
                    <Typography>Adobe Photoshop</Typography>
                    <BorderLinearProgressBar value={40} />
                  </Box>
                  <Box sx={{ mt: 4 }}>
                    <Typography>Projektowanie CAD 2D i 3D</Typography>
                    <BorderLinearProgressBar value={70} />
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={0} sx={{ p: 6 }}>
                  <Typography>Techniczne</Typography>
                  <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
                    {(percentage) => (
                      <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        styles={buildStyles({
                          pathColor: "#d2ab67",
                          trailColor: "#eee",
                          textColor: "black",
                          strokeLinecap: "butt",
                        })}
                      />
                    )}
                  </ChangingProgressProvider>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <UsePrompt message="Czy napewno chcesz wyjść? twoje zmiany mogą nie zostać zapisane. Aby zapisać zmiany w swoim CV kliknij przycisk Zapisz. Jeżeli chcesz wyjść bez zapisywania kliknik OK" when={isDirty}/>

{
  isEdited ? (
<Grid container sx={{ justifyContent: "center", mt: 6 }}>
          <Button variant="contained" onClick={handleClick}>
            Zapisz
          </Button>
        </Grid>
  ) : (
    <Grid container sx={{ justifyContent: "center", mt: 6 }}>
    <Button variant="contained">
      <NavLink style={{ color: "#fff" }} to="/yourcv/preview">
        Podejrzyj swoje CV
      </NavLink>
    </Button>
  </Grid>
  )
}
        

      </Container>
    </>
  );
}

export default Resume;
