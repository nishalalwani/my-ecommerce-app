import React from "react";
import {initializeApp} from 'firebase/app'
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';





const firebaseConfig = {
    apiKey: "AIzaSyCJNyojgZbn7142w1Imbn3rDfrbyIPmbAA",
    authDomain: "clone-508af.firebaseapp.com",
    projectId: "clone-508af",
    storageBucket: "clone-508af.appspot.com",
    messagingSenderId: "84998002474",
    appId: "1:84998002474:web:88ba053bbedcfb09c9b053",
};

const app=initializeApp(firebaseConfig)
const auth=getAuth(app)
const fireDB=getFirestore(app)

export {auth,fireDB}











