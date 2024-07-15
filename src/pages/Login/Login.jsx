import { useState } from "react";
import "./Login.scss";
import { auth, googleAuth, storage, db } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  AuthErrorCodes,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import Spinner from "../../components/Spinner/Spinner";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

const Login = () => {
  const [loginState, setLoginState] = useState("signup");
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    password: "",
    photoURL: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
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

  const handleUploadImage = async () => {
    try {
      const imgRef = ref(storage, `profile/${photoFile.name}`);
      await uploadBytes(imgRef, photoFile);
      const photoURL = await getDownloadURL(imgRef);
      setUserData({
        ...userData,
        photoURL: photoURL,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    setErrMsg({
      error: false,
      message: "",
    });

    if (
      userData.email === "" ||
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
        handleUploadImage();
        const userRef = await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
        await updateProfile(auth.currentUser, {
          displayName: userData.displayName,
          photoURL: userData.photoURL,
        });

        console.log(auth.currentUser);
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          displayName: userData.displayName,
          photoURL: userData.photoURL,
          uid: auth.currentUser.uid,
          email: userData.email,
        });

        await setDoc(doc(db, "userChat", userRef.user.uid), {});
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
      const userRef = await signInWithPopup(auth, googleAuth);
      await setDoc(doc(db, "users", userRef.user.uid), {
        displayName: userRef.user.displayName,
        photoURL: userRef.user.photoURL,
        email: userRef.user.email,
        uid: userRef.user.uid,
      });
      await setDoc(doc(db, "userChat", userRef.user.uid), {});
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
                onChange={(e) => setPhotoFile(e.target.files[0])}
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
