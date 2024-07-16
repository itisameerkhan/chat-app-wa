import { useSelector } from "react-redux";
import "./Overview.scss";
import { db } from "../../config/firebase";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const Overview = () => {
  const filteredUsers = useSelector((store) => store.filteredSearch.users);
  const currentUser = useSelector((store) => store.user);

  if (filteredUsers.length === 0) return "";

  const handleSelect = async (data) => {
    console.log(data);
    const combinedId =
      currentUser.uid > data.uid
        ? currentUser.uid + data.uid
        : data.uid + currentUser.uid;
    try {
      const response = await getDoc(doc(db, "chats", combinedId));
      if (!response.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db, "userChat", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: data.uid,
            displayName: data.displayName,
            photoURL: data.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="chat-overview">
      {filteredUsers.map((data) => (
        <div
          className="chat-overview-main"
          key={data.uid}
          onClick={() => handleSelect(data)}
        >
          <img src={data.photoURL} alt="profile" />
          <div className="chat-o-1">
            <p>{data.displayName}</p>
            <p>hi how are you</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Overview;
