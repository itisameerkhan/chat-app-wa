import "./Nav.scss";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

const Nav = () => {
  const userData = useSelector((store) => store.user);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="nav-main">
      <div className="nav-inner">
        <img src={userData.photoURL} alt="" />
        <p>Hiya, {userData.displayName}!</p>
      </div>
      <span className="material-symbols-outlined" onClick={handleSignOut}>
        logout
      </span>
    </div>
  );
};

export default Nav;
