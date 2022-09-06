import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { forgotPassword, loginUser, logoutUser, registerAsGuest, registerUser, resetPassword, updateUser } from "../Actions/authenticationActions";
import { setMessage } from "./message";
const user = JSON.parse(localStorage.getItem("user"));


export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, userId, courseId, firstname, lastname }, thunkAPI) => {
    console.log('1111',email, password, userId, courseId, firstname, lastname)
    try {
      const response = await registerUser(email, password, userId, courseId, firstname, lastname);
      console.log(response)
      return {user: response};
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const registerasguest = createAsyncThunk(
  "auth/register",
  async ({ email, password, firstname, lastname, userRole }, thunkAPI) => {
    console.log('1111',email, password, firstname, lastname, userRole)
    try {
      const response = await registerAsGuest(email, password, firstname, lastname, userRole);
      console.log(response)
      return {user: response};
    } catch (error) {
      console.log('ERRRRR', error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        
      thunkAPI.dispatch(setMessage(message === "Request failed with status code 400" && "Podałeś nieprawidłowy adres email"));
      return thunkAPI.rejectWithValue();
    }
  }
);


export const login = createAsyncThunk(
  "auth/login",
  async ({username, password}, thunkAPI) => {
    try {
      const data = await loginUser(username, password);
      return { user: data };
    } catch (error) {
      console.error(error.response.data.error)
      let message;
      if(error.response.data.error && error.response.data.error.message === 'Your account email is not confirmed'){
        message = 'Potwierdź konto przez Twój email'
      }else if(error.response.data.error.status){
        message = 'Podałeś niepoprawne dane'
      }
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
        console.log(message)
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const update = createAsyncThunk(
  "auth/update",
  async ({id, token, payload}, thunkAPI) => {
      console.log(id, token, payload)
    try {
      console.log(id, token, payload)
      const data = await updateUser(id, token, payload);
      console.log(data)
      return  data;
    } catch (error) {
      console.error(error.response.data.error)
      let message;
      if(error.response.data.error.status){
        message = 'Podałeś niepoprawne dane'
      }
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
        console.log(message)
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);


// export const change = createAsyncThunk(
//   "auth/change-password",
//   async ({id, token, payload}, thunkAPI) => {
//       console.log(id, token, payload)
//     try {
//       console.log(id, token, payload)
//       const data = await changePassword(id, token, payload);
//       console.log(data)
//       return  data;
//     } catch (error) {
//       console.error(error.response.data.error)
//       let message;
//       if(error.response.data.error.status){
//         message = 'Podałeś niepoprawne dane'
//       }
//       // const message =
//       //   (error.response &&
//       //     error.response.data &&
//       //     error.response.data.message) ||
//       //   error.message ||
//       //   error.toString();
//         console.log(message)
//       thunkAPI.dispatch(setMessage(message));
//       return thunkAPI.rejectWithValue();
//     }
//   }
// );

export const reset = createAsyncThunk(
  "auth/reset-password",
  async ({code, password, repeatPassword}, thunkAPI) => {
    console.log({code, password, repeatPassword})
    try {
      const data = await resetPassword({code, password, repeatPassword});
      return  data;
    } catch (error) {
      console.error(error.response.data.error)
      let message;
      if(error.response.data.error.status){
        message = 'Podałeś niepoprawne dane'
      }
        console.log(message)
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const forgot = createAsyncThunk(
  "auth/forgot-password",
  async (payload, thunkAPI) => {
    try {
      const data = await forgotPassword(payload);
      return  data;
    } catch (error) {
      console.error(error.response.data.error)
      let message;
      if(error.response.data.error.status){
        message = 'Podałeś nieprawidłowy adres email'
      }
        console.log(message)
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutUser();
});


const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };


const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    }, 
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [update.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    [update.rejected]: (state, action) => {
      state.user = state.user;
    },
  },
});
const { reducer } = authSlice;
export default reducer;