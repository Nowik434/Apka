import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  MdAddCircleOutline,
  MdEdit,
  MdClose,
  MdOutlineCancel,
} from "react-icons/md";
// import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ImCheckmark, ImCross } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Grid, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { addSkill, removeSkill } from "../../../Slices/resume";


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

function Skills() {
  const skills = useSelector((state) => state.resume.skills);
  const dispatch = useDispatch();

  // const { addSkill, removeSkill } = bindActionCreators(
  //   actionCreators,
  //   dispatch
  // );

  // const [skills, setSkills] = useState([]);
  const [show, setShow] = useState(false);
  const [Alert, setAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleClose = () => {
    setShow(false);
    setValidated(false);
  };
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false);
  const [validated, setValidated] = useState(false);

  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSkills = (e) => {
    e.preventDefault();
    const valid = e.currentTarget;
    if (!valid.checkValidity()) {
      setValidated(true);
    } else {
      setIsEdit(true);
      dispatch(addSkill(input));
      setInput("");
    }
  };

  const handleAlertClose = () => setAlert(false);
  const handleAlert = (id) => {
    setDeleteId(id);
    setAlert(true);
  };
  const handleDelete = (id) => {
    dispatch(removeSkill(id));
    setAlert(false);
  };
  useEffect(() => {
    if (skills.length === 0) {
      setIsEdit(false);
    }
  }, [skills]);

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

  return (
    <>
      <Item>
        <Grid container>
          <Grid sx={{ alignSelf: "center", flexGrow: 1 }}>
            <Typography variant="h6">Umiejętności</Typography>
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

      <Grid container >
        <Grid
          item
          xs={12}
          sx={{ borderBottom: "1px solid #0000001f", mt: 1, pb: 2 }}
        >
          <Stack direction="row" spacing={1} >
            {skills.map((items, id) => {
              return (
                <Chip key={id} label={items} size="small" variant="outlined" />
              );
            })}
          </Stack>
        </Grid>
      </Grid>

      <Modal open={show} onClose={handleClose}>
        <Box sx={style} component="form" noValidate autoComplete="off">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Umiejętności
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              display: "grid",
              gridTemplateColumns: { sm: "2fr 1fr" },
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              label="Wpisz umiejętność"
              id="fullWidth"
              value={input}
              placeholder="Napisz coś o sobie"
              onChange={handleInput}
            />
            <Button variant="outlined" onClick={handleSkills}>
              Dodaj
            </Button>
          </Box>
          <Grid item xs={4} sx={{ alignSelf: "center" }}>
            <Stack direction="row" spacing={1} sx={{ paddingBottom: "15px" }}>
              {skills.map((items, id) => {
                <Chip
                  label={items}
                  onClick={() => {
                    handleAlert(id);
                  }}
                />;
              })}
            </Stack>
          </Grid>

          <Stack
            direction="row"
            spacing={1}
            sx={{ paddingBottom: "15px", flexWrap: "wrap" }}
          >
            {skills.map((items, id) => (
              <Chip
                key={id}
                label={items}
                onDelete={() => {
                  handleDelete(id);
                }}
                sx={{ ml: 1, mb: 1 }}
              />
            ))}
          </Stack>

          <Button variant="outlined" onClick={handleClose} sx={{ mt: "10px" }}>
            Zapisz zmiany
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default Skills;
