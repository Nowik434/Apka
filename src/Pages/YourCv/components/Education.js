import React, { useState, useId } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Grid, Typography, Button } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import SchoolIcon from '@mui/icons-material/School';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { addEducation, editEducation, removeEducation } from '../../../Slices/resume';



function Education() {

  const educationList = useSelector(state => state.resume.educationList)
  const dispatch = useDispatch();
  // const {addEducation, editEducation, removeEducation} = bindActionCreators(actionCreators, dispatch);

  const [show, setShow] = useState(false);
  const [Alert, setAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const randomId = Math.random().toString(16)


  const handleClose = () => {
    setValidated(false);
    setShow(false);
    setForm({
      id: "",
      institute: "",
      degree: "",
      grade: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
      isEdit: false
    })
  }
  const handleShow = () => setShow(true);
  const handleAlertClose = () => setAlert(false);
  const handleAlert = (id) => {
    setDeleteId(id)
    setAlert(true);
  }


  // const [list, setList] = useState([]);
  const [form, setForm] = useState({
    id: "",
    institute: "",
    degree: "",
    grade: "",
    fieldOfStudy: "",
    startYear: "",
    endYear: "",
    isEdit: false
  });

  const handleForm = (e) => {
    setForm((old) => {
      console.log(old, e)
      return {
        ...old,
        // id: randomId,
        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
      }
    })
  }

  const year = (new Date()).getFullYear();
    const years = Array.from(new Array(20),( val, index) => index -10 + year);


  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const x = event.currentTarget;
    if (!x.checkValidity()) {
      setValidated(true);
    }
    else {
      if (form.isEdit) {
        dispatch(editEducation(form))
        // list[form.id] = form;
        // setList(list);
      }
      else {
        dispatch(addEducation(form))
        // const newList = list.concat({ ...form });
        // setList(newList);
      }
      setShow(false);
      setForm({
        id: "",
        institute: "",
        degree: "",
        grade: "",
        fieldOfStudy: "",
        startYear: "",
        endYear: "",
        isEdit: false
      })
    }

  }

  const handleEdit = (id) => {
    const form = educationList[id];
    // form.isEdit = true;
    // form.id = id
    setForm({...form, isEdit: true, id: id})
    setShow(true);
  }

  const handleDelete = (id) => {
    dispatch(removeEducation(id));
    // list.splice(id, 1);
    // setList(list);
    setAlert(false);
  }

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
            <Typography variant="h6">Edukacja</Typography>
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
        <Grid sx={{ alignSelf: "center", flexGrow: 1 }}>
        {educationList.map((item, id) => {
          return (
          <Paper
            elevation={0}
            key={id}
            sx={{
              p: 2,
              bgcolor: "background.default",
              borderBottom: '1px solid #555',
              borderRadius: 0,
            }}
          >
            <Grid container spacing={2}>
              <Grid item sm={2} sx={{alignSelf: 'center'}}>
                <SchoolIcon fontSize='large' sx={{color: '#d2ab67'}}/>
                
              </Grid>
              <Grid item xs={6} sx={{alignSelf: 'center'}}>
              <Typography variant='h7' >{item.institute}</Typography>
              <Typography variant='caption' >{item.degree} • {item.fieldOfStudy}</Typography>
              <Typography variant="caption" display="block" gutterBottom sx={{mb: 0}}>
              {item.startYear} - {item.endYear} • Ocena: {item.grade}
              </Typography>
              </Grid>
              <Grid
                item
                sm={4}
                sx={{
                  display: 'flex',
                  flexFlow: 'column-reverse',
                  alignItems: 'end',
                  alignSelf: 'center',
                }}
              >
                <IconButton aria-label="delete" size="small" onClick={() => {handleDelete(id)}}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="create" size="small" onClick={() => {handleEdit(id)}}>
                  <CreateIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
          )
        })}
        </Grid>
      </Grid>

      <Modal open={show} onClose={handleClose} sx={{ overflow: "scroll" }}>
        <Box sx={style}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Edukacja
          </Typography>
          <Grid container>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { my: 1, width: "100%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Szkoła / Uniwersytet"
                sx={{ width: "100%" }}
                required
                type="text"
                placeholder="np: Wyższa Szkoła w Lubline"
                name="institute"
                value={form.institute}
                onChange={handleForm}
                error={validated && form.institute === ""}
              />

              <TextField
                label="Tytuł"
                sx={{ width: "100%" }}
                required
                type="text"
                placeholder="np: Geografia"
                name="fieldOfStudy"
                value={form.fieldOfStudy}
                onChange={handleForm}
                error={validated && form.fieldOfStudy === ""}
              />

              <TextField
                label="Rodzaj studiów"
                sx={{ width: "100%" }}
                required
                type="text"
                placeholder="np: Magister"
                name="degree"
                value={form.degree}
                onChange={handleForm}
                error={validated && form.degree === ""}
              />

            </Box>
            <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="caption">Start Rok</Typography>
              <FormControl fullWidth sx={{ my: 1 }}>
                <InputLabel id="startYear">Start Rok</InputLabel>
                <Select
                  labelId="startYear"
                  name="startYear"
                  value={form.startYear}
                  label="Start Miesiąc"
                  onChange={handleForm}
                  sx={{ width: "100%" }}
                >
                  <MenuItem value="" key="0">
                    Rok
                  </MenuItem>
                  {years.map((year, index) => {
                    return (
                      <MenuItem key={index + 1} value={year}>
                        {year}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption">
                Zakończenie Rok
              </Typography>
              <FormControl fullWidth sx={{ my: 1 }}>
                <InputLabel id="endYear">Zakończenie Rok</InputLabel>
                <Select
                  labelId="endYear"
                  name="endYear"
                  value={form.endYear}
                  label="Zakończenie Rok"
                  onChange={handleForm}
                  sx={{ width: "100%" }}
                >
                  <MenuItem value="" key="0">
                    Rok
                  </MenuItem>
                  {years.map((year, index) => {
                    return (
                      <MenuItem key={index + 1} value={year}>
                        {year}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            </Grid>
          </Grid>

          <TextField
            label="Ocena"
            sx={{ width: "100%", mt: "40px" }}
            required
            type="text"
            placeholder="np. 4/5"
            name="grade"
            value={form.grade}
            onChange={handleForm}
            error={validated && form.grade === ""}
          />


          <Button variant="outlined" onClick={handleSubmit} sx={{ mt: "10px" }}>
            Zapisz zmiany
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default Education