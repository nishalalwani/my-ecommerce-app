import React from "react";
import {initializeApp} from 'firebase/app'
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';





const firebaseConfig = {
  apiKey: "AIzaSyDFrB8oHwpZ0LLSjUvcZRSbH-HIPthHQOk",
  authDomain: "shopie-198e0.firebaseapp.com",
  projectId: "shopie-198e0",
  storageBucket: "shopie-198e0.appspot.com",
  messagingSenderId: "642654845583",
  appId: "1:642654845583:web:31222e561f0d5e19804efa",
  measurementId: "G-BPYJFKR3TP"
};

const app=initializeApp(firebaseConfig)
const auth=getAuth(app)
const fireDB=getFirestore(app)

export {auth,fireDB}











