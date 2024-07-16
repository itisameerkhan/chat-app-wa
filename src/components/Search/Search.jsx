import "./Search.scss";
import { db } from "../../config/firebase.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFiltered, removeFilter } from "../../context/searchUser.js";
import { collection, getDocs, query, where } from "firebase/firestore";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredUser, setFilteredUser] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    if (e.code === "Enter") {
      console.log("submit");
      try {
        dispatch(removeFilter());
        const collectionRef = collection(db, "users");
        const q = query(collectionRef, where("displayName", "==", searchInput));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          dispatch(addFiltered(doc.data()));
          setFilteredUser([...filteredUser, doc.data()]);
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="search">
      <div className="search-main">
        <span className="material-symbols-outlined">search</span>
        <input
          type="text"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          onKeyDown={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Search;
