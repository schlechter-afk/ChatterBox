import axios from "axios";
import { useEffect, useState } from "react";
import "../component/conversation.css";

export default function Conversation({ conversation, currentUser_id }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(currentUser_id);
    const friendId = conversation.members.find((m) => m !== currentUser_id);
    console.log("found friends id: ",friendId);

    const newUser = {
      id: friendId,
    };

    const uri = "http://localhost:4003/user/findbyid";
    axios
        .post(uri, newUser)
        .then(res => {
          console.log("Succes in finding ID Dets of friend!!");
          setUser(res.data);
        })
        .catch(err => {
            console.log("err in frnd id");
            console.log(err);
        });
  }, [currentUser_id, conversation]);

  return (
    <div className="conversation">
      <span className="conversationName">{user?.user_name}</span>
    </div>
  );
}