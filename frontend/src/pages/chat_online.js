import axios from "axios";
import { useEffect, useState } from "react";
import "../component/chat_online.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat,setConversations }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
        const newUser = {
            id: currentId,
        };
        const uri = "http://localhost:4003/user/findbyid";
        axios
            .post(uri, newUser)
            .then(res => {
                console.log("Success in finding friends bro!!");
                var arr = [];
                console.log(res.data.followers);
                console.log(res.data.following);
                for(let i = 0 ; i < res.data.followers.length;i++)
                {
                    let ok = 0;
                    for(let j=0;j<res.data.following.length;j++)
                    {
                        if(res.data.following[j].name == res.data.followers[i].name)
                        {
                            ok = 1;
                            break;
                        }
                    }
                    if(ok == 1)
                    {
                        arr.push(res.data.followers[i]);
                    }
                }
                setFriends(arr);
                const data = {info:arr};
                console.log(data);
                axios
                  .post("http://localhost:4003/user/findallarr",data)
                  .then(res => {
                    console.log("^^^^^");
                    console.log(res.data);
                    setOnlineFriends(res.data);
                  })
                  .catch(err => {
                      console.log("err in inner: ",err);
                  })
            })
            .catch(err => {
                console.log("err in frnd id");
                console.log(err);
            });
    };
    getFriends();
  }, [currentId]);

//   useEffect(() => {
//     setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
//   }, [friends, onlineUsers]);
// /find/${currentId}/${user._id}

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:4003/user/find/${currentId}/${user._id}`
      );
      console.log("conv dets: ",res.data);
      if(!(res.data))
      {
        console.log("no history exists");
        const payload = {
            senderId: currentId,
            receiverId: user._id,
        }
        axios
            .post("http://localhost:4003/user/saveconv",payload)
            .then(res=>{
                console.log(res.data);
                const getConversations = async () => {
                    try {
                      const res = await axios.get("http://localhost:4003/user/conv/" + currentId);
                      console.log(res);
                      console.log("success in extracting conversations: ",res.data);
                      setConversations(res.data);
                    } catch (err) {
                      console.log("failure in extracting conversations: ",err);
                      // console.log(err);
                    }
                  };
                getConversations();
            })
            .catch(err=>{
                console.log(err);
            });
      }
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log("online friends: ",onlineFriends);

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <span className="chatOnlineName">{o?.user_name}</span>
        </div>
      ))}
    </div>
  );
}