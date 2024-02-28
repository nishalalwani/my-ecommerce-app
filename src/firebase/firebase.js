import React from "react";
import {initializeApp} from 'firebase/app'
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';





const firebaseConfig = {
  apiKey: "AIzaSyCuG48J3u3dESDE1okbloOUGewTiYKE4qI",
  authDomain: "ecommerce-clone-c8986.firebaseapp.com",
  projectId: "ecommerce-clone-c8986",
  storageBucket: "ecommerce-clone-c8986.appspot.com",
  messagingSenderId: "1078709972076",
  appId: "1:1078709972076:web:7a0215e6e8cac38a0bbc49",
  measurementId: "G-H9RNBMBFQX"
  };

const app=initializeApp(firebaseConfig)
const auth=getAuth(app)
const fireDB=getFirestore(app)

export {auth,fireDB}











