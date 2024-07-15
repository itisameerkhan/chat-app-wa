import { useState } from "react";
import "./Login.scss";
import { auth, googleAuth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  AuthErrorCodes,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Spinner from "../../components/Spinner/Spinner";

const Login = () => {
  const [loginState, setLoginState] = useState("signup");
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    password: "",
    photoURL: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [errMsg, setErrMsg] = useState({
    error: false,
    message: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setErrMsg({
      error: false,
      message: "",
    });

    if (
      userData.displayName === "" ||
      userData.email === "" ||
      userData.photoURL === "" ||
      userData.password === ""
    ) {
      setErrMsg({
        message: "All fields mandatory",
        error: true,
      });
      return;
    }

    try {
      setShowSpinner(true);
      if (loginState === "signup") {
        const response = await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
        console.log(response);
      } else {
        const response = await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
        console.log(response);
      }
      setShowSpinner(false);
    } catch (e) {
      setShowSpinner(false);
      console.log(e);
      if (e.code === AuthErrorCodes.EMAIL_EXISTS) {
        setErrMsg({
          error: true,
          message: "email already in use",
        });
      } else if (e.code === AuthErrorCodes.WEAK_PASSWORD) {
        setErrMsg({
          error: true,
          message: "Password atleast 6 characters",
        });
      } else if (e.code === AuthErrorCodes.INVALID_EMAIL) {
        setErrMsg({
          error: true,
          message: "Invalid email address",
        });
      } else if (e.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
        setErrMsg({
          error: true,
          message: "Invalid credentials",
        });
      }
    }
  };

  const handleGoogleSubmit = async () => {
    try {
      const response = await signInWithPopup(auth, googleAuth);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-main">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="login">
          <p className="login-title">
            {loginState === "signup" ? "Sign up" : "Login"}
          </p>
          {loginState === "signup" && (
            <div>
              <label>display name</label>
              <input
                type="text"
                value={userData.displayName}
                name="displayName"
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            <label>Email</label>
            <input
              type="email"
              value={userData.email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="pass-form">
            <label>Password</label>
            <input
              type={showPass ? "text" : "password"}
              value={userData.password}
              name="password"
              onChange={handleChange}
            />
            {showPass ? (
              <span
                className="material-symbols-outlined"
                onClick={() => setShowPass(false)}
              >
                visibility_off
              </span>
            ) : (
              <span
                className="material-symbols-outlined"
                onClick={() => setShowPass(true)}
              >
                visibility
              </span>
            )}
          </div>
          {loginState === "signup" && (
            <div>
              <label>profile</label>
              <input
                type="file"
                className="login-file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleChange}
                name="photoURL"
              />
            </div>
          )}
          <div className="pad"></div>
          <button onClick={handleSubmit}>
            {showSpinner ? (
              <Spinner />
            ) : loginState === "signup" ? (
              "Sign up"
            ) : (
              "Login"
            )}
          </button>
          <button className="google-btn" onClick={handleGoogleSubmit}>
            <img
              src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-tmg5cp5v.png"
              alt=""
            />
            Sign in with Google
          </button>
          <p
            className="login-already"
            onClick={() =>
              setLoginState(loginState === "signup" ? "login" : "signup")
            }
          >
            {loginState === "signup"
              ? "Already having an account? Login"
              : "Not having an account? Create one."}
          </p>
          {errMsg.error && <p className="err-msg">{errMsg.message}</p>}
        </div>
      </form>
    </div>
  );
};

export default Login;
