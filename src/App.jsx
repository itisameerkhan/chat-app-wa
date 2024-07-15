import { Outlet } from "react-router-dom";
import "./index.scss";
import { useEffect } from "react";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "./context/userSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        const userData = {
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          email: user.email,
        };
        dispatch(addUser(userData));
        navigate("/home");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="app">
      <Outlet />
    </div>
  );
};

export default App;
