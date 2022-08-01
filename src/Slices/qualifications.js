import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../Actions/services";
// import { setMessage } from "./message";
// const user = JSON.parse(localStorage.getItem("user"));



export const getQualifications = createAsyncThunk(
  "qualifications",
  async (thunkAPI) => {
      // console.log(email)
    try {
      const data = await userService.getUserQualifications();
      // console.log(data)
      return { qualifications: data };
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


const initialState = [];


const getQualificationsSlice = createSlice({
  name: "qualifications",
  initialState,
  extraReducers: {
    [getQualifications.fulfilled]: (state, action) => {
      return state = [...action.payload.qualifications.data.data];
    },
    [getQualifications.rejected]: (state, action) => {
        return state = [];
    },
  },
});
const { reducer } = getQualificationsSlice;
export default reducer;