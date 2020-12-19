import React from 'react'
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer} from "react-redux-firebase";
import  authreducer  from "../reducers/authReducer";
const rootReducer = combineReducers({
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    auth:authreducer
});
export default rootReducer;

