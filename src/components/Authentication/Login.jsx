import React, { useContext, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import myContext from "../../context/MyContext";
import Loader from "../../loader/Loader";
import logo from "../../images/ecom-icon.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(myContext);
  const navigate = useNavigate();
  const { loading, setLoading } = context;
  const Googleprovider = new GoogleAuthProvider();

  const signInwithGoogle = () => {
    signInWithPopup(auth, Googleprovider);
  };

  const signin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      return toast.error("All fields are required", {
        position: "top-right",
        autoClose: 100000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(result));
      toast.success("Signin Successfull", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/");
      setLoading(false);
    } catch (error) {
      toast.error("Signin failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    }
  };
  return (
    <>
      <div className="login">
        <div className="login_container">
          <Link to="/">
            <img className="login_logo" src={logo} alt="" />
          </Link>
          <h1>Sign-in</h1>

          <form>
            {loading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItem: "center",
                }}
              >
                <Loader />
              </div>
            )}
            <h5>E-mail</h5>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="login_signInButton" onClick={signin}>
              Sign In
            </button>
          </form>

          <p>
            Not have an account ?{" "}
            <Link to="/signup">
              <span className="login_span_button">sign up now</span>{" "}
            </Link>
          </p>
          <button className="login_registerButton" onClick={signInwithGoogle}>
            Sign in with google
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
