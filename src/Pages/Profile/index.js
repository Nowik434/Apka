import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Paper, TextField, useMediaQuery } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { update } from "../../Slices/auth";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import axios from "axios";
import FormData from "form-data";

import { useForm} from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UPLOADS_URL = process.env.REACT_APP_UPLOADS_URL;

const regions = [
  "dolnośląskie",
  "kujawsko-pomorskie",
  "lubelskie",
  "lubuskie",
  "łódzkie",
  "małopolskie",
  "mazowieckie",
  "opolskie",
  "podkarpackie",
  "podlaskie",
  "pomorskie",
  "śląskie",
  "świętokrzyskie",
  "warmińsko-mazurskie",
  "wielkopolskie",
  "zachodniopomorskie",
];

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = useSelector(state => state.auth.user.jwt);

  const [profileImage, setProfileImage] = useState(user.user.profileImage);
  const [firstname, setFirstname] = useState(user.user.firstname);
  const [lastname, setLastname] = useState(user.user.lastname);
  const [education, setEducation] = useState(user.user.education);
  const [typeOfEducation, setTypeOfEducation] = useState(
    user.user.typeOfEducation
  );
  const [region, setRegion] = useState(user.user.region);
  const [phone, setPhone] = useState(user.user.phone);
  const [file, setFile] = useState();

  const mobileWidth = useMediaQuery('(max-width:900px)');

  const AdditionalFormSchema = yup.object().shape({
    firstname: yup.string().required("Imię jest wymagane").min(3, 'Imię jest za krótkie'),
    lastname: yup.string().required("Nazwisko jest wymagane").min(3, 'Nazwisko jest za krótkie'),
    region: yup.string().required("Województwo jest wymagane"),
    education: yup.string().required("Wykształcenie jest wymagane"),
    typeOfEducation: yup
      .string()
      .required("Kierunek wykształcenia jest wymagany"),
    phone: yup
      .string()
      .required("Numer jest wymagany")
      .matches(/^[0-9]+$/, "Numer musi być liczbą")
      .min(9, 'Numer musi być 6 cyfrowy')
      .max(9, 'Numer musi być 6 cyfrowy')
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AdditionalFormSchema),
  });

  const Input = styled("input")({
    display: "none",
  });

  const handleChange = (e) => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${jwt}`;
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    const image = new FormData();
    image.append("files", file);
    const upload_img = await axios({
      method: "post",
      url: `${UPLOADS_URL}/api/upload`,
      data: image,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        setProfileImage(response.data[0].url);
        dispatch(
          update({
            id: user.user.id,
            token: user.jwt,
            payload: { ...data, profileImage: response.data[0].url },
          })
        );
      })
      .catch(function (err) {
        console.log("err", err);
      });
    dispatch(
      update({
        id: user.user.id,
        token: user.jwt,
        payload: data,
      })
    );
    navigate("/");
  };

  return (
    <main style={mobileWidth ? {marginTop: '88px'} : null}>
    {/* <main> */}
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="text.primary"
        sx={{ mt: 4 }}
        gutterBottom
      >
        Profil użytkownika
      </Typography>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <label htmlFor="icon-button-file">
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={(e) => handleChange(e)}
            />
            <div style={{ width: "100%", textAlign: "center" }}>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera
                  sx={{
                    position: "absolute",
                    zIndex: 1,
                    fontSize: "5.5rem",
                    color: "#ffffffad",
                  }}
                />
                <Avatar
                  // alt="User Avatar"
                  src={UPLOADS_URL + profileImage}
                  sx={{ width: 130, height: 130, m: "auto" }}
                >
                  <PhotoCamera
                    sx={{
                      position: "absolute",
                      zIndex: 1,
                      fontSize: "5.5rem",
                      color: "#ffffffad",
                    }}
                  />
                </Avatar>
              </IconButton>
            </div>
          </label>
          <Typography
            component="h2"
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ mt: 4 }}
          >
            Twoje dane
          </Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { ml: 0, mb: 3, width: "100%" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <TextField
                required
                id="outlined-required"
                label="Imię"
                defaultValue={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                {...register("firstname")}
                helperText={errors.firstname && errors.firstname.message}
                error={errors.firstname !== undefined}
              />
              <TextField
                required
                id="outlined-required"
                label="Nazwisko"
                defaultValue={lastname}
                onChange={(e) => setLastname(e.target.value)}
                {...register("lastname")}
                helperText={errors.lastname && errors.lastname.message}
                error={errors.lastname !== undefined}
              />
              <FormControl
                fullWidth
                sx={{ mb: 3 }}
                error={errors.region !== undefined}
              >
                <InputLabel id="demo-simple-select-label">
                  Województwo
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={region}
                  onChange={(e) => setRegion(e.target.value)}
                  label="Województwo"
                  {...register("region")}
                >
                  {regions.map((region) => (
                    <MenuItem key={region} value={region}>
                      {region}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.region && errors.region.message}
                </FormHelperText>
              </FormControl>
              <FormControl
                fullWidth
                sx={{ mb: 3 }}
                error={errors.education !== undefined}
              >
                <InputLabel id="demo-simple-select-label">
                  Wykształcenie
                </InputLabel>
                <Select
                  name="education"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={education}
                  label="Wykształcenie"
                  onChange={(e) => setEducation(e.target.value)}
                  {...register("education")}
                >
                  <MenuItem value="Wyższe">Wyższe</MenuItem>
                  <MenuItem value="Średnie">Średnie</MenuItem>
                  <MenuItem value="Zawodowe">Zawodowe</MenuItem>
                  <MenuItem value="Podstawowe">Podstawowe</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.education && errors.education.message}
                </FormHelperText>
              </FormControl>
              <FormControl
                fullWidth
                sx={{ mb: 3 }}
                error={errors.typeOfEducation !== undefined}
              >
                <InputLabel id="demo-simple-select-label">
                  Kierunek wykształcenia
                </InputLabel>
                <Select
                  name="typeOfEducation"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={typeOfEducation}
                  label="Kierunek wykształcenia"
                  onChange={(e) => setTypeOfEducation(e.target.value)}
                  {...register("typeOfEducation")}
                >
                  <MenuItem value="Budowlane">Budowlane</MenuItem>
                  <MenuItem value="Informatyczne">Informatyczne</MenuItem>
                  <MenuItem value="Gastronomiczne">Gastronomiczne</MenuItem>
                  <MenuItem value="Medyczne">Medyczne</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.typeOfEducation && errors.typeOfEducation.message}
                </FormHelperText>
              </FormControl>
              <TextField
                required
                id="outlined-required"
                label="Telefon"
                defaultValue={phone}
                onChange={(e) => setPhone(e.target.value)}
                {...register("phone")}
                helperText={errors.phone && errors.phone.message}
                error={errors.phone !== undefined}
              />
              <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: "center" }}
              >
                <Button type="submit" variant="outlined">
                  Zapisz
                </Button>
                <Button variant="outlined" onClick={() => navigate("/")}>
                  Odrzuć
                </Button>
              </Stack>
            </div>
          </Box>
        </Paper>
      </Container>
    </main>
  );
}