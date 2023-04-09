import "../component/message_user.css";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
    {/* <div className="message"> */}
      <div className="messageTop">
        <p className="messageText">{message.text}</p>
      </div>
    </div>
  );
}