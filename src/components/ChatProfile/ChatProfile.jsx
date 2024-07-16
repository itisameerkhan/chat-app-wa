import "./ChatProfile.scss";
import { useSelector } from "react-redux";

const ChatProfile = () => {
  const userData = useSelector((store) => store.chat.user);

  return (
    <div className="chat-profile">
      <div className="c-p-1">
        <img src={userData.userInfo?.photoURL} alt="" />
        <p>{userData.userInfo?.displayName}</p>
      </div>
      <div className="c-p-2">
        <span className="material-symbols-outlined">call</span>
        <span className="material-symbols-outlined">videocam</span>
        <span className="material-symbols-outlined">more_vert</span>
      </div>
    </div>
  );
};

export default ChatProfile;
