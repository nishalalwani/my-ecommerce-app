import React from "react";
import {initializeApp} from 'firebase/app'
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';





const firebaseConfig = {
  apiKey: "AIzaSyA0VGRIXepezjY0TKxHqHocWAVxw1ISeBc",
  authDomain: "shopie-dd086.firebaseapp.com",
  projectId: "shopie-dd086",
  storageBucket: "shopie-dd086.appspot.com",
  messagingSenderId: "1082671327025",
  appId: "1:1082671327025:web:9ea9aa4ea2a72bc70a3210",
  measurementId: "G-5X542ZDMQ8"
  };

const app=initializeApp(firebaseConfig)
const auth=getAuth(app)
const fireDB=getFirestore(app)

export {auth,fireDB}











