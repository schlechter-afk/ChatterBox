import { Link, useParams } from 'react-router-dom';
// import products from '../data';

import { Container, Paper, Typography } from '@material-ui/core'
import "../App.css"
import { useState , useEffect } from "react";
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

const mystyle1 = {
  marginTop: "4%",
  marginLeft: "5%",
  height: "500px",
  color: "black",
  width: "430px",
  backgroundColor: "yellow",
  padding: "10px",
  fontFamily: "Pacifico",
  fontColor: "black",
  fontSize: "20px",
  borderRadius: "35px",
};

const mystyle2 = {
  marginTop: "1%",
  marginLeft: "5%",
  height: "500px",
  color: "black",
  width: "430px",
  backgroundColor: "yellow",
  padding: "10px",
  fontFamily: "Pacifico",
  fontColor: "black",
  fontSize: "20px",
  borderRadius: "35px",
};

// const newUserinfo = {
//   name : name,
// };

// const urilsub = "http://localhost:4003/user/findsubgusers";

// console.log("starting axios first");

// if(subgredditarr.length === 0)
// {
//   console.log("starting axios second");
//   axios
//     .post(urilsub, newUserinfo)
//     .then(res => {   
//       console.log("in axios")
//       setSubarr(res.data);
//       console.log(subgredditarr); 
//     })
//     .catch(err => {
//         alert("Try Again sub-length if!");
//     });
// }
// console.log("ending axios");
// console.log(subgredditarr);

const PageSubreddit = () => {
  const { name } = useParams();
  var [peoplefollow,setPeople] = useState([]);
  var [peopleblocked,setPeopleBlocked] = useState([]);
  const newUserinfo = {
    name : name,
  };
  const jwt = localStorage.getItem("email");
  if(!jwt)
  {
    console.log("nahi login");
    window.location.href = "./login";
    // window.open("/login","_self");
  }
  
  const urilsub = "http://localhost:4003/user/findsubgusers";
  
  console.log("starting axios first");
  useEffect(()=>{
    // if(peoplefollow?.length === 0)
    {
      console.log("starting axios second");
      axios
        .post(urilsub, newUserinfo)
        .then(res => {   
          console.log("in axios");
          console.log(res.data);
          setPeople(res.data[0].people);
          setPeopleBlocked(res.data[0].blocked);
          // console.log(peoplefollow);
          // console.log(peopleblocked); 
        })
        .catch(err => {
            alert("Try Again sub-length if!");
        });
    }
  },[])
  
  console.log("ending axios");
  console.log("printing data");
  console.log(peopleblocked);
  console.log(peoplefollow);
  return (
    <div>
    <Navbar/>
    <div className="dashboard_style">
    <section className='section product'>
      <h2>Welcome to {name}'s usersubpage</h2>
    </section>
    <div style={{display:"flex" , flexWrap:"wrap"}}>
    <div style={mystyle2}>
    Followers <br/><br/>
                {peoplefollow?.map((follower, index) => (
                  <div key={index}>
                    <h3>{follower}</h3>
                  </div>
                ))}
    </div>
    <div style={mystyle2}>
      Blocked People <br/><br/>
                {peopleblocked?.map((follower, index) => (
                  <div key={index}>
                    <h3>{follower}</h3>
                  </div>
                ))}
    </div>
    </div>
    </div>
    </div>
  );
};

export default PageSubreddit;