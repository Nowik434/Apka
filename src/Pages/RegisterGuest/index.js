import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useParams, useNavigate, Link as LinkR } from "react-router-dom";
import Copyright from "../../Components/Copyright";
import { register as registerUser, registerasguest } from "../../Slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { Logo } from "../../Components/Logo";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDocumentTitle } from "../../Hooks/useDocumentTitle";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const token = "YOUR_TOKEN_HERE"; // TOKEN TRZEBA USTAWIĆ, Narazie działa bez

export default function RegisterGuest() {
  useDocumentTitle('rejestracja')
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMsg = useSelector((state) => state.message)

  const schema = yup.object({
    password: yup
      .string()
      .required("Wpisz hasło")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Hasło musi zawierać przynajmniej 8 znaków, jedną małą i wielką literę, jedną liczbę oraz znak specjalny"
      ),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Hasło musi być takie samo')
      .required('Powtórz hasło'),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loadnig, setLoading] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
  // const [password, setPassword] = useState();
  const [clamped, setClamped] = useState(true);
  const [checkboxes, setCheckboxes] = useState({
    rodo: false,
    terms: false,
  });

  const { rodo, terms } = checkboxes;
  const error = [rodo, terms].filter((v) => v).length !== 2;

  useEffect(()=> {
    if(!error && watch("password") !== '' && watch("repeatPassword") !== '' ){
      setIsValidate(true);
    } else {
      setIsValidate(false);
    }
  }, [checkboxes, watch("password"), watch("repeatPassword")])

  

  const onSubmit = (data) => {
    console.log(data.firstname, data.lastname, data.email, data.password)
    setLoading(true);
    try {
      dispatch(
        registerasguest({
          email: data.email,
          password: data.password,
          firstname: data.firstname,
          lastname: data.lastname,
          userRole: 'guest',
        })
      )
        .unwrap()
        .then((res) => {
          if (res.user !== undefined) {
            navigate("/");
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log("errrr", err);
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleCheckboxChange = (e) => {
    setCheckboxes({
      ...checkboxes,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Logo />
        <Typography component="h1" variant="h5">
          Rejestracja jako Gość 
        </Typography>
        <Typography component="p" variant="h8" sx={{textAlign: 'center'}}>
          Rejestrując się jako gość nie będziesz widział swoich certyfikatów. Rejestracja jako kursant dostępna jedynie poprzez Platformę Egzaminacyjną VCC
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => handleSubmit(onSubmit)(e)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="Imię"
            name="firstname"
            {...register("firstname")}
            helperText={errors.firstname && errors.firstname.message}
            error={errors.firstname !== undefined}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Nazwisko"
            name="lastname"
            {...register("lastname")}
            helperText={errors.lastname && errors.lastname.message}
            error={errors.lastname !== undefined}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adres Email"
            name="email"
            autoComplete="email"
            {...register("email")}
            helperText={errors.email && errors.email.message}
            error={errors.email !== undefined}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Hasło"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password")}
            helperText={errors.password && errors.password.message}
            error={errors.password !== undefined}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="repeatPassword"
            label="Powtórz hasło"
            type="password"
            id="repeatPassword"
            autoComplete="current-password"
            {...register("repeatPassword")}
            helperText={errors.repeatPassword && errors.repeatPassword.message}
            error={errors.repeatPassword !== undefined}
          />
          {console.log(errorMsg.message)}
          {errorMsg.message !== '' && <Alert severity="error">
              <AlertTitle>{errorMsg.message}</AlertTitle>
            </Alert>}
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="rodo"
                  value="rodo"
                  color="primary"
                  checked={rodo}
                  onChange={handleCheckboxChange}
                />
              }
              label={
                <div
                  style={{
                    boxSizing: "border-box",
                    display: "flex",
                    WebkitBoxAlign: "end",
                    msFlexAlign: "end",
                    alignItems: "flex-end",
                  }}
                >
                  <div className={clamped && "clamp"}>
                    Wyrażam zgodę na przetwarzanie przez Fundację VCC danych
                    osobowych zawartych w formularzu rejestracyjnym w celu
                    rejestracji i utrzymania konta w Systemie Talentcoin.
                    Przyjmuję do wiadomości, że wyrażenie zgody jest dobrowolne
                    a udzieloną zgodę mogę odwołać w każdym czasie kontaktując
                    się z Fundacją VCC. Szczegółowe informacje o przetwarzaniu
                    Twoich danych osobowych, w tym o przysługujących Ci
                    uprawnieniach, znajdziesz w naszej
                    <br />
                    <Link href="/terms-and-conditions" underline="always">
                      Polityce Prywatności
                    </Link>
                    <br />
                    oraz
                    <br />
                    <Link href="/terms-and-conditions" underline="always">
                      Polityce cookies
                    </Link>
                    .
                  </div>
                  <Link underline="always" onClick={() => setClamped(!clamped)}>
                    {clamped ? "rozwiń" : "zwiń"}
                  </Link>
                </div>
              }
              sx={{ marginRight: "4px" }}
            />
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    name="terms"
                    checked={terms}
                    onChange={handleCheckboxChange}
                    value="terms"
                    color="primary"
                  />
                }
                label={`Zaakceptuj`}
                sx={{ marginRight: "4px" }}
              />
              <Link href="/terms-and-conditions" underline="always">
                regulamin
              </Link>
            </div>
          </FormGroup>
          {error && (
            <FormHelperText sx={{ color: "red" }}>
              Musisz odznaczyć wszystkie zgody
            </FormHelperText>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isValidate}
          >
            Zarejestruj
          </Button>
          <Grid container>
            <Grid item>
              <LinkR
                to="/login"
                style={{ textDecoration: "none", color: "#d2ab67" }}
              >
                Masz już konto? Zaloguj
              </LinkR>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
