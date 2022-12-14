// import React, { useState  } from 'react'
// import { useSelector, useDispatch } from 'react-redux';

// import Grid from '@mui/material/Grid';
// import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import LanguageIcon from '@mui/icons-material/Language';
// import EmailIcon from '@mui/icons-material/Email';
// import PhoneIcon from '@mui/icons-material/Phone';
// import RoomIcon from '@mui/icons-material/Room';
// import WorkIcon from '@mui/icons-material/Work';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
// import { Button, Typography } from '@mui/material';

// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import TextField from '@mui/material/TextField';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import { manageFile, manageProfile } from '../../../Slices/resume';
// import useMediaQuery from '@mui/material/useMediaQuery';

// import randomLogo from '../../../assets/profile.png'

// function Profile() {

//     const profile = useSelector(state => state.resume.profile)
//     const file = useSelector(state => state.resume.file)
//     const dispatch = useDispatch();

//     const mobileView = useMediaQuery('(max-width:425px)');
//     console.log(mobileView)

//     // const {manageProfile, manageFile} = bindActionCreators(actionCreators, dispatch);

//     // const [file, setFile] = useState("./images/profile.jpg");
//     function handleFile(e) {
//         dispatch(manageFile(URL.createObjectURL(e.target.files[0])));
//         // setFile(URL.createObjectURL(e.target.files[0]));
//     }
//     // const [profile,setProfile] = useState({
//     //     name: "Your Name",
//     //     location: "City, Name",
//     //     github: "",
//     //     linkedin: "",
//     //     website: "",
//     //     position: "Your Position",
//     //     tagline: "Describe yourself in one line"
//     // })

//     const handleProfile = (e) => {
//         dispatch(manageProfile({
//                     ...profile,
//                     [e.target.name]:e.target.value
//                 }))
//         // setProfile((old)=>{
//         //     return {
//         //         ...old,
//         //         [e.target.name]:e.target.value
//         //     }
//         // })
//     }

//   const [show, setShow] = useState(false);
//   const [alert, setAlert] = useState(false);
//   const [profileName, setProfileName] = useState("");
//   const [profileURL, setProfileURL] = useState("");

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
//     const handleAlertHide = () => {
//         setProfileName("");
//         setProfileURL("");
//         setAlert(false)
//     };
//     const handleAlertShow = (Profile,Link) => {
//         setProfileName(Profile);
//         setProfileURL(Link);
//         setAlert(true)
//     };

//     const style = {
//         position: "absolute",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         width: 400,
//         bgcolor: "background.paper",
//         boxShadow: 24,
//         p: 4,
//         mt: 18,
//       };

//   return (
//     <>
//       <Grid container spacing={2}>
//         <Grid container className="justify-content-between img-column">
//           <Grid item xs={6} sx={mobileView && {textAlign: '-webkit-center', marginTop: '30px'}}>
//             {file ? (
//               <img src={file} className="profile-image" alt="Profile image"></img>
//             ) : (
//               <img src={randomLogo} className="profile-image" alt="Profile image"></img>
//             )}
//           </Grid>
//           <Grid item xs={6} sx={{ textAlign: "right" }}>
//             <IconButton
//               color="primary"
//               aria-label="add an alarm"
//               onClick={handleShow}
//               sx={{ backgroundColor: "#ebebeb", mt: "25px" }}
//             >
//               <EditIcon />
//             </IconButton>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid container>
//         <Grid item xs={12} sm={6} md={8}>
//           <Grid item xs={12}>
//             <h4 style={{ marginLeft: "180px" }}>{profile.name}</h4>
//           </Grid>
//           <Grid item xs={12}>
//             <Grid container sx={{ my: 2 }}>
//               <RoomIcon sx={{ mr: 3 }} />
//               <Typography>{profile.location}</Typography>
//             </Grid>
//             <Divider sx={{ width: "50%" }} />
//             <Grid container sx={{ my: 2 }}>
//               <WorkIcon sx={{ mr: 3 }} />
//               <Typography>{profile.position}</Typography>
//             </Grid>
//           </Grid>
//           <Divider sx={{ width: "50%" }} />
//           <Grid item xs={12}>
//             <Typography sx={mobileView ? { my: 6, textAlign: 'center' } : { my: 2 }}>{profile.tagline}</Typography>
//             <Divider sx={{ width: "100%" }} />
//           </Grid>
//         </Grid>
//         <Grid item xs={12} sm={6} md={4} sx={{ alignSelf: "center" }}>
//           <Stack direction="row" spacing={1} sx={mobileView ? {justifyContent: 'center', paddingBottom: "15px"}:{ paddingBottom: "15px" }}>
//             <Chip
//               icon={<LinkedInIcon />}
//               label="LinkedIn"
//               onClick={() =>
//                 handleAlertShow("Profil LinkedIn", profile.linkedin)
//               }
//             />
//             <Chip
//               icon={<FacebookIcon />}
//               label="Facebook"
//               onClick={() =>
//                 handleAlertShow("Profil Facebook", profile.facebook)
//               }
//             />
//             <Chip
//               icon={<LanguageIcon />}
//               label="Portfolio"
//               onClick={() => handleAlertShow("Portfolio", profile.website)}
//             />
//           </Stack>
//           <Stack direction="row" spacing={1} sx={mobileView && {justifyContent: 'center'}}>
//             <Chip
//               icon={<EmailIcon />}
//               label="Adres Email"
//               onClick={() => handleAlertShow("Adres Email", profile.email)}
//             />
//             <Chip
//               icon={<PhoneIcon />}
//               label="Numer kontaktowy"
//               onClick={() =>
//                 handleAlertShow("Numer kontaktowy", profile.contact)
//               }
//             />
//           </Stack>
//         </Grid>
//       </Grid>

//       <Modal open={show} onClose={handleClose} sx={{ overflow: "scroll" }}>
//         <Box sx={style}>
//           <Typography variant="h4" sx={{ mb: 2 }}>
//             Szczego??y profilu
//           </Typography>
//           <Grid container>
//             <Grid item xs={12}>
//               <TextField
//                 label="Twoje imi??"
//                 sx={{ width: "100%", mb: 3 }}
//                 required
//                 type="text"
//                 placeholder="Wpisz swoje imi??..."
//                 name="name"
//                 value={profile.name}
//                 onChange={handleProfile}
//                 // error={validated && profile.name === ""}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Miasto, Kraj"
//                 sx={{ width: "100%", mb: 3 }}
//                 required
//                 type="text"
//                 placeholder="Miasto, Kraj"
//                 name="location"
//                 value={profile.location}
//                 onChange={handleProfile}
//                 // error={validated && profile.name === ""}
//               />
//               <TextField
//                 label="Twoje stanowisko"
//                 sx={{ width: "100%", mb: 3 }}
//                 required
//                 type="text"
//                 placeholder="Twoje stanowisko"
//                 name="position"
//                 value={profile.position}
//                 onChange={handleProfile}
//                 // error={validated && profile.name === ""}
//               />
//               <TextField
//                 label="Opisz siebie w jednym zdaniu"
//                 sx={{ width: "100%", mb: 3 }}
//                 required
//                 type="text"
//                 placeholder="Opisz siebie w jednym zdaniu"
//                 name="tagline"
//                 value={profile.tagline}
//                 onChange={handleProfile}
//                 // error={validated && profile.name === ""}
//               />
//               <TextField
//                 label="Adres email"
//                 sx={{ width: "100%", mb: 3 }}
//                 required
//                 type="email"
//                 placeholder="Adres email"
//                 name="email"
//                 value={profile.email}
//                 onChange={handleProfile}
//                 // error={validated && profile.name === ""}
//               />
//               <TextField
//                 label="Numer kontaktowy"
//                 sx={{ width: "100%", mb: 3 }}
//                 required
//                 type="number"
//                 placeholder="Numer kontaktowy"
//                 name="contact"
//                 value={profile.contact}
//                 onChange={handleProfile}
//                 // error={validated && profile.name === ""}
//               />
//               <TextField
//                 label="LinkedIn Profile"
//                 sx={{ width: "100%", mb: 3 }}
//                 required
//                 type="text"
//                 placeholder="LinkedIn Profile"
//                 name="linkedin"
//                 value={profile.github}
//                 onChange={handleProfile}
//                 // error={validated && profile.name === ""}
//               />
//               <TextField
//                 label="Facebook Profile"
//                 sx={{ width: "100%", mb: 3 }}
//                 required
//                 type="text"
//                 placeholder="Facebook Profile"
//                 name="facebook"
//                 value={profile.facebook}
//                 onChange={handleProfile}
//                 // error={validated && profile.name === ""}
//               />
//               <TextField
//                 label="Your Portfolio Website"
//                 sx={{ width: "100%", mb: 3 }}
//                 required
//                 type="text"
//                 placeholder="Your Portfolio Website"
//                 name="website"
//                 value={profile.website}
//                 onChange={handleProfile}
//                 // error={validated && profile.name === ""}
//               />
//               <IconButton
//                 color="primary"
//                 aria-label="upload picture"
//                 component="label"
//               >
//                 <input
//                   hidden
//                   accept="image/*"
//                   type="file"
//                   onChange={handleFile}
//                 />
//                 <PhotoCamera />
//                 <Typography sx={{ ml: 2 }}>
//                   Wybierz zdj??cie profilowe
//                 </Typography>
//               </IconButton>

//               <Grid item xs={12} sx={{ mt: "30px" }}>
//                 <Button variant="outlined" onClick={handleClose}>
//                   Zapisz zmiany
//                 </Button>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Box>
//       </Modal>
//       <Modal open={alert} onClose={handleAlertHide}>
//         <Box sx={style}>
//           <Typography variant="h4" sx={{ mb: 2 }}>
//             {profileName}
//           </Typography>
//           <Typography variant="h7" sx={{ mb: 2 }}>
//             Link: {profileURL}
//           </Typography>
//         </Box>
//       </Modal>
//     </>
//   );
// }

// export default Profile



























import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import RoomIcon from "@mui/icons-material/Room";
import WorkIcon from "@mui/icons-material/Work";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Typography } from "@mui/material";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { manageFile, manageProfile } from "../../../Slices/resume";
import useMediaQuery from "@mui/material/useMediaQuery";

import randomLogo from "../../../assets/profile.png";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";

function Profile() {
  const profile = useSelector((state) => state.resume.profile);
  const file = useSelector((state) => state.resume.file);
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState(profile);

  const mobileView = useMediaQuery("(max-width:425px)");

  const ProfileSchema = yup.object().shape({
    name: yup
      .string()
      .required("Imi?? jest wymagane")
      .min(3, "Imi?? jest za kr??tkie"),
    location: yup
      .string()
      .required("Miasto jest wymagane")
      .min(3, "Miasto jest za kr??tkie"),
    position: yup.string().required("Stanowisko jest wymagane").min(3, "Stanowisko jest za kr??tkie"),
    email: yup.string().required("Email jest wymagany").min(3, "Email jest za kr??tki").email("Wpisz prawid??owy adres Email"),
    phone: yup
      .string()
      .required("Numer jest wymagany")
      .matches(/^[0-9]+$/, "Numer musi by?? liczb??")
      .min(9, "Numer musi by?? 6 cyfrowy")
      .max(9, "Numer musi by?? 6 cyfrowy"),
    facebook: yup 
      .string()
      .url("Wpisz prawid??owy adres url"),
    linkedin: yup 
      .string()
      .url("Wpisz prawid??owy adres url"),
    website: yup 
      .string()
      .url("Wpisz prawid??owy adres url"),
  });

  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(ProfileSchema),
  });




  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      setProfileData(state => ({...state, ...value}))
    });

    return () => subscription.unsubscribe();
  }, [watch]);


  // const [file, setFile] = useState("./images/profile.jpg");
  function handleFile(e) {
    dispatch(manageFile(URL.createObjectURL(e.target.files[0])));
    // setFile(URL.createObjectURL(e.target.files[0]));
  }

  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileURL, setProfileURL] = useState("");

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleAlertHide = () => {
    setProfileName("");
    setProfileURL("");
    setAlert(false);
  };

  const handleAlertShow = (Profile, Link) => {
    setProfileName(Profile);
    setProfileURL(Link);
    setAlert(true);
  };


  const onSubmit = (e) => {
    e.preventDefault();
    
    if (Object.keys(errors).length === 0) {
      dispatch(
        manageProfile(profileData)
      );
      setShow(false);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    mt: 18,
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid container className="justify-content-between img-column">
          <Grid
            item
            xs={6}
            sx={
              mobileView && { textAlign: "-webkit-center", marginTop: "30px" }
            }
          >
            {file ? (
              <img
                src={file}
                className="profile-image"
                alt="Profile image"
              ></img>
            ) : (
              <img
                src={randomLogo}
                className="profile-image"
                alt="Profile image"
              ></img>
            )}
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "right" }}>
            <IconButton
              color="primary"
              aria-label="add an alarm"
              onClick={handleShow}
              sx={{ backgroundColor: "#ebebeb", mt: "25px" }}
            >
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={6} md={8}>
          <Grid item xs={12}>
            <h4 style={{ marginLeft: "180px" }}>{profile.name}</h4>
          </Grid>
          <Grid item xs={12}>
            <Grid container sx={{ my: 2 }}>
              <RoomIcon sx={{ mr: 3 }} />
              <Typography>{profile.location}</Typography>
            </Grid>
            <Divider sx={{ width: "50%" }} />
            <Grid container sx={{ my: 2 }}>
              <WorkIcon sx={{ mr: 3 }} />
              <Typography>{profile.position}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ width: "50%" }} />
          <Grid item xs={12}>
            <Typography
              sx={mobileView ? { my: 6, textAlign: "center" } : { my: 2 }}
            >
              {profile.tagline}
            </Typography>
            <Divider sx={{ width: "100%" }} />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ alignSelf: "center" }}>
          <Stack
            direction="row"
            spacing={1}
            sx={
              mobileView
                ? { justifyContent: "center", paddingBottom: "15px" }
                : { paddingBottom: "15px" }
            }
          >
            <Chip
              icon={<LinkedInIcon />}
              label="LinkedIn"
              onClick={() =>
                handleAlertShow("Profil LinkedIn", profile.linkedin)
              }
            />
            <Chip
              icon={<FacebookIcon />}
              label="Facebook"
              onClick={() =>
                handleAlertShow("Profil Facebook", profile.facebook)
              }
            />
            <Chip
              icon={<LanguageIcon />}
              label="Portfolio"
              onClick={() => handleAlertShow("Portfolio", profile.website)}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={mobileView && { justifyContent: "center" }}
          >
            <Chip
              icon={<EmailIcon />}
              label="Adres Email"
              onClick={() => handleAlertShow("Adres Email", profile.email)}
            />
            <Chip
              icon={<PhoneIcon />}
              label="Numer kontaktowy"
              onClick={() =>
                handleAlertShow("Numer kontaktowy", profile.contact)
              }
            />
          </Stack>
        </Grid>
      </Grid>

      <Modal open={show} onClose={handleClose} sx={{ overflow: "scroll" }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={(e) => handleSubmit(onSubmit(e))}
        >
          <Box sx={style}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Szczego??y profilu
            </Typography>
            <Grid container>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={profile.name}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Imi?? i Nazwisko"
                      {...field}
                      helperText={errors.name && errors.name.message}
                      error={errors.name !== undefined}
                      sx={{ width: "100%", mb: 3 }}
                      // onChange={handleProfile}
                    />
                  )}
                />

                <Controller
                  name="location"
                  control={control}
                  defaultValue={profile.location}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Miasto, Kraj"
                      {...field}
                      helperText={errors.location && errors.location.message}
                      error={errors.location !== undefined}
                      sx={{ width: "100%", mb: 3 }}
                    />
                  )}
                />

                <Controller
                  name="position"
                  control={control}
                  defaultValue={profile.position}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Twoje stanowisko"
                      {...field}
                      helperText={errors.position && errors.position.message}
                      error={errors.position !== undefined}
                      sx={{ width: "100%", mb: 3 }}
                    />
                  )}
                />

                <Controller
                  name="tagline"
                  control={control}
                  defaultValue={profile.tagline}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Opisz siebie w jednym zdaniu"
                      {...field}
                      helperText={errors.tagline && errors.tagline.message}
                      error={errors.tagline !== undefined}
                      sx={{ width: "100%", mb: 3 }}
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  defaultValue={profile.email}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Adres email"
                      {...field}
                      helperText={errors.email && errors.email.message}
                      error={errors.email !== undefined}
                      sx={{ width: "100%", mb: 3 }}
                    />
                  )}
                />

                <Controller
                  name="contact"
                  control={control}
                  defaultValue={profile.contact}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Numer kontaktowy"
                      {...field}
                      helperText={errors.contact && errors.contact.message}
                      error={errors.contact !== undefined}
                      sx={{ width: "100%", mb: 3 }}
                    />
                  )}
                />


                <Controller
                  name="linkedin"
                  control={control}
                  defaultValue={profile.linkedin}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="LinkedIn Profile"
                      {...field}
                      helperText={errors.linkedin && errors.linkedin.message}
                      error={errors.linkedin !== undefined}
                      sx={{ width: "100%", mb: 3 }}
                    />
                  )}
                />


                <Controller
                  name="facebook"
                  control={control}
                  defaultValue={profile.facebook}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Facebook Profile"
                      {...field}
                      helperText={errors.facebook && errors.facebook.message}
                      error={errors.facebook !== undefined}
                      sx={{ width: "100%", mb: 3 }}
                    />
                  )}
                />

                <Controller
                  name="website"
                  control={control}
                  defaultValue={profile.website}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Adres twojej strony internetowej"
                      {...field}
                      helperText={errors.website && errors.website.message}
                      error={errors.website !== undefined}
                      sx={{ width: "100%", mb: 3 }}
                    />
                  )}
                />




                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleFile}
                  />
                  <PhotoCamera />
                  <Typography sx={{ ml: 2 }}>
                    Wybierz zdj??cie profilowe
                  </Typography>
                </IconButton>

                <Grid item xs={12} sx={{ mt: "30px" }}>
                  <Button variant="outlined" type="submit">
                    Zapisz zmiany
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
      <Modal open={alert} onClose={handleAlertHide}>
        <Box sx={style}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {profileName}
          </Typography>
          <Typography variant="h7" sx={{ mb: 2 }}>
            Link: {profileURL}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default Profile;
