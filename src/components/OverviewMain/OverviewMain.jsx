import { useEffect, useState } from "react";
import "./OverviewMain.scss";
import { useDispatch, useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { addChatUser } from "../../context/chatSlice";

const OverviewMain = () => {
  const currentUser = useSelector((store) => store.user);
  const [chatData, setChatData] = useState([]);
  const dispatch = useDispatch();

  const handleSelect = (user) => {
    dispatch(addChatUser(user));
  };

  useEffect(() => {
    const getChats = () => {
      const unsubscribe = onSnapshot(
        doc(db, "userChat", currentUser.uid),
        (user) => {
          console.log(user.data());
          const tempData = Object.keys(user.data()).map((key) => {
            return { id: key, ...user.data()[key] };
          });
          console.log(tempData);
          setChatData(tempData);
        }
      );

      return () => {
        unsubscribe();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  return (
    <div className="over-main">
      {chatData.map((data) => (
        <div
          className="chat-overview-main"
          key={data.id}
          onClick={() => handleSelect(data)}
        >
          <img src={data.userInfo.photoURL} alt="profile" />
          <div className="chat-o-1">
            <p>{data.userInfo.displayName}</p>
            <p>hi how are you</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewMain;
