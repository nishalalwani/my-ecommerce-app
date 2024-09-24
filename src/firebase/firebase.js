import React from "react";
import {initializeApp} from 'firebase/app'
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';





const firebaseConfig = {
  apiKey: "AIzaSyBdUfG74iaOniOSCxq_koMtw3YHHKfWy_Q",
  authDomain: "shopie-e752c.firebaseapp.com",
  projectId: "shopie-e752c",
  storageBucket: "shopie-e752c.appspot.com",
  messagingSenderId: "69797079217",
  appId: "1:69797079217:web:abf511ffec4b23dd415a90",
  measurementId: "G-R7NHWZJCT9"
};

const app=initializeApp(firebaseConfig)
const auth=getAuth(app)
const fireDB=getFirestore(app)

export {auth,fireDB}











