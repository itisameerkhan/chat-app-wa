import { useSelector } from "react-redux";
import ChatProfile from "../ChatProfile/ChatProfile";
import Messages from "../Messages/Messages";
import Replay from "../Reply/Reply";
import "./Chat.scss";
import Nothing from "../Nothing/Nothing";

const Chat = () => {
  const userData = useSelector((store) => store.chat);

  if (Object.keys(userData.user).length === 0) {
    return <Nothing />;
  }
  return (
    <div className="chat-main">
      <ChatProfile />
      <Messages />
      <Replay />
    </div>
  );
};

export default Chat;
