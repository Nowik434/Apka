import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
// import { actionCreators } from "../state/index";
// import { actionCreators } from "../../../Slices/resume";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Button, Grid, TextField, Typography } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { manageAbout } from "../../../Slices/resume";

function About() {
  const about = useSelector((state) => state.resume.about);
  const dispatch = useDispatch();
  // const { manageAbout } = bindActionCreators(actionCreators, dispatch);

  const [isEdit, setIsEdit] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleAbout = (e) => {
    const valid = e.currentTarget;
    if (!valid.checkValidity()) {
      setValidated(true);
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
    // manageAbout(e.target.value);
    dispatch(manageAbout(e.target.value))
  };
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setValidated(false);
  };
  const handleShow = () => setShow(true);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    backgroundColor: "#f8f9fa",
    paddingTop: "15px",
    paddingBottom: "15px",
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Item>
        <Grid container>
          <Grid sx={{ alignSelf: "center", flexGrow: 1 }}>
            <Typography variant="h6">O Mnie</Typography>
          </Grid>
          <Grid justifyContent="flex-end">
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              onClick={handleShow}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      </Item>

      <Grid container>
        <Grid item xs={12}>
          <Stack direction="row" spacing={1}>
            {about && (
              <Typography variant="h8" sx={{ ml: 2, my: 2 }}>
                {about}
              </Typography>
            )}
          </Stack>
        </Grid>
      </Grid>

      <Modal open={show} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            O Mnie
          </Typography>
          <TextField
            fullWidth
            label="O Mnie"
            id="fullWidth"
            value={about}
            placeholder="Napisz coś o sobie"
            onChange={handleAbout}
          />
          <Button variant="outlined" onClick={handleClose} sx={{ mt: "10px" }}>
            Zapisz zmiany
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default About;
