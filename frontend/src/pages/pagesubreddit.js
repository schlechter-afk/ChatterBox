import { Link, useParams } from 'react-router-dom';
// import products from '../data';

import { Container, Paper, Typography } from '@material-ui/core'
import "../App.css"
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import Navbar from "../component/navbar_subgreddit";
import ReactDOM from "react-dom";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
  logosub: 
  {
    flexGrow: "1",
    cursor: "pointer",
    color: "black",
    marginLeft: theme.spacing(2),
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
  const jwt = localStorage.getItem("email");
  var emailjwt = "";
  if(!jwt)
  {
    console.log("nahi login");
    window.location.href = "../login";
    // window.open("/login","_self");
  }
  if(jwt)
  {
    var parsedjwt = parseJwt(jwt);
    emailjwt = parsedjwt.email;
  }

  const newUserinfo = {
    name: name,
  };

  const [checkarr,setArr] = useState([]);
  
  const urilsub = "http://localhost:4003/user/findsubgusers";
  useEffect(() => {
    console.log("enetered post useeffect");
    axios
      .post(urilsub, newUserinfo)
      .then(res => {  
        console.log("res.data in effect " , res.data); 
        setArr(res.data);
      })
      .catch(err => {
          console.log("err is :",err);
          alert("Try Again sub-length if ????!");
      });
  },[]);

  var modlist = checkarr[0]?.moderators;
  console.log(modlist);
  if(modlist?.length>0){
  console.log(modlist);
  if(!(modlist?.includes(emailjwt)))
  {
    console.log("Restricted Access!");
    alert("Restricted Access for Logged IN User");
    console.log(modlist);
    console.log(emailjwt);
    window.location.href = "../dashboard";
  }
  else{
    console.log("sahi");
  }}

  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'j' || event.key === 'J') {
        console.log("shortcut : J");
        navigate(`/subgreddit/${name}/jrsub`)
      }
      if (event.key === 's' || event.key === 'S') {
        console.log("shortcut : S");
        navigate(`/subgreddit/${name}/statssub`)
      }
      if (event.key === 'r' || event.key === 'R') {
        console.log("shortcut : R");
        navigate(`/subgreddit/${name}/reportedsub`)
      }
      if (event.key === 'u' || event.key === 'U') {
        console.log("shortcut : U");
        navigate(`/subgreddit/${name}/userssub`)
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);


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

    <div className="dashboard_style">
    <section className='section product'>
      <h2>Welcome to {name}'s page</h2>
    </section>
    </div>
    </div>
  );
};

export default PageSubreddit;