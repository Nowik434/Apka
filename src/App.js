import "./App.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import {
  Routes,
  Route,
  useParams,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProtectedRoute from "./Components/PrivateRoute";

import Main from "./Pages/Main";
import { useSelector } from "react-redux";
import Qualifications from "./Pages/Qualifications";
import SingleCertificate from "./Pages/SingleCertificate";
import Error404 from "./Components/404";
import Profile from "./Pages/Profile";
import ResetPassword from "./Pages/ResetPassword";
import TermsAndConditions from "./Pages/TermsAndConditions";
import Certificates from "./Pages/Certificates/index";
import Copyright from "./Components/Copyright";
import ForgotPassword from "./Pages/ForgotPassword";
import YourCv from "./Pages/YourCv";
import EmailConfirmation from "./Components/EmailConfirmed";
import RegisterGuest from "./Pages/RegisterGuest";
import EmailNotConfirmed from "./Components/EmailNotConfirmed";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d2ab67",
    },
    fontWhite: {
      main: "#fff",
    },
  },
});

function App() {
  const { user: currentUser } = useSelector((state) => state.auth);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute user={currentUser} />}>
            {currentUser && currentUser.user.confirmed === false && (
              <Navigate to={<EmailNotConfirmed/>}/>
            )}
            {currentUser && currentUser.user.userRole === "user" && (
              <>
                <Route path="/" element={<Certificates />} />
                <Route
                  path="/certificates/:certificateId"
                  element={<SingleCertificate />}
                />
              </>
            )}
            {currentUser && currentUser.user.userRole === "guest" && (
              <>
                <Route path="/" element={<p>widok gościa</p>} />
              </>
            )}

            <Route path="/qualifications" element={<Qualifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/yourcv" element={<YourCv />} />
          </Route>
          {!currentUser && (
            <>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<RegisterGuest />} />
              <Route path="register">
                <Route path=":userId">
                  <Route path=":courseId">
                    <Route path=":firstname">
                      <Route path=":lastname">
                        <Route path=":email" element={<Register />}></Route>
                      </Route>
                    </Route>
                  </Route>
                </Route>
              </Route>
              <Route
                path="terms-and-conditions"
                element={<TermsAndConditions />}
              />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />}>
                <Route path=":code" element={<ResetPassword />} />
              </Route>
              <Route path="confirmed" element={<EmailConfirmation />} />
            </>
          )}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
      <Copyright style={{ marginBottom: "25px" }} />
    </ThemeProvider>
  );
}

export default App;
