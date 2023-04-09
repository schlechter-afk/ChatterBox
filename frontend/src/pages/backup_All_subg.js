import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "../component/navbarlogin";
import axios from "axios";

import "../App.css";
import { Navigate, useNavigate, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

  button: {
    backgroundColor: 'yellow',
    borderRadius: '10%',
    height: '100px',
    color: 'black',
    fontFamily: 'Pacifico' ,
    width: '270px',
    '&:hover': {
      backgroundColor: 'skyblue'
    }
  },

  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
}
  

const FormModal = () => {
  const classes = useStyles();
  var emailjwt = "";
  const jwt = localStorage.getItem("email");
  if(jwt)
  {
    var parsedjwt = parseJwt(jwt);
    emailjwt = parsedjwt.email;
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

  const navigate = useNavigate();

  var [subgredditarr,setSubarr] = useState([]);

  const openfunc = (props) => {
    console.log("in openfunc");
    // navigate('./pagesubreddit');
    // var url = "./pagesubreddit/";
    // url = url + props;
    // console.log(url);
    // window.location.href = url;
    // console.log("in end openfunc");
  }

  const deletefunc = (event) => {
    console.log("in deletefunc");
    console.log(event);
    const subinfo = {
      name: event,
    };
    const uridel = "http://localhost:4003/user/deletesubg";
    axios
    .post(uridel, subinfo)
    .then(res => {   
      console.log("success in axios delete");
      setSubarr([]);
    })
    .catch(err => {
        console.log("failure in axios delete");
    });
  }


  const newUserinfo = {
    // email: emailjwt,
  };
  
  const urilsub = "http://localhost:4003/user/findallsubg";

  console.log("starting axios first");

  if(subgredditarr.length === 0)
  {
    console.log("starting axios second");
    axios
      .post(urilsub, newUserinfo)
      .then(res => {   
        console.log("in axios")
        setSubarr(res.data);
        console.log(subgredditarr); 
      })
      .catch(err => {
          alert("Try Again sub-length if!");
      });
  }
  console.log("ending axios");
  console.log(subgredditarr); 

  var objs = subgredditarr.length;
  objs = objs + 3 - objs % 3;
  objs = objs/3;
  var heightval = objs*37 + 100;
  var strheight = heightval + "vh";
  console.log(objs);

  return (
    <div>
    <Navbar></Navbar>
    <div className='bgrepeatlogsubreddit' style={{height: strheight}}>
        <div>
              <div className='subonmod'> All Existing Sub-Greddits </div>
              <div style={{display:"flex",flexWrap:"wrap"}}>
                {subgredditarr.map((follower, index) => (
                  <div key={index} style={mystyle1}>
                    Name: {follower.name} <br></br><br></br>
                    Description: {follower.description} <br></br><br></br>
                    Tags: {follower.tags} <br></br><br></br>
                    Banned Words: {follower.banned} <br></br><br></br>
                    Number of Posts: {follower.posts.length} <br></br><br></br>
                    Number of Followers: {follower.people.length} <br></br><br></br>
                    Number of Blocked Users: {follower.blocked.length} <br></br><br></br> 
                    <Link to={`/subgreddit/${follower.name}`}>more info</Link>
                    <button onClick={() => openfunc(follower.name)}> Open </button> &nbsp; &nbsp;
                    <button onClick={() => deletefunc(follower.name)}> Delete </button>
                  </div>
                ))}
              </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;