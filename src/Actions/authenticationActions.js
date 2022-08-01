import axios from "axios";
const API_URL = "http://localhost:1337/api";


export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
  }

  export const registerUser = async (email, password, userId, firstname, lastname) => {
    console.log(email, password, userId, firstname, lastname)
    return axios.post(API_URL + "/auth/local/register", {
      username: email,
      email,
      password,
      userId,
      firstname,
      lastname
    }) .then((response) => {
        if (response.data.jwt) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        // console.log('data from register',response.data)
        return response.data;
      })
      .catch((error) => {
        console.log('An error occurred:', error.response);
      });
  };


export const loginUser = async (username, password) => {
    // console.log(username, password)
    return axios
    .post(API_URL + "/auth/local", {
        identifier: username,
        password: password,
    })
    .then((response) => {
      if (response.data.jwt) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data
      // console.log(response.data)
    })
};




export const updateUser = async (id, token, payload) => {
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log('update')
  return axios
  .put(API_URL + `/users/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
        profileImage: payload.profileImage,
        firstname: payload.firstname,
        lastname: payload.lastname,
        education: payload.education,
        typeOfEducation: payload.typeOfEducation,
        region: payload.region,
        phone: payload.phone,
  })
  .then((response) => {
    if (token) {
        localStorage.setItem("user", JSON.stringify({jwt: token, user: response.data}));
      }
    // console.log('wysłano', response.data)
    return {jwt: token, user: response.data}
  }).catch(err => {
    console.log(err)
  })
};


export const logoutUser = () => {
  localStorage.removeItem("user");
};
