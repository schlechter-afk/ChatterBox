import { Link, useParams } from 'react-router-dom';
// import products from '../data';

import { Container, Paper, Typography } from '@material-ui/core'
import "../App.css"
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import IconButton from '@mui/material/IconButton';
import Navbar from "../component/navbar_subgreddit";
import ReactDOM from "react-dom";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import ThumbDownTwoToneIcon from '@mui/icons-material/ThumbDownTwoTone';

import displayimg from "../component/display.jpeg"

import {
  AppBar,
  Toolbar,
  CssBaseline,
  makeStyles,
  useTheme,
  colors,
} from "@material-ui/core";

import logoimg from "../component/logo.png";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LoginIcon from '@mui/icons-material/Login';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const themenew = createTheme({
  typography: {
    fontFamily: [
      'Pacifico',
      'cursive',
    ].join(','),
},});

const useStyles = makeStyles((theme) => ({
  appBar:
  {
    backgroundColor: colors.blue[500],
  },
  navlinks:
  {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: 
  {
    flexGrow: "1",
    cursor: "pointer",
    color: "black",
    marginLeft: theme.spacing(2),
  },
  button: {
    backgroundColor: 'skyblue',
    borderRadius: '30px',
    height: '90px',
    color: 'black',
    fontFamily: 'Pacifico' ,
    fontSize: '30px',
    width: '300px',
    '&:hover': {
      backgroundColor: 'magenta'
    }
  },
  logosub: 
  {
    flexGrow: "1",
    cursor: "pointer",
    color: "black",
    marginLeft: theme.spacing(2),
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
  link: 
  {
    textDecoration: "none",
    color: "black",
    // height:50,
    // width:50,
    marginLeft: theme.spacing(5),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

const mystyle1 = {
  marginTop: "1%",
  marginLeft: "0.1%",
  height: "400px",
  color: "black",
  width: "330px",
  backgroundColor: "red",
  padding: "10px",
  fontFamily: "Pacifico",
  fontColor: "black",
  fontSize: "20px",
  borderRadius: "35px",
};

const mystyle2 = {
  marginTop: "1%",
  marginLeft: "0.1%",
  height: "600px",
  color: "black",
  width: "100%",
  backgroundColor: "lime",
  padding: "10px",
  fontFamily: "Calibri",
  fontColor: "black",
  fontSize: "30px",
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

const PageSubreddit = () => {
  const { name } = useParams();
  const stylecomp = useStyles();
  const theme = useTheme();
  var [subgredditarr,setSubarr] = useState([]);
  var [displayposts,setDisplay] = useState([]);

  var emailjwt = "";
  var username = "";
  const jwt = localStorage.getItem("email");
  if(!jwt)
  {
    console.log("nahi login");
    window.location.href = "./login";
    // window.open("/login","_self");
  }
  if(jwt)
  {
    var parsedjwt = parseJwt(jwt);
    emailjwt = parsedjwt.email;
    username = parsedjwt.UserName;
  }

  function remove(props)
  {
    const newdata = {
        savedetails:props.savedetails,
    };
    const uri = "http://localhost:4003/user/updsavedposts";
    axios
      .post(uri, newdata)
      .then((response) => {
          console.log(response.data);
          setArr([]);
      })
      .catch((err) => {
          console.log(err);
          console.log("fuck hogaya in save back-front");
      });
  }
  
  const [savearr,setArr] = useState([]);

  if(savearr.length === 0)
  {
    const newdata = {
        email: emailjwt
    };
    const uri = "http://localhost:4003/user/extractsavedposts";
    axios
      .post(uri, newdata)
      .then((response) => {
          console.log(response.data);
          setArr(response.data);
      })
      .catch((err) => {
          console.log(err);
          console.log("fuck hogaya in save back-front");
      });
  }

  var objs = savearr.length;
  var heightval = objs*60 + 100;
  var strheight = heightval + "vh";
  console.log(strheight);

  return (
    <div>
    {/* <Navbar/> */}

    <AppBar position="static" className={stylecomp.appBar}>
        <ThemeProvider theme = {themenew}>
        <CssBaseline />
        <Toolbar>
          <img src={logoimg} width = {50} height = {50}></img>
          <Typography className={stylecomp.logo} style={{fontSize:39}}>
            greddit   
          </Typography>
            <div className={stylecomp.navlinks}>
              <Link to="/" className={stylecomp.link}>
                <HomeOutlinedIcon sx={{fontSize:"40px"}}/>
              </Link>
              <Link to={`/subgreddit/${name}/userssub`} className={stylecomp.logosub} style={{fontSize:29}}>
                  Users   
              </Link>
              <Link to={`/subgreddit/${name}/jrsub`} className={stylecomp.logosub} style={{fontSize:29}}>
                  Joining Requests  
              </Link>
              <Link to={`/subgreddit/${name}/statssub`} className={stylecomp.logosub} style={{fontSize:29}}>
                  Stats
              </Link>
              <Link to={`/subgreddit/${name}/reportedsub`} className={stylecomp.logosub} style={{fontSize:29}}>
                  Reported 
              </Link>
  
              <Link to="/dashboard" className={stylecomp.link}>
                <AccountBoxTwoToneIcon sx={{fontSize:"40px"}}/>
              </Link>
            </div>  
        </Toolbar>
        </ThemeProvider>
      </AppBar>

      {/* <Navbar/> */}    

        <div className='bgrepeatlogsubreddit'>
          <div style={{display:"flex",flexWrap:"wrap"}}>
            {savearr.map((follower, index) => (
              <div key={index} style={mystyle2}>
                  PostText: {follower.savedetails[0].post.posttext} <br/><br/>
                  Posted by : {follower.savedetails[0].post.postedby} <br/><br/>
                  Posted In: {follower.savedetails[0].post.postedin} <br/><br/>
                <IconButton>
                    <ThumbUpTwoToneIcon/>
                    Upvotes at time of saving: {follower.savedetails[0].post.likes} <br/>
                </IconButton>
                <br/>
                <IconButton>
                    <ThumbDownTwoToneIcon onClick/>
                    Downvotes at time of saving: {follower.savedetails[0].post.dislikes} <br/>
                </IconButton> <br></br>
                <br/>
                <button onClick={()=>remove(follower)}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default PageSubreddit;