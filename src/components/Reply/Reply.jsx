import "./Reply.scss";

const Reply = () => {
  return (
    <div className="reply">
      <div className="reply-main">
        <input type="text" placeholder="Type a message" />
        <div className="img-reply">
          <input type="file" className="img-reply-input" id="file-input-1" />
          <label htmlFor="file-input-1" className="img-reply-label">
            <span className="material-symbols-outlined">attach_file</span>
          </label>
        </div>
        <span className="material-symbols-outlined">send</span>
      </div>
    </div>
  );
};

export default Reply;
