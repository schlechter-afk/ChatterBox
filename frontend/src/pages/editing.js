import { Container, Paper, Typography } from '@material-ui/core'
import "../App.css"
import logoimg from "./imgemb.jpg"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import Navbar from "../component/navbardash";
import { createTheme, ThemeProvider } from '@mui/material';
import ReactDOM from "react-dom";
import EditableTextField from "../component/editable_text";
import {Label} from 'semantic-ui-react';

import {editage,edituser,editlast,editfirst,editcontact} from "../component/editable_text";
import React from 'react';

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

// localStorage.setItem('userInfo', JSON.stringify(user))

// const userInfo = JSON.parse(localStorage.getItem('userInfo'));

// const newUpdatedUserInfo = {
//   ...userInfo,
//   "token": "new-token-adkadjhk2h3hkhkhkh"
// };

// localStorage.setItem('userInfo', JSON.stringify(newUpdatedUserInfo))

const Dashboard = () => {
    const navigate = useNavigate();
    const jwt = localStorage.getItem("email");
    console.log("jwt is " + jwt);

    let [obj,setdat] = React.useState({});

    var emailjwt = "";

    if(jwt)
    {
      console.log("enter jwt if");
      var parsedjwt = parseJwt(jwt);
      emailjwt = parsedjwt.email;  
    }

    const newUserinfo = {
      email: emailjwt,
    };


    const uril = "http://localhost:4003/user/find";

    React.useEffect(()=>{
      console.log("cool doodh")
      setdat((prev)=> ({...prev,
              first_namejwt: "jaiho",
              last_namejwt : "jaiho",
              user_namejwt : "jaiho",
              agejwt : "jaiho",
              contactjwt : "jaiho"
            }))
      // axios
      //   .post(uril, newUserinfo)
      //   .then(res => {
      //     console.log("Success in finding");
      //     setobj((obj)=> ({
      //       first_namejwt: res.data.first_name,
      //       last_namejwt : res.data.last_name,
      //       user_namejwt : res.data.user_name,
      //       agejwt : res.data.age,
      //       contactjwt : res.data.contact
      //     }))
      //   })
      //   .catch(err => {
      //       alert("Try Again Find!");
      //   });
    },[]);

    console.log("bbbbbbbb");
  

    function updatefunc()
    {
      console.log(editage);
      console.log("* "  + editage);
      console.log("* "  + editfirst);
      console.log("* "  + editlast);
      console.log("* "  + edituser);
      console.log("* "  + editcontact);

      // if(editage)
      // {
      //   agejwt = editage;
      // }
      // if(editfirst)
      // {
      //   first_namejwt = editfirst;
      // }
      // if(editlast)
      // {
      //   last_namejwt = editlast;
      // }
      // if(edituser)
      // {
      //   user_namejwt = edituser;
      // }
      // if(editcontact)
      // {
      //   contactjwt = editcontact;
      // }
      // console.log(agejwt);
      // console.log(first_namejwt);
      // console.log(last_namejwt);
      // console.log(user_namejwt);
      // console.log(contactjwt);

      // const newUser = {
      //   first_name: first_namejwt,
      //   last_name: last_namejwt,
      //   user_name: user_namejwt,
      //   email: emailjwt,
      //   age: agejwt,
      //   contact: contactjwt,
      // };
  
      // alert(JSON.stringify(newUser, null, 2));

      // const uri = "http://localhost:4003/user/update";
      // axios
      //     .post(uri, newUser)
      //     .then(res => {
      //        console.log("AAGAYA RETURN UPDATE!!");
      //     })
      //     .catch(err => {
      //         alert("Try Again Update!");
      //     });
    }

    if(!jwt)
    {
      console.log("nahi login");
      window.location.href = "./login";
      // window.open("/login","_self");
    }
    else
    {
        console.log("entering not jwt if");
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

    console.log("***" + obj.first_namejwt);
    console.log("***" + obj.last_namejwt);
    console.log("***" + obj.user_namejwt);
    console.log("***" + obj.agejwt);

    return (
        <div>
        <Navbar/>
        <div className="dashboard_style">
          <div className="intro_style">
            User Profile
          </div>
          <div style = {mystyle}>
          <div style={{display: "flex" }}>
        <Label style={{color: "Black",marginLeft: "40px", marginTop: "22px", marginRight: "30px" , fontSize: "20px",fontFamily:"Pacifico"}}> First Name :  </Label>
        <EditableTextField namecl ="firstcl" value ={obj.first_namejwt} />
        </div>

        <div style={{display: "flex" }}>
        <Label style={{color: "Black",marginLeft: "40px", marginTop: "22px", marginRight: "35px" , fontSize: "20px",fontFamily:"Pacifico" }}> Last Name :  </Label>
        <EditableTextField namecl ="lastcl" value={obj.last_namejwt} />
        </div>

        <div style={{display: "flex" }}>
        <Label style={{color: "Black",marginLeft: "40px", marginTop: "22px", marginRight: "43px" , fontSize: "20px",fontFamily:"Pacifico" }}> Username :  </Label>
        <EditableTextField namecl ="usercl" value={obj.user_namejwt} />
        </div>

        <div style={{display: "flex" }}>
        <Label style={{color: "Black",marginLeft: "40px", marginTop: "22px", marginRight: "95px" , fontSize: "20px",fontFamily:"Pacifico" }}> Age :  </Label>
        <EditableTextField namecl ="agecl" value={obj.agejwt} />
        </div>

        <div style={{display: "flex" }}>
        <Label style={{color: "Black",marginLeft: "40px", marginTop: "22px", marginRight: "75px" , fontSize: "20px",fontFamily:"Pacifico" }}> Email :  </Label>
        <EditableTextField value={emailjwt}/>
        </div>

        <div style={{display: "flex" }}>
        <Label style={{color: "Black",marginLeft: "40px", marginTop: "22px", marginRight: "59px" , fontSize: "20px",fontFamily:"Pacifico" }}> Contact :  </Label>
        <EditableTextField namecl ="contactcl" value={obj.contactjwt}/>
        </div>
        <button className='updatebtn' onClick={updatefunc}> Update </button>
        </div>
        </div>
        </div>
    )
}

export default Dashboard;