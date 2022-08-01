import { combineReducers, configureStore } from '@reduxjs/toolkit'
import auth from "./Slices/auth";
import messageReducer from './Slices/message';
import certificatesReducer from './Slices/certificates';
import qualificationsReducer from './Slices/qualifications';

const reducer = combineReducers({
  auth: auth,
  message: messageReducer,
  certificates: certificatesReducer,
  qualifications: qualificationsReducer,
})


const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})


export default store;