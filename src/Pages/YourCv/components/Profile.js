import React, { useState  } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import RoomIcon from '@mui/icons-material/Room';
import WorkIcon from '@mui/icons-material/Work';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Typography } from '@mui/material';

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { manageFile, manageProfile } from '../../../Slices/resume';
import useMediaQuery from '@mui/material/useMediaQuery';

import randomLogo from '../../../assets/profile.png'

function Profile() {

    const profile = useSelector(state => state.resume.profile)
    const file = useSelector(state => state.resume.file)
    const dispatch = useDispatch();

    const mobileView = useMediaQuery('(max-width:425px)');
    console.log(mobileView)


    // const {manageProfile, manageFile} = bindActionCreators(actionCreators, dispatch);

    // const [file, setFile] = useState("./images/profile.jpg");
    function handleFile(e) {
        dispatch(manageFile(URL.createObjectURL(e.target.files[0])));
        // setFile(URL.createObjectURL(e.target.files[0]));
    }
    // const [profile,setProfile] = useState({
    //     name: "Your Name",
    //     location: "City, Name",
    //     github: "",
    //     linkedin: "",
    //     website: "",
    //     position: "Your Position",
    //     tagline: "Describe yourself in one line"
    // })

    const handleProfile = (e) => {
        dispatch(manageProfile({
                    ...profile,
                    [e.target.name]:e.target.value
                }))
        // setProfile((old)=>{
        //     return {
        //         ...old,
        //         [e.target.name]:e.target.value
        //     }
        // })
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
        setAlert(false)
    };
    const handleAlertShow = (Profile,Link) => {
        setProfileName(Profile);
        setProfileURL(Link);
        setAlert(true)
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
          <Grid item xs={6} sx={mobileView && {textAlign: '-webkit-center', marginTop: '30px'}}>
            {file ? (
              <img src={file} className="profile-image" alt="Profile image"></img>
            ) : (
              <img src={randomLogo} className="profile-image" alt="Profile image"></img>
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
            <Typography sx={mobileView ? { my: 6, textAlign: 'center' } : { my: 2 }}>{profile.tagline}</Typography>
            <Divider sx={{ width: "100%" }} />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ alignSelf: "center" }}>
          <Stack direction="row" spacing={1} sx={mobileView ? {justifyContent: 'center', paddingBottom: "15px"}:{ paddingBottom: "15px" }}>
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
          <Stack direction="row" spacing={1} sx={mobileView && {justifyContent: 'center'}}>
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
        <Box sx={style}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Szczegoły profilu
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                label="Twoje imię"
                sx={{ width: "100%", mb: 3 }}
                required
                type="text"
                placeholder="Wpisz swoje imię..."
                name="name"
                value={profile.name}
                onChange={handleProfile}
                // error={validated && profile.name === ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Miasto, Kraj"
                sx={{ width: "100%", mb: 3 }}
                required
                type="text"
                placeholder="Miasto, Kraj"
                name="location"
                value={profile.location}
                onChange={handleProfile}
                // error={validated && profile.name === ""}
              />
              <TextField
                label="Twoje stanowisko"
                sx={{ width: "100%", mb: 3 }}
                required
                type="text"
                placeholder="Twoje stanowisko"
                name="position"
                value={profile.position}
                onChange={handleProfile}
                // error={validated && profile.name === ""}
              />
              <TextField
                label="Opisz siebie w jednym zdaniu"
                sx={{ width: "100%", mb: 3 }}
                required
                type="text"
                placeholder="Opisz siebie w jednym zdaniu"
                name="tagline"
                value={profile.tagline}
                onChange={handleProfile}
                // error={validated && profile.name === ""}
              />
              <TextField
                label="Adres email"
                sx={{ width: "100%", mb: 3 }}
                required
                type="email"
                placeholder="Adres email"
                name="email"
                value={profile.email}
                onChange={handleProfile}
                // error={validated && profile.name === ""}
              />
              <TextField
                label="Numer kontaktowy"
                sx={{ width: "100%", mb: 3 }}
                required
                type="number"
                placeholder="Numer kontaktowy"
                name="contact"
                value={profile.contact}
                onChange={handleProfile}
                // error={validated && profile.name === ""}
              />
              <TextField
                label="LinkedIn Profile"
                sx={{ width: "100%", mb: 3 }}
                required
                type="text"
                placeholder="LinkedIn Profile"
                name="linkedin"
                value={profile.github}
                onChange={handleProfile}
                // error={validated && profile.name === ""}
              />
              <TextField
                label="Facebook Profile"
                sx={{ width: "100%", mb: 3 }}
                required
                type="text"
                placeholder="Facebook Profile"
                name="facebook"
                value={profile.facebook}
                onChange={handleProfile}
                // error={validated && profile.name === ""}
              />
              <TextField
                label="Your Portfolio Website"
                sx={{ width: "100%", mb: 3 }}
                required
                type="text"
                placeholder="Your Portfolio Website"
                name="website"
                value={profile.website}
                onChange={handleProfile}
                // error={validated && profile.name === ""}
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
                  Wybierz zdjęcie profilowe
                </Typography>
              </IconButton>

              <Grid item xs={12} sx={{ mt: "30px" }}>
                <Button variant="outlined" onClick={handleClose}>
                  Zapisz zmiany
                </Button>
              </Grid>
            </Grid>
          </Grid>
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

export default Profile