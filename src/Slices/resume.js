import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserResume } from "../Actions/authenticationActions";
import { setMessage } from "./message";

import userService from "../Actions/services";


export const updateResume = createAsyncThunk(
  "resume/update",
  async ({id, token, payload}, thunkAPI) => {
      console.log(id, token, payload)
    try {
      console.log(id, token, payload)
      const data = await updateUserResume(id, token, payload);
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


export const getResume = createAsyncThunk(
  "resume/get",
  async ({id, token}, thunkAPI) => {
    try {
      const data = await userService.getUserResume(id, token);
      return { resume: data };
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);



const initialState = {
    isEdited: false,
    skills: [],
    file: './images/profile.jpg',
    profile: {
        name: "Twoje Imię",
        location: "Miasto, Kraj",
        facebook: "",
        linkedin: "",
        website: "",
        email: "",
        contact: "",
        position: "Twoje stanowisko",
        tagline: "Opisz siebie jednym zdaniem",
    },
    experienceList: [],
    educationList: [],
};


const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    manageAbout(state, action) {
        state.about = action.payload;
        state.isEdited = true;
    },
    addEducation(state, action) {
        state.educationList = [...state.educationList, action.payload];
        state.isEdited = true;
    },
    editEducation(state, action) {
        let newArr = [...state.educationList]
        newArr[action.payload.id] = action.payload
        state.educationList = newArr;
        state.isEdited = true;
    },
    removeEducation(state, action) {
        let arr = [...state.educationList]
        arr.splice(action.payload, 1);
        state.educationList = arr;
        state.isEdited = true;
    },
    addExperience(state, action) {
      state.experienceList = [...state.experienceList, action.payload];
      state.isEdited = true;
    },
    editExperience(state, action) {
        let newArr = [...state.experienceList]
        newArr[action.payload.id] = action.payload
        state.experienceList = newArr;
        state.isEdited = true;
    },
    removeExperience(state, action) {
        let arr = [...state.experienceList]
        arr.splice(action.payload, 1);
        state.experienceList = arr;
        state.isEdited = true;
    },
    manageFile(state, action) {
      state.file = action.payload
      state.isEdited = true;
    },
    manageProfile(state, action) {
      state.profile = action.payload
      state.isEdited = true;
    },
    addSkill(state, action) {
      state.skills = [...state.skills, action.payload];
      state.isEdited = true;
    },
    removeSkill(state, action) {
      let arr = [...state.skills]
      arr.splice(action.payload, 1);
      state.skills = arr;
      state.isEdited = true;
  },
  },
  extraReducers: {
    [updateResume.fulfilled]: (state, action) => {
      state.isEdited = false;
      state = action.payload;
    },
    [updateResume.rejected]: (state, action) => {
      state.isEdited = false;
      state = state;
    },
    [getResume.fulfilled]: (state, action) => {
      return state = action.payload.resume.data.resume;
    },
    [getResume.rejected]: (state, action) => {
        return state = [];
    },
  },
});



const { actions, reducer } = resumeSlice;
export const { manageAbout, addEducation, editEducation, removeEducation, addExperience, editExperience, removeExperience, manageFile, manageProfile, addSkill, removeSkill } = actions
export default reducer;
