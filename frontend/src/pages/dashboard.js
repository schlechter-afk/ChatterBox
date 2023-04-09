import { Container, Paper, Typography } from '@material-ui/core'
import "../App.css"
import { useState , useEffect } from "react";
import logoimg from "./imgemb.jpg"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import Navbar from "../component/navbardash";
import { createTheme, ThemeProvider } from '@mui/material';
import ReactDOM from "react-dom";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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

const Dashboard = () => {
    const navigate = useNavigate();
    const jwt = localStorage.getItem("email");
    console.log("jwt is " + jwt);

    var emailjwt = "";
    var first_namejwt = "";
    var last_namejwt = "";
    var user_namejwt = "";
    var contactjwt = "";
    var agejwt = "";

    const [followersuserjwt, setFollowers] = useState([]);
    const [followinguserjwt, setFollowing] = useState([]);

    let [obj,setobj] = useState({});

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
                console.log("FOLLOWERS IS : " + res.data.followers); 
                setobj((obj)=> ({
                first_namejwt: res.data.first_name,
                last_namejwt : res.data.last_name,
                user_namejwt : res.data.user_name,
                agejwt : res.data.age,
                contactjwt : res.data.contact,
                }));
              })
              .catch(err => {
                  alert("Try Again Update!");
              });
        }
       
      },[]
    );

    useEffect(()=>{
      setAge(obj.agejwt);
      setContact(obj.contactjwt);
      setFirst_name(obj.first_namejwt);
      setLast_name(obj.last_namejwt);
      setUser_name(obj.user_namejwt);
      // setFollowers(obj.followersuserjwt);
      // setFollowing(obj.followinguserjwt);
    },[obj]); 

    if(!jwt)
    {
      console.log("nahi login");
      window.location.href = "./login";
      // window.open("/login","_self");
    }
    else
    {
        axios
            .get("http://localhost:4003/user/authn", {
              headers: { authorization: `Bearer: ${jwt}` }
            })
            .then(res => {
              console.log("inside auth");
            })
            .catch(err => {
              console.log("error here is -->  ", JSON.stringify(err));
              localStorage.removeItem("email");
              window.open("/login","_self");
            });
        console.log("finally done with here");
    }

    /// Gonna Add here

    // const [formData, setFormData] = useState(props.initialData);
    // const [formChanged, setFormChanged] = useState(false);

    // const handleBeforeUnload = (event) => {
    //   if (formChanged) {
    //     event.preventDefault();
    //     event.returnValue = 'Are you sure you want to leave? Your changes will be lost.';
    //   }
    // };

    /// Gonna end here
    
    const [age, setAge] = useState("");
    const [contact, setContact] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [user_name, setUser_name] = useState("");
    
    function onChangeFirstname(event) {
      setFirst_name(getValue(event));
    }
  
    function onChangeLastname(event) {
      setLast_name(getValue(event));
    }
  
    function onChangeUsername(event) {
      setUser_name(getValue(event));
    }
  
    function onChangeContact(event) {
        setContact(getValue(event));
    }
  
    function onChangeAge(event) {
        setAge(event.target.value);
    }
  
    function getValue(event) {
      return event.target.value;
    }

    const mystyle = {
      marginLeft: "200px",
      marginTop: "30px",
      height: "500px",
      color: "white",
      width: "600px",
      backgroundColor: "yellow",
      padding: "10px",
      fontFamily: "Arial",
      fontColor: "black",
      borderRadius: "35px",
    };

    console.log(obj);

    function updatefunc()
    {
      function isNumber(value) {
        const conv = +value;
        if (conv) {
            return true;
        } else {
            return false;
        }
      }
      var check = 0;
      var checka = 0;
      var checke = 0;
      var checkc = 0;
      if(!first_name || !last_name || !user_name || !age || !contact)
      {
        check = 1;
      }
      if(!isNumber(age))
      {
        check = 1;
        checka = 1;
      }
      if(!isNumber(contact))
      {
        check = 1;
        checkc = 1;
      }
      if(!check)
      {
        const newUser = {
          first_name: first_name,
          last_name: last_name,
          user_name: user_name,
          email: emailjwt,
          age: age,
          contact: contact,
          followers: followersuserjwt,
          following: followinguserjwt,
        };
    
        alert(JSON.stringify(newUser, null, 2));

        const uri = "http://localhost:4003/user/update";
        axios
            .post(uri, newUser)
            .then(res => {
              console.log("AAGAYA RETURN UPDATE!!");
            })
            .catch(err => {
                alert("Try Again Update!");
            });
      }
      else
      {
        alert("Make Valid Changes please");
        window.location.reload();
      }
    }

///////////////////////////////////// DROP-DOWN //////////////////////////////////////////////////////////////////////

    const initialFollowers = followersuserjwt;

    function FollowersDropdown() {
      const [followers, setFollowers] = useState(initialFollowers);
      const [isOpen, setIsOpen] = useState(false);
    
      function handleDelete(id) {
        const updatedFollowers = followers.filter(follower => follower.id !== id);
        setFollowers(updatedFollowers);
        console.log(updatedFollowers);
        const newUser = {
          email: emailjwt,
          followers: updatedFollowers,
        };
        const uri = "http://localhost:4003/user/updatefollowers";
        axios
            .post(uri, newUser)
            .then(res => {
               console.log("AAGAYA RETURN UPDATE FOLLOWERS!!");
            })
            .catch(err => {
                alert("Try Again Update!");
            });
      }
    
      function handleSelect(follower) {
        setIsOpen(!isOpen);
      }
    
      return (
        <Dropdown className='dropdown-toggles' isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
          <DropdownToggle caret>Followers</DropdownToggle>
          <DropdownMenu>
            {followers.map((follower, index) => (
              <DropdownItem key={index} onClick={() => handleSelect(follower.name)}>
                {follower.name} &nbsp;
                <button className="btn btn-danger btn-sm float-right" onClick={() => handleDelete(follower.id)}>
                  <DeleteOutlineIcon sx={{fontSize:"20px",backgroundColor:"red",color:"black"}}/>
                </button>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      );
    }

  //  const initialFollowing = [
  //     { id: 1, name: "Lex Fridman" },
  //     { id: 2, name: "Elon Musk" },
  //     { id: 3, name: "Virat Kohli" },
  //     { id: 4, name: "Magnus Carlsen" },
  //     { id: 5, name: "Sundar Pichai" },
  //     { id: 6, name: "Swayam Agrawal" }
  //   ];

    const initialFollowing = followinguserjwt;
    function FollowingDropdown() {
      const [following, setfollowing] = useState(initialFollowing);
      const [isOpen, setIsOpen] = useState(false);
    
      function handleDelete(id) {
        const updatedfollowing = following.filter(following => following.id !== id);
        setfollowing(updatedfollowing);
        const newUser = {
          email: emailjwt,
          following: updatedfollowing,
        };
        const uri = "http://localhost:4003/user/updatefollowing";
        axios
            .post(uri, newUser)
            .then(res => {
               console.log("AAGAYA RETURN UPDATE FOLLOWING!!");
            })
            .catch(err => {
                alert("Try Again Update!");
            });
      }
    
      function handleSelect(following) {
        setIsOpen(!isOpen);
      }
    
      return (
        <Dropdown className='dropdown-toggles' isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
          <DropdownToggle caret>Following</DropdownToggle>
          <DropdownMenu>
          {following.map((following, index) => (
              <DropdownItem key={index} onClick={() => handleSelect(following.name)}>
                {following.name} &nbsp;
                <button className="btn btn-danger btn-sm float-right" onClick={() => handleDelete(following.id)}><DeleteOutlineIcon sx={{fontSize:"20px",backgroundColor:"red",color:"black"}}/></button>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      );
    }

////////////////////////////////// DROP-DOWN //////////////////////////////////////////////////////////////////////

    return (
      <div>
        <Navbar/>
        <div className="dashboard_style">
            <div className="intro_style">
              User Profile
            </div>
            <div style={{display:"flex"}}>
            <div style={mystyle}>
              <form>
                  {" "}
                  <label style={{display:"flex"}}>
                    <div className='inputform'>
                        First Name:
                        &ensp;
                    </div>
                    <input
                        name="First Name"
                        type="text"
                        value={first_name}
                        disabled={false}
                        onChange={onChangeFirstname}
                        className='inputformtext'
                        />
                  </label>
                  <br></br><br></br>
                  <label style={{display:"flex"}}>
                    <div className='inputform'>
                        Last Name:
                        &ensp;
                    </div>
                    <input
                        name="Last Name"
                        type="text"
                        value={last_name}
                        disabled={false}
                        onChange={onChangeLastname}
                        // style={{background}}
                        className='inputformtext'
                        />
                  </label>
                  <br></br><br></br>
                  <label style={{display:"flex"}}>
                    <div className='inputform'>
                        User Name:
                        &ensp;
                    </div>
                    <input
                        name="User Name"
                        type="text"
                        value={user_name}
                        disabled={false}
                        onChange={onChangeUsername}
                        className='inputformtext'
                        />
                  </label>
                  <br></br><br></br>
                  <label style={{display:"flex"}}>
                    <div className='inputform'>
                        Age:
                        &ensp;
                    </div>
                    <input
                        name="Age"
                        type="text"
                        value={age}
                        disabled={false}
                        onChange={onChangeAge}
                        className='inputformtext'
                        />
                  </label>
                  <br></br><br></br>
                  <label style={{display:"flex"}}>
                    <div className='inputform'>
                        Contact:
                        &ensp;
                    </div>
                    <input
                        name="Contact"
                        type="text"
                        value={contact}
                        disabled={false}
                        onChange={onChangeContact}
                        className='inputformtext'
                        />
                  </label>
                  <br></br><br></br>
                  <label style={{display:"flex"}}>
                    <div className='inputform'>
                        Email:
                        &ensp;
                    </div>
                    <input
                        name="Email"
                        type="text"
                        value={emailjwt}
                        disabled={true}
                        className='inputformtext'
                        />
                  </label>
                  <button onClick={updatefunc} className='updatebtn'> Update </button>
              </form>
            </div>
            {/* <button className='followers'> Followers </button>
            <button className='following'> Following </button> */}
            <div className='dropcl'>
              <FollowersDropdown/>
              &nbsp;
              &nbsp;
              <FollowingDropdown/>
            </div>
            </div>
        </div>
      </div>
    )
}

export default Dashboard;


//////////