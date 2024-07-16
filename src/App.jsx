import { Outlet } from "react-router-dom";
import "./index.scss";
import { useEffect } from "react";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "./context/userSlice";
import { useDispatch } from "react-redux";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "./config/firebase";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        const userRef = doc(db, "users", user.uid);
        onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            console.log("doc", doc.data());
            dispatch(addUser(doc.data()));
          }
        });
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
