import "./Message.scss";

const Message = ({props}) => {
  console.log(props);

  return (
    <div className="owner">
      <div className="message-main">
        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default Message;
