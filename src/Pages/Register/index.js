import React, { useState } from "react";
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
import { register as registerUser } from "../../Slices/auth";
import { useDispatch } from "react-redux";
import { Logo } from "../../Components/Logo";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const token = "YOUR_TOKEN_HERE"; // TOKEN TRZEBA USTAWIĆ, Narazie działa bez

export default function Register() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let { userId, firstname, lastname, email } = useParams();

  const schema = yup.object({
    password: yup
      .string()
      .required("Wpisz hasło")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Hasło musi zawierać przynajmniej 8 znaków, jedną małą i wielką literę, jedną liczbę oraz znak specjalny"
      ),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(userId, firstname, lastname, email);
  const [loadnig, setLoading] = useState(false);
  const [password, setPassword] = useState();
  const [clamped, setClamped] = useState(true);
  const [checkboxes, setCheckboxes] = useState({
    rodo: false,
    terms: false,
  });

  const { rodo, terms } = checkboxes;
  const error = [rodo, terms].filter((v) => v).length !== 2;

  const onSubmit = (data) => {
    setLoading(true);
    try {
      dispatch(
        registerUser({
          email,
          password: data.password,
          userId,
          firstname,
          lastname,
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
          Rejestracja
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
            id="userId"
            label="Id użytkownika"
            name="userId"
            value={userId}
            autoFocus
            disabled
            sx={{ display: "none" }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="Imię"
            name="firstname"
            value={firstname}
            autoFocus
            disabled
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Nazwisko"
            name="lastname"
            value={lastname}
            autoFocus
            disabled
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adres Email"
            name="email"
            autoComplete="email"
            value={email}
            autoFocus
            disabled
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
            onChange={(e) => setPassword(e.target.value)}
            {...register("password", {
              required: "Musisz wpisać hasło",
              minLength: {
                value: 8,
                message: "Hasło musi mieć więcej niż 8 znaków",
              },
            })}
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
            {...register("repeatPassword", {
              validate: (value) => {
                if (watch("password") != value) {
                  return "Hasła nie są takie same";
                }
              },
            })}
            helperText={errors.repeatPassword && errors.repeatPassword.message}
            error={errors.repeatPassword !== undefined}
          />
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
            disabled={error}
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
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
