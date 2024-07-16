import ChatProfile from "../ChatProfile/ChatProfile";
import Messages from "../Messages/Messages";
import Replay from "../Reply/Reply";
import "./Chat.scss";

const Chat = () => {
  return (
    <div className="chat-main">
      <ChatProfile />
      <Messages />
      <Replay />
    </div>
  );
};

export default Chat;
