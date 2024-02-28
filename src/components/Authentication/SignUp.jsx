import React, { useContext, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/MyContext";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { fireDB, auth } from "../../firebase/firebase";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import logo from "../../images/ecom-icon.png";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const signup = async (e) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      return toast.error("All fields are required", {
        position: "top-right",
        autoClose: 5000,
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
      const users = await createUserWithEmailAndPassword(auth, email, password);

      const user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
        time: Timestamp.now(),
      };

      const userRef = collection(fireDB, "users");
      await addDoc(userRef, user);
      toast.success("Signup Succesful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/login");
      setLoading(false);

      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      toast.error("Signup failed", {
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
          <h1>Sign-up</h1>

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
            <h5>Name</h5>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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

            <button className="login_signInButton" onClick={signup}>
              Sign up
            </button>
          </form>

          <p>
            Have an account ?{" "}
            <Link to={"/login"}>
              <span className="login_span_button">Login</span>
            </Link>
            <br />
            By continuing, you agree to Shopie's Conditions of Use and Privacy
            Notice.
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
