import React from "react";
import {initializeApp} from 'firebase/app'
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';





const firebaseConfig = {
    apiKey: "AIzaSyCbG2AU0FOtYSQ9jATD2hVff_1u5QOKacU",
    authDomain: "clone-1962a.firebaseapp.com",
    projectId: "clone-1962a",
    storageBucket: "clone-1962a.appspot.com",
    messagingSenderId: "743189103277",
    appId: "1:743189103277:web:f2f70a6181b98ff769bc24",
    measurementId: "G-2T34P8T3C3"
  };

const app=initializeApp(firebaseConfig)
const auth=getAuth(app)
const fireDB=getFirestore(app)

export {auth,fireDB}











