import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Grid, Typography, Button, FormHelperText } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CreateIcon from "@mui/icons-material/Create";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  addExperience,
  editExperience,
  removeExperience,
} from "../../../Slices/resume";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller, FormProvider } from "react-hook-form";

function Experience() {
  const experienceList = useSelector((state) => state.resume.experienceList);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [Alert, setAlert] = useState(false);
  // const [deleteId, setDeleteId] = useState(null);

  const [experienceData, setExperienceData] = useState({
    title: "",
    company: "",
    isWorking: false,
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    location: "",
    description: "",
    isEdit: false,
  });

  const handleClose = () => {
    setShow(false);
    setExperienceData({
      id: "",
      title: "",
      company: "",
      isWorking: false,
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      location: "",
      description: "",
      isEdit: false,
    });
  };
  const handleShow = () => setShow(true);

  const ExperienceSchema = yup.object().shape({
    title: yup
      .string()
      .required("Stanowisko jest wymagane")
      .min(3, "Stanowisko jest za krótkie"),
    company: yup
      .string()
      .required("Pole firma jest wymagane")
      .min(3, "Pole firma jest za krótkie"),
    location: yup
      .string()
      .required("Lokalizacja jest wymagana")
      .min(3, "Lokalizacja jest za krótka"),
    description: yup
      .string()
      .required("Opis jest wymagany")
      .min(3, "Opis jest za krótki"),
    startMonth: yup.string().required("Miesiąc jest wymagany"),
    endMonth: yup.string().required("Miesiąc jest wymagany"),
    startYear: yup.string().required("Rok jest wymagany"),
    endYear: yup.string().required("Rok jest wymagany"),
    // date: yup.string().required("Data jest wymagana"),
  });

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(ExperienceSchema),
    // defaultValues: {
    //   // id: "",
    //   title: "",
    //   company: "",
    //   isWorking: false,
    //   startMonth: "",
    //   startYear: "",
    //   endMonth: "",
    //   endYear: "",
    //   location: "",
    //   description: "",
    //   isEdit: false,
    // },
  });

  const year = new Date().getFullYear();
  const years = Array.from(new Array(20), (val, index) => index - 10 + year);

  const onSubmit = (data) => {
    console.log(data);
    console.log("submited", experienceData);
    console.log("submited data", data);
    if (experienceData.isEdit) {
      dispatch(editExperience({ ...experienceData, ...data }));
    } else {
      dispatch(addExperience(data));
    }
    setShow(false);
    setExperienceData({
      id: "",
      title: "",
      company: "",
      isWorking: false,
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      location: "",
      description: "",
      isEdit: false,
    });
  };

  const handleEdit = (id) => {
    const form = experienceList[id];
    setExperienceData({ ...form, isEdit: true, id: id });
    console.log("IF HANDLE EDIT", { ...form, isEdit: true, id: id });
    console.log("IF HANDLE EDIT DSDSDSDSDS", experienceData);

    setShow(true);
  };

  const handleDelete = (id) => {
    dispatch(removeExperience(id));
    setAlert(false);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
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

  // const onSubmit = (data) => console.log(data);
  const onError = (error) => console.log(error);

  return (
    <>
      <Item>
        <Grid container>
          <Grid sx={{ alignSelf: "center", flexGrow: 1 }}>
            <Typography variant="h6">Doświadczenie</Typography>
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
          {experienceList.map((item, id) => {
            return (
              <Paper
                elevation={0}
                key={id}
                sx={{
                  p: 2,
                  bgcolor: "background.default",
                  // height: "100px",
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
                      {item.company} • {item.startMonth} {item.startYear}
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
                  <Grid
                    item
                    sm={4}
                    sx={{
                      display: "flex",
                      flexFlow: "column-reverse",
                      alignItems: "end",
                      alignSelf: "center",
                    }}
                  >
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => {
                        handleDelete(id);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label="create"
                      size="small"
                      onClick={() => {
                        handleEdit(id);
                      }}
                    >
                      <CreateIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
        </Grid>
      </Grid>

      <Modal open={show} onClose={handleClose} sx={{ overflow: "scroll" }}>
        <Box sx={style}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Doświadczenie
          </Typography>
          <FormProvider {...form}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { my: 1, width: "100%" },
              }}
              noValidate
              autoComplete="off"
              onSubmit={form.handleSubmit(onSubmit, onError)}
            >
              <Grid container spacing={0}>
                <Controller
                  name="title"
                  defaultValue={experienceData.title}
                  rules={{ required: true }}
                  shouldUnregister="true"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <>
                      {console.log(
                        value,
                        error !== undefined ? error.message : null
                      )}
                      <TextField
                        label="Tytuł"
                        placeholder="np. Kucharz"
                        value={value}
                        onChange={onChange}
                        helperText={error && error.message}
                        error={error !== undefined}
                        sx={{ width: "100%" }}
                      />
                    </>
                  )}
                />

                <Controller
                  name="company"
                  defaultValue={experienceData.company}
                  rules={{ required: true }}
                  shouldUnregister="true"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="Nazwa firmy"
                      placeholder="np. Restauracja Roma"
                      value={value}
                      onChange={onChange}
                      helperText={error && error.message}
                      error={error !== undefined}
                      sx={{ width: "100%" }}
                    />
                  )}
                />

                <FormControlLabel
                  control={<Checkbox checked={experienceData.isWorking} />}
                  name="isWorking"
                  label="Aktualnie pracuję na tym stanowisku"
                  // onChange={handleForm}
                />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption">
                      Start Miesiąc - Rok
                    </Typography>

                    <Controller
                      name="startMonth"
                      rules={{ required: true }}
                      render={({
                        field: { value, onChange },
                        fieldState: { error },
                      }) => (
                        <>
                          {console.log(value, error)}
                          <FormControl
                            fullWidth
                            sx={{ my: 1 }}
                            error={error && true}
                          >
                            <InputLabel id="startMonth">
                              Start Miesiąc
                            </InputLabel>
                            <Select
                              defaultValue={experienceData.startMonth}
                              labelId="startMonth"
                              label="Start Miesiąc"
                              onChange={onChange}
                              sx={{ width: "100%" }}
                            >
                              <MenuItem value="Styczeń">Styczeń</MenuItem>
                              <MenuItem value="Luty">Luty</MenuItem>
                              <MenuItem value="Marzec">Marzec</MenuItem>
                              <MenuItem value="Kwiecień">Kwiecień</MenuItem>
                              <MenuItem value="Maj">Maj</MenuItem>
                              <MenuItem value="Czerwiec">Czerwiec</MenuItem>
                              <MenuItem value="Lipiec">Lipiec</MenuItem>
                              <MenuItem value="Sierpień">Sierpień</MenuItem>
                              <MenuItem value="Wrzesień">Wrzesień</MenuItem>
                              <MenuItem value="Październik">
                                Październik
                              </MenuItem>
                              <MenuItem value="Listopad">Listopad</MenuItem>
                              <MenuItem value="Grudzień">Grudzień</MenuItem>
                            </Select>
                            {error && (
                              <FormHelperText>{error.message}</FormHelperText>
                            )}
                          </FormControl>
                        </>
                      )}
                    />

                    <Controller
                      name="startYear"
                      rules={{ required: true }}
                      render={({
                        field: { value, onChange },
                        fieldState: { error },
                      }) => (
                        <>
                          {console.log(value, error)}
                          <FormControl
                            fullWidth
                            sx={{ my: 1 }}
                            error={error && true}
                          >
                            <InputLabel id="startYear">Start Rok</InputLabel>
                            <Select
                              defaultValue={experienceData.startYear}
                              labelId="startYear"
                              label="Start Rok"
                              onChange={onChange}
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
                            {error && (
                              <FormHelperText>{error.message}</FormHelperText>
                            )}
                          </FormControl>
                        </>
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="caption">
                      Zakończenie Miesiąc - Rok
                    </Typography>

                    <Controller
                      name="endMonth"
                      rules={{ required: true }}
                      render={({
                        field: { value, onChange },
                        fieldState: { error },
                      }) => (
                        <>
                          {console.log(value, error)}
                          <FormControl
                            fullWidth
                            sx={{ my: 1 }}
                            error={error && true}
                          >
                            <InputLabel id="endMonth">Start Miesiąc</InputLabel>
                            <Select
                              defaultValue={experienceData.endMonth}
                              labelId="endMonth"
                              label="Zakończenie Miesiąc"
                              onChange={onChange}
                              sx={{ width: "100%" }}
                            >
                              <MenuItem value="Styczeń">Styczeń</MenuItem>
                              <MenuItem value="Luty">Luty</MenuItem>
                              <MenuItem value="Marzec">Marzec</MenuItem>
                              <MenuItem value="Kwiecień">Kwiecień</MenuItem>
                              <MenuItem value="Maj">Maj</MenuItem>
                              <MenuItem value="Czerwiec">Czerwiec</MenuItem>
                              <MenuItem value="Lipiec">Lipiec</MenuItem>
                              <MenuItem value="Sierpień">Sierpień</MenuItem>
                              <MenuItem value="Wrzesień">Wrzesień</MenuItem>
                              <MenuItem value="Październik">
                                Październik
                              </MenuItem>
                              <MenuItem value="Listopad">Listopad</MenuItem>
                              <MenuItem value="Grudzień">Grudzień</MenuItem>
                            </Select>
                            {error && (
                              <FormHelperText>{error.message}</FormHelperText>
                            )}
                          </FormControl>
                        </>
                      )}
                    />

                    <Controller
                      name="endYear"
                      rules={{ required: true }}
                      render={({
                        field: { value, onChange },
                        fieldState: { error },
                      }) => (
                        <>
                          {console.log(value, error)}
                          <FormControl
                            fullWidth
                            sx={{ my: 1 }}
                            error={error && true}
                          >
                            <InputLabel id="endYear">
                              Zakończenie Rok
                            </InputLabel>
                            <Select
                              defaultValue={experienceData.endYear}
                              labelId="endYear"
                              label="Zakończenie Rok"
                              onChange={onChange}
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
                            {error && (
                              <FormHelperText>{error.message}</FormHelperText>
                            )}
                          </FormControl>
                        </>
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Controller
                name="location"
                defaultValue={experienceData.location}
                rules={{ required: true }}
                shouldUnregister="true"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Lokalizacja"
                    placeholder="np. Lublin, Polska"
                    // {...field}
                    value={value}
                    onChange={onChange}
                    helperText={error && error.message}
                    error={error !== undefined}
                    sx={{ width: "100%", mt: "15px" }}
                  />
                )}
              />

              <Controller
                name="description"
                defaultValue={experienceData.description}
                rules={{ required: true }}
                shouldUnregister="true"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Opis"
                    placeholder="np. Pracuje jako przedstawiciel handlowy"
                    value={value}
                    onChange={onChange}
                    helperText={error && error.message}
                    error={error !== undefined}
                    sx={{ width: "100%", mt: "15px" }}
                  />
                )}
              />

              <Button variant="outlined" type="submit" sx={{ mt: "10px" }}>
                Zapisz zmiany
              </Button>
            </Box>
          </FormProvider>
        </Box>
      </Modal>
    </>
  );
}

export default Experience;

// WORKING VERSION

// import React, { Component, useEffect, useState } from "react";
// // import Row from 'react-bootstrap/Row';
// // import Col from 'react-bootstrap/Col';
// // import { MdAddCircleOutline, MdEdit, MdClose, MdDelete } from 'react-icons/md';
// // import { HiOfficeBuilding } from 'react-icons/hi';
// // import Modal from 'react-bootstrap/Modal';
// // import Form from 'react-bootstrap/Form';
// // import { ImCheckmark, ImCross } from 'react-icons/im'
// // import Months from '../smallComponents/Months';
// // import Years from '../smallComponents/Years';
// import { useSelector, useDispatch } from "react-redux";

// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
// import { Grid, Typography, Button } from "@mui/material";
// import Fab from "@mui/material/Fab";
// import AddIcon from "@mui/icons-material/Add";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import FormControl from "@mui/material/FormControl";
// import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
// import CreateIcon from "@mui/icons-material/Create";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import {
//   addExperience,
//   editExperience,
//   removeExperience,
// } from "../../../Slices/resume";

// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useForm, Controller, FormProvider } from "react-hook-form";

// const ExperienceSchema = yup.object().shape({
//   title: yup
//     .string()
//     .required("Stanowisko jest wymagane")
//     .min(3, "Stanowisko jest za krótkie"),
//   company: yup
//     .string()
//     .required("Pole firma jest wymagane")
//     .min(3, "Pole firma jest za krótkie"),
//   location: yup
//     .string()
//     .required("Lokalizacja jest wymagana")
//     .min(3, "Lokalizacja jest za krótka"),
//   description: yup
//     .string()
//     .required("Opis jest wymagany")
//     .min(3, "Opis jest za krótki"),
//   date: yup.string().required("Data jest wymagana"),
// });

// function Experience() {
//   const form = useForm({
//     resolver: yupResolver(ExperienceSchema),
//     defaultValues: {
//       title: "",
//     },
//   });

//   const onSubmit = (data) => console.log(data);
//   const onError = (error) => console.log(error);

//   return (
//     <FormProvider {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit, onError)}>
//         <Controller
//           name="title"
//           // control={control}
//           defaultValue={"fds"}
//           rules={{ required: true }}
//           shouldUnregister="true"
//           render={({ field: { value, errors } }) => (
//             <TextField
//               label="Tytuł"
//               placeholder="np. Kucharz"
//               // {...field}
//               value={value}
//               // helperText={errors.title && errors.title.message}
//               // error={errors.title !== undefined}
//               sx={{ width: "100%" }}
//             />
//           )}
//         />
//         <Button variant="contained" color="primary" type="submit" />
//       </form>
//     </FormProvider>
//   );
// }

// export default Experience;

// OLD VERSION

// import React, { useState } from 'react'
// // import Row from 'react-bootstrap/Row';
// // import Col from 'react-bootstrap/Col';
// // import { MdAddCircleOutline, MdEdit, MdClose, MdDelete } from 'react-icons/md';
// // import { HiOfficeBuilding } from 'react-icons/hi';
// // import Modal from 'react-bootstrap/Modal';
// // import Form from 'react-bootstrap/Form';
// // import { ImCheckmark, ImCross } from 'react-icons/im'
// // import Months from '../smallComponents/Months';
// // import Years from '../smallComponents/Years';
// import { useSelector, useDispatch } from 'react-redux';

// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
// import { Grid, Typography, Button } from "@mui/material";
// import Fab from "@mui/material/Fab";
// import AddIcon from "@mui/icons-material/Add";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import FormControl from '@mui/material/FormControl';
// import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
// import CreateIcon from '@mui/icons-material/Create';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { addExperience, editExperience, removeExperience } from '../../../Slices/resume';

// function Experience({updateRes}) {

//   const experienceList = useSelector(state => state.resume.experienceList)
//   const dispatch = useDispatch();
//   // const {addExperience, editExperience, removeExperience} = bindActionCreators(actionCreators, dispatch);

//   const [show, setShow] = useState(false);
//   const [Alert, setAlert] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   const handleClose = () => {
//     setValidated(false);
//     setShow(false);
//     setForm({
//       id:"",
//       title: "",
//       company: "",
//       isWorking: false,
//       startMonth: "",
//       startYear: "",
//       endMonth: "",
//       endYear: "",
//       location: "",
//       description: "",
//       isEdit: false
//     })
//   }
//   const handleShow = () => setShow(true);
//   const handleAlertClose = () => setAlert(false);
//   const handleAlert = (id) => {
//     console.log(id)
//     setDeleteId(id)
//     setAlert(true);
//   }

//   // const [list, setList] = useState([]);
//   const [form, setForm] = useState({
//     id:"",
//     title: "",
//     company: "",
//     isWorking: false,
//     startMonth: "",
//     startYear: "",
//     endMonth: "",
//     endYear: "",
//     location: "",
//     description: "",
//     isEdit:false
//   });
//   const handleForm = (e) => {
//     setForm((old) => {
//       return {
//         ...old,
//         [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
//       }
//     })
//   }

//   const year = (new Date()).getFullYear();
//     const years = Array.from(new Array(20),( val, index) => index -10 + year);

//   const [validated, setValidated] = useState(false);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const valid = event.currentTarget;
//     if(!valid.checkValidity()){
//       setValidated(true);
//     }
//     else{
//       if(form.isEdit){
//         dispatch(editExperience(form));
//       }
//       else{
//         dispatch(addExperience(form))
//       }
//       setShow(false);
//       setForm({
//         id:"",
//         title: "",
//         company: "",
//         isWorking: false,
//         startMonth: "",
//         startYear: "",
//         endMonth: "",
//         endYear: "",
//         location: "",
//         description: "",
//         isEdit: false
//       })
//     }
//   }

//   const handleEdit = (id) => {
//     const form = experienceList[id];
//     // form.isEdit = true;
//     // form.id = id
//     setForm({...form, isEdit: true, id: id})
//     setShow(true);
//   }

//   const handleDelete = (id) => {
//     dispatch(removeExperience(id));
//     // list.splice(id, 1);
//     // setList(list);
//     setAlert(false);
//   }

//   const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     backgroundColor: "#f8f9fa",
//     paddingTop: "15px",
//     paddingBottom: "15px",
//     textAlign: "left",
//     color: theme.palette.text.secondary,
//   }));

//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 400,
//     bgcolor: "background.paper",
//     boxShadow: 24,
//     p: 4,
//   };

//   return (
//     <>
//       <Item>
//         <Grid container>
//           <Grid sx={{ alignSelf: "center", flexGrow: 1 }}>
//             <Typography variant="h6">Doświadczenie</Typography>
//           </Grid>
//           <Grid justifyContent="flex-end">
//             <Fab
//               size="small"
//               color="primary"
//               aria-label="add"
//               onClick={handleShow}
//             >
//               <AddIcon />
//             </Fab>
//           </Grid>
//         </Grid>
//       </Item>

//       <Grid container >
//         <Grid sx={{ alignSelf: "center", flexGrow: 1 }}>
//         {experienceList.map((item, id) => {
//           return (
//           <Paper
//             elevation={0}
//             key={id}
//             sx={{
//               p: 2,
//               bgcolor: "background.default",
//               // height: "100px",
//               borderBottom: '1px solid #555',
//               borderRadius: 0,
//             }}
//           >
//             <Grid container spacing={2}>
//               <Grid item sm={2} sx={{alignSelf: 'center'}}>
//                 <WorkOutlineIcon fontSize='large' sx={{color: '#d2ab67'}}/>

//               </Grid>
//               <Grid item xs={6} sx={{alignSelf: 'center'}}>
//               <Typography variant='h6' >{item.title}</Typography>
//               <Typography variant="h7" display="block" gutterBottom sx={{mb: 0}}>
//               {item.company} • {item.startMonth} {item.startYear}
//       {`${
//                       item.isWorking
//                         ? " - Present"
//                         : " - " + item.endMonth + " " + item.endYear
//                     }`}
//       </Typography>
//       <Typography variant="caption" display="block" gutterBottom sx={{mb: 0}}>
//       {item.location}
//       </Typography>
//       <Typography variant="caption" display="block" gutterBottom sx={{mb: 0}}>
//       {item.description}
//       </Typography>
//               </Grid>
//               <Grid
//                 item
//                 sm={4}
//                 sx={{
//                   display: 'flex',
//                   flexFlow: 'column-reverse',
//                   alignItems: 'end',
//                   alignSelf: 'center',
//                 }}
//               >
//                 <IconButton aria-label="delete" size="small" onClick={() => {handleDelete(id)}}>
//                   <DeleteIcon fontSize="small" />
//                 </IconButton>
//                 <IconButton aria-label="create" size="small" onClick={() => {handleEdit(id)}}>
//                   <CreateIcon fontSize="small" />
//                 </IconButton>
//               </Grid>
//             </Grid>
//           </Paper>
//           )
//         })}
//         </Grid>
//       </Grid>

//       <Modal open={show} onClose={handleClose} sx={{ overflow: "scroll" }}>
//         <Box sx={style}>
//           <Typography variant="h4" sx={{ mb: 2 }}>
//             Doświadczenie
//           </Typography>
//           <Grid container spacing={0}>
//             <Box
//               component="form"
//               sx={{
//                 "& .MuiTextField-root": { my: 1, width: "100%" },
//               }}
//               noValidate
//               autoComplete="off"
//             >
//               <TextField
//                 label="Tytuł"
//                 sx={{ width: "100%" }}
//                 required
//                 type="text"
//                 placeholder="np. Kucharz"
//                 name="title"
//                 value={form.title}
//                 onChange={handleForm}
//                 error={validated && form.title === ""}
//               />

//               <TextField
//                 label="Nazwa firmy"
//                 sx={{ width: "100%" }}
//                 required
//                 type="text"
//                 placeholder="np. Restauracja Roma"
//                 name="company"
//                 value={form.company}
//                 onChange={handleForm}
//                 error={validated && form.company === ""}
//               />

//               <FormControlLabel
//                 control={<Checkbox checked={form.isWorking} />}
//                 name="isWorking"
//                 label="Aktualnie pracuję na tym stanowisku"
//                 onChange={handleForm}
//               />
//             </Box>
//             <Grid container spacing={2}>
//             <Grid item xs={6} >
//               <Typography variant="caption">Start Miesiąc - Rok</Typography>
//               <FormControl fullWidth sx={{ my: 1 }}>
//                 <InputLabel id="startMonth">Start Miesiąc</InputLabel>
//                 <Select
//                   labelId="startMonth"
//                   name="startMonth"
//                   value={form.startMonth}
//                   label="Start Miesiąc"
//                   onChange={handleForm}
//                   sx={{ width: "100%" }}
//                 >
//                   <MenuItem value="Styczeń">Styczeń</MenuItem>
//                   <MenuItem value="Luty">Luty</MenuItem>
//                   <MenuItem value="Marzec">Marzec</MenuItem>
//                   <MenuItem value="Kwiecień">Kwiecień</MenuItem>
//                   <MenuItem value="Maj">Maj</MenuItem>
//                   <MenuItem value="Czerwiec">Czerwiec</MenuItem>
//                   <MenuItem value="Lipiec">Lipiec</MenuItem>
//                   <MenuItem value="Sierpień">Sierpień</MenuItem>
//                   <MenuItem value="Wrzesień">Wrzesień</MenuItem>
//                   <MenuItem value="Październik">Październik</MenuItem>
//                   <MenuItem value="Listopad">Listopad</MenuItem>
//                   <MenuItem value="Grudzień">Grudzień</MenuItem>
//                 </Select>
//               </FormControl>
//               <FormControl fullWidth sx={{ my: 1 }}>
//                 <InputLabel id="startYear">Start Rok</InputLabel>
//                 <Select
//                   labelId="startYear"
//                   name="startYear"
//                   value={form.startYear}
//                   label="Start Miesiąc"
//                   onChange={handleForm}
//                   sx={{ width: "100%" }}
//                 >
//                   <MenuItem value="" key="0">
//                     Rok
//                   </MenuItem>
//                   {years.map((year, index) => {
//                     return (
//                       <MenuItem key={index + 1} value={year}>
//                         {year}
//                       </MenuItem>
//                     );
//                   })}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="caption">
//                 Zakończenie Miesiąc - Rok
//               </Typography>
//               <FormControl fullWidth sx={{ my: 1 }}>
//                 <InputLabel id="endMonth">Zakończenie Miesiąc</InputLabel>
//                 <Select
//                   labelId="endMonth"
//                   name="endMonth"
//                   value={form.endMonth}
//                   label="Zakończenie Miesiąc"
//                   onChange={handleForm}
//                   sx={{ width: "100%" }}
//                 >
//                   <MenuItem value="Styczeń">Styczeń</MenuItem>
//                   <MenuItem value="Luty">Luty</MenuItem>
//                   <MenuItem value="Marzec">Marzec</MenuItem>
//                   <MenuItem value="Kwiecień">Kwiecień</MenuItem>
//                   <MenuItem value="Maj">Maj</MenuItem>
//                   <MenuItem value="Czerwiec">Czerwiec</MenuItem>
//                   <MenuItem value="Lipiec">Lipiec</MenuItem>
//                   <MenuItem value="Sierpień">Sierpień</MenuItem>
//                   <MenuItem value="Wrzesień">Wrzesień</MenuItem>
//                   <MenuItem value="Październik">Październik</MenuItem>
//                   <MenuItem value="Listopad">Listopad</MenuItem>
//                   <MenuItem value="Grudzień">Grudzień</MenuItem>
//                 </Select>
//               </FormControl>
//               <FormControl fullWidth sx={{ my: 1 }}>
//                 <InputLabel id="endYear">Zakończenie Rok</InputLabel>
//                 <Select
//                   labelId="endYear"
//                   name="endYear"
//                   value={form.endYear}
//                   label="Zakończenie Rok"
//                   onChange={handleForm}
//                   sx={{ width: "100%" }}
//                 >
//                   <MenuItem value="" key="0">
//                     Rok
//                   </MenuItem>
//                   {years.map((year, index) => {
//                     return (
//                       <MenuItem key={index + 1} value={year}>
//                         {year}
//                       </MenuItem>
//                     );
//                   })}
//                 </Select>
//               </FormControl>
//             </Grid>
//             </Grid>
//           </Grid>

//           <TextField
//             label="Lokalizacja"
//             sx={{ width: "100%", mt: "40px" }}
//             required
//             type="text"
//             placeholder="np. Lublin, Polska"
//             name="location"
//             value={form.location}
//             onChange={handleForm}
//             error={validated && form.location === ""}
//           />
//           <TextField
//             label="Opis"
//             sx={{ width: "100%", mt: "15px", mb: "20px" }}
//             required
//             type="text"
//             placeholder="np. Pracuje jako przedstawiciel handlowy"
//             name="description"
//             value={form.description}
//             onChange={handleForm}
//             error={validated && form.description === ""}
//           />

//           <Button variant="outlined" onClick={handleSubmit} sx={{ mt: "10px" }}>
//             Zapisz zmiany
//           </Button>
//         </Box>
//       </Modal>
//     </>
//   );
// }

// export default Experience
