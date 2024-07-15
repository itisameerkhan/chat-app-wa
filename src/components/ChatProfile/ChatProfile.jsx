import "./ChatProfile.scss";

const ChatProfile = () => {
  return (
    <div className="chat-profile">
      <div className="c-p-1">
        <img
          src="https://media-maa2-2.cdn.whatsapp.net/v/t61.24694-24/431465580_414909898216699_1511157569772231276_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_Q5AaIALUCaXyHNMrJPra0oSwwrefM9xwyC6Ij3pdclRcKZ3s&oe=66A23863&_nc_sid=e6ed6c&_nc_cat=100"
          alt=""
        />
        <p>Ameer khan</p>
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
