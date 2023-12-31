import React from 'react'
import "./App.css"
import Home from './components/Home'
import Checkout from './components/Checkout'
import Login from './components/Login'
import {HashRouter as Router,Routes ,Route,Navigate} from "react-router-dom"
import SignUp from './components/SignUp'
import MyState from './context/MyState'
import Productinfo from './components/Productinfo'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard'
import AddProduct from './pages/AddProduct'
import UpdateProduct from './pages/UpdateProduct'
import Ordernow from './pages/Ordernow'
import Order from './components/Order'




const App = () => {
  return (
    <>
   <MyState>
    <Router>
    <Routes>
       <Route path="/" element={<Home/>} />
       <Route path='/login' element={<Login/>}/>

       <Route path="/checkout" element={
       <ProtectedRoutes>
        <Checkout/>
       </ProtectedRoutes>} />

       <Route path='/ordernow' element={
        <ProtectedRoutes>
          <Ordernow/>
        </ProtectedRoutes>
       }/>

      <Route path='/order' element={
        <ProtectedRoutes>
          <Order/>
        </ProtectedRoutes>
       }/>

       <Route path="/signup"  element={<SignUp/>}/>
       <Route path='/productinfo/:id' element={<Productinfo/>}/>
       <Route path='/updateproduct' element={<UpdateProduct/>}/>

       <Route path='/dashboard' element={
       <ProtectedRouteForAdmin>
       <Dashboard/>
      //  </ProtectedRouteForAdmin>
       }/>

       <Route path='/addproduct' element={
       <ProtectedRouteForAdmin>
       <AddProduct/>
      //  </ProtectedRouteForAdmin>
       }/>

       <Route path='/updateproduct' element={
        <ProtectedRouteForAdmin>
        <UpdateProduct/>
        // </ProtectedRouteForAdmin>
       }/>

    </Routes>
    <ToastContainer/>
    </Router>
    </MyState>
   
      
    </>
  )
}

export default App

export const ProtectedRoutes=({children})=>{
  const user= localStorage.getItem("user")
  if(user){
    return children
  }
  else{
    return <Navigate to="/login"/>
  }
}

export const ProtectedRouteForAdmin=({children})=>{
  const admin=JSON.parse(localStorage.getItem("user"))
  if(admin.user.email==="lalwaninisha02@gmail.com"){
    return children
  }
  else{
    return <Navigate to="/login"/>
  }
}