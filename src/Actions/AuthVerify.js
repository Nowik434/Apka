import React, { useEffect } from "react";
import { withRouter } from "../Hooks/withRouter";
import { useLocation, useNavigate } from "react-router-dom";
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
const AuthVerify = (props) => {
  // console.log('AUTH VERIFY', props)
  const history = useLocation();
  // let navigate = useNavigate();

  useEffect(()=> {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const decodedJwt = parseJwt(user.jwt);
      // console.log(parseJwt(user.jwt))
      // console.log(decodedJwt.exp * 1000)
      // console.log(Date.now())
      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
        // navigate("/logout", { replace: true })
      }
    }
  },[history])

  return (<>{props.children}</>);
};
export default withRouter(AuthVerify);