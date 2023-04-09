import { Container, Paper, Typography } from '@material-ui/core'
import "../App.css"
import "../component/messenger.css"
import { useState , useEffect, useRef } from "react";
import logoimg from "./imgemb.jpg"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import Navbar from "../component/Navbar";
import { createTheme, ThemeProvider } from '@mui/material';
import ReactDOM from "react-dom";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import Conversation from './conversations';
import Message from './message_user';
import ChatOnline from './chat_online';
import { io } from "socket.io-client";

const theme = createTheme({
  typography: {
    fontFamily: [
      'Pacifico',
      'cursive',
    ].join(','),
},});

const mystyle = {
  marginLeft: "200px",
  marginTop: "30px",
  height: "500px",
  color: "white",
  width: "700px",
  backgroundColor: "yellow",
  padding: "10px",
  fontFamily: "Arial",
  fontColor: "black",
  borderRadius: "35px",
};

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const Messenger = () => {

    // Extract Context of logged in user/////////////////////////////////////////

    const jwt = localStorage.getItem("email");
    console.log("jwt is " + jwt);

    var emailjwt = "";

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [curr_id,setUserId] = useState("");
    const [user_data,setUserData] = useState({});
    const [newMessage, setNewMessage] = useState("");
    // const [socketport,setSocket] = useState(null);
    const socketport = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const [followersuserjwt, setFollowers] = useState([]);
    const [followinguserjwt, setFollowing] = useState([]);

    if(jwt)
    {
      var parsedjwt = parseJwt(jwt);
      emailjwt = parsedjwt.email;
    }

    const newUserinfo = {
      email: emailjwt,
    };

    useEffect(
      ()=>{
        if(jwt)
        {
          const uril = "http://localhost:4003/user/find";
          axios
              .post(uril, newUserinfo)
              .then(res => {      
                setFollowers(res.data.followers);
                setFollowing(res.data.following);
                setUserId(res.data._id);
                setUserData(res.data);
              })
              .catch(err => {
                  alert("Try Again Update!");
              });
        }  
      },[]
    );

    console.log("hello :",user_data);

    /////////////////////////////////////////////////////////////////////


    //// Extracting Conversations

    useEffect(() => {
      socketport.current = io("http://localhost:4003");
      socketport.current.on("getMessage", (data) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
        });
      });
    }, []);

    // useEffect(()=>{
    //   setSocket(io("ws://localhost:8900"))
    // },[])

    // useEffect(()=>{
    //   socketport?.on("welcome",message=>{
    //     console.log(message);
    //   })
    // },[socketport])

    useEffect(() => {
      arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);
  
    useEffect(() => {
      socketport.current.emit("addUser", curr_id);
      socketport.current.on("getUsers", (users) => {
      console.log("user-data: ",users);
        setOnlineUsers(
          // 
          users
        );
      });
    }, [user_data]);

    useEffect(() => {
      const getConversations = async () => {
        try {
          const res = await axios.get("http://localhost:4003/user/conv/" + curr_id);
          console.log(res);
          console.log("success in extracting conversations: ",res.data);
          setConversations(res.data);
        } catch (err) {
          console.log("failure in extracting conversations: ",err);
          // console.log(err);
        }
      };
      getConversations();
    }, [curr_id]);

    useEffect(() => {
      const getMessages = async () => {
        try {
          const res = await axios.get("http://localhost:4003/user/mssg/" + currentChat?._id);
          setMessages(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getMessages();
    }, [currentChat]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const message = {
        sender: curr_id,
        text: newMessage,
        conversationId: currentChat._id,
      };
  
      const receiverId = currentChat.members.find(
        (member) => member !== curr_id
      );
  
      socketport.current.emit("sendMessage", {
        senderId: curr_id,
        receiverId,
        text: newMessage,
      });
  
      try {
        const res = await axios.post("http://localhost:4003/user/mssgsave", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    };

    /////////////////////////////

    return (
      <div style={{height:"300%"}}>
        <Navbar/>
        <div className='messenger'>
            <div className='chatMenu'>
                <div className='chatMenuWrapper'>
                    View All Chats
                    {/* <Conversation/> */}
                    {conversations.map((c) => (
                      <div onClick={() => setCurrentChat(c)}>
                        <Conversation conversation={c} currentUser_id={curr_id} />
                      </div>
                    ))}
                </div>
            </div>
            <div className='chatBox'>
                <div className="chatBoxWrapper">
                {currentChat ? (
                  <>
                    <div className="chatBoxTop">
                      {messages.map((m) => (
                        // <div ref={scrollRef}>
                          <Message message={m} own={m.sender === curr_id} />
                        // </div>
                      ))}
                    </div>
                    <div className="chatBoxBottom">
                      <textarea
                        className="chatMessageInput"
                        placeholder="write something..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                      ></textarea>
                      <button className="chatSubmitButton" onClick={handleSubmit}>
                        Send
                      </button>
                    </div>
                  </>
                ) : (
                  <span className="noConversationText">
                    Open a conversation to start a chat.
                  </span>
                )}
                </div>
            </div>
            <div className="chatOnline">
              <div className="chatOnlineWrapper">
                Users with whom Chatting is Possible :
                <ChatOnline
                  onlineUsers={onlineUsers}
                  currentId={curr_id}
                  setCurrentChat={setCurrentChat}
                  setConversations={setConversations}
                />
              </div>
            </div>
        </div>
      </div>
    )
}

export default Messenger;

//////////