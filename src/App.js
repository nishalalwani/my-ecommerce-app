import React from "react";
import "./App.css";
import Home from "./components/Pages/Home";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Authentication/Login";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/Authentication/SignUp";
import MyState from "./context/MyState";
import Productinfo from "./components/Pages/Productinfo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Admin/Dashboard";
import AddProduct from "./components/Admin/AddProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import Ordernow from "./components/Checkout/Ordernow";
import Order from "./components/Pages/Order";

const App = () => {
  return (
    <>
      <Router>
        <MyState>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/checkout"
              element={
                <ProtectedRoutes>
                  <Checkout />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/ordernow"
              element={
                <ProtectedRoutes>
                  <Ordernow />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/order"
              element={
                <ProtectedRoutes>
                  <Order />
                </ProtectedRoutes>
              }
            />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/productinfo/:id" element={<Productinfo />} />
            <Route path="/updateproduct" element={<UpdateProduct />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRouteForAdmin>
                  <Dashboard />
                </ProtectedRouteForAdmin>
              }
            />

            <Route
              path="/addproduct"
              element={
                <ProtectedRouteForAdmin>
                  <AddProduct />
                </ProtectedRouteForAdmin>
              }
            />

            <Route
              path="/updateproduct"
              element={
                <ProtectedRouteForAdmin>
                  <UpdateProduct />
                </ProtectedRouteForAdmin>
              }
            />
          </Routes>
          <ToastContainer />
        </MyState>
      </Router>
    </>
  );
};

export default App;

export const ProtectedRoutes = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));
  if (admin.user.email === "admin@gmail.com") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
