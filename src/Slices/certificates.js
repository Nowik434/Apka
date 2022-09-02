import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../Actions/services";
import { setMessage } from "./message";
const user = JSON.parse(localStorage.getItem("user"));
const cert = JSON.parse(sessionStorage.getItem("certificates"));



export const getCertificates = createAsyncThunk(
  "certificates",
  async (email, thunkAPI) => {
      // console.log(email)
    try {
      const data = await userService.getUserCertificates(email);
      // console.log(data)
      return { certificates: data };
    } catch (error) {
    //   const message =
    //     (error.response &&
    //       error.response.data &&
    //       error.response.data.message) ||
    //     error.message ||
    //     error.toString();
    //     console.log(message)
    //   thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);


const initialState = cert
  ? cert
  :  [];

const getCertificatesSlice = createSlice({
  name: "certificates",
  initialState,
  extraReducers: {
    [getCertificates.fulfilled]: (state, action) => {
      return state = action.payload.certificates.data.data;
    },
    [getCertificates.rejected]: (state, action) => {
        return state = [];
    },
  },
});
const { reducer } = getCertificatesSlice;
export default reducer;