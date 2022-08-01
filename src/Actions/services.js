import { authHeader } from "./authenticationActions";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;


const getPublicContent = () => {
  return axios.get(API_URL + "all");
};


const getUserCertificates = (email) => {
  const qs = require('qs');
  const query = qs.stringify({
    populate: '*',
    filters: {
      user: {
        email: {
          $eq: email,
        },
      }
    },
  }, {
    encodeValuesOnly: true,
  });
  return axios.get(`${API_URL}/certificates?${query}`);
};


const getUserQualifications = () => {
  return axios.get(`${API_URL}/qualifications/?populate=*`);
};
// const getUserBoard = () => {
//   return axios.get(API_URL + "user", { headers: authHeader() });
// };
// const getAdminBoard = () => {
//   return axios.get(API_URL + "admin", { headers: authHeader() });
// };
const userService = {
  getPublicContent,
  getUserCertificates,
  getUserQualifications,
  // getUserBoard,
  // getAdminBoard,
};
export default userService