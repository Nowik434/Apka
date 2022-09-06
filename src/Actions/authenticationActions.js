import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
  }

  export const registerUser = async (email, password, userId, courseId, firstname, lastname) => {
    console.log(email, password, userId, courseId, firstname, lastname)
    return axios.post(API_URL + "/auth/local/register", {
      username: email,
      email,
      password,
      userId,
      courseId,
      firstname,
      lastname
    }) .then((response) => {
        if (response.data.jwt) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch((error) => {
        console.log('An error occurred:', error.response);
      });
  };

  export const registerAsGuest = async (email, password, firstname, lastname, userRole) => {
    console.log(email, password, firstname, lastname, userRole)
    return axios.post(API_URL + "/auth/local/register", {
      username: email,
      email,
      password,
      firstname,
      lastname,
      userRole
    }).then((response) => {
      console.log('fffffffffff', response)
      if (response.data.jwt) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
  };


export const loginUser = async (username, password) => {
    return axios
    .post(API_URL + "/auth/local", {
        identifier: username,
        password: password,
    })
    .then((response) => {
      // console.log(JSON.parse(atob(response.data.jwt.split('.')[1])))
      if (response.data.jwt) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data
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
    return {jwt: token, user: response.data}
  }).catch(err => {
    console.log(err)
  })
};


// export const changePassword = async (id, token, payload) => {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     console.log('change pass')
//     return axios
//     .post(API_URL + `/api/auth/reset-password`, {
//           code: payload.code,
//           password: payload.password,
//           passwordConfirmation: payload.passwordConfirmation,
//     })
//     .then((response) => {
//       if (token) {
//           localStorage.setItem("user", JSON.stringify({jwt: token, user: response.data}));
//         }
//       // console.log('wysłano', response.data)
//       return {jwt: token, user: response.data}
//     }).catch(err => {
//       console.log(err)
//     })
//   };

export const resetPassword = async (payload) => {
  console.log(payload)
    console.log('reset pass')
    return axios
    .post(API_URL + `/auth/reset-password`, {
          code: payload.code,
          password: payload.password,
          passwordConfirmation: payload.repeatPassword,
    })
    .then((response) => {
      if(response.status === 200) {
        console.log('wysłano', response)
        return response;
      }
    })
  };

  export const forgotPassword = async (email, thunkAPI) => {
    // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log('forgot pass',email)
      return axios
      .post(API_URL + `/auth/forgot-password`, {
            email: email,
      })
      .then((response) => {
        if(response.status === 200) {
          console.log('wysłano', response)
          return response;
        }
      })
    };


export const logoutUser = () => {
  localStorage.removeItem("user");
  sessionStorage.removeItem("certificates");
};
