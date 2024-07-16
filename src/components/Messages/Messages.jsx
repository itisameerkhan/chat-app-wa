import { useEffect, useState } from "react";
import Message from "../Message/Message";
import "./Messages.scss";
import { useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";

const Messages = () => {
  const userData = useSelector((store) => store.chat);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "chats", userData.chatId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages);
        console.log(doc.data().messages);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [userData.chatId]);

  console.log(messages);
  return (
    <div className="messages-main">
      {messages.map((data) => (
        <Message props={data} key={data.id} />
      ))}
    </div>
  );
};

export default Messages;
