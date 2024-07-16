import { useState } from "react";
import "./Reply.scss";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

const Reply = () => {
  const [text, setText] = useState("");
  const [imgFile, setImgFile] = useState(null);

  const chatData = useSelector((store) => store.chat);
  const currentUser = useSelector((store) => store.user);

  const handleSend = async () => {
    if (imgFile) {
    }
    console.log("hadnles sened");
    try {
      await updateDoc(doc(db, "chats", chatData.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    } catch (error) {
      console.log(error);
    }
    setText("");
  };
  return (
    <div className="reply">
      <div className="reply-main">
        <input
          type="text"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="img-reply">
          <input
            type="file"
            className="img-reply-input"
            id="file-input-1"
            onChange={(e) => setImgFile(e.target.files[0])}
          />
          <label htmlFor="file-input-1" className="img-reply-label">
            <span className="material-symbols-outlined">attach_file</span>
          </label>
        </div>
        <span className="material-symbols-outlined" onClick={handleSend}>
          send
        </span>
      </div>
    </div>
  );
};

export default Reply;
