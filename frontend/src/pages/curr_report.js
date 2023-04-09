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
  backgroundColor: "yellow",
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

const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "your_email@gmail.com",
    pass: "your_password",
  },
});

let mailOptions = {
  from: '"Your Name" <your_email@gmail.com>', // sender address
  to: "blocked_user_email@example.com, user_blocking_email@example.com", // list of receivers
  subject: "User Blocked", // Subject line
  text: "You have been blocked by a user on our platform.", // plain text body
};

const PageSubreddit = () => {
  const { name } = useParams();
  const stylecomp = useStyles();
  const theme = useTheme();
  var emailjwt = "";
  var username = "";
  const jwt = localStorage.getItem("email");
  if(jwt)
  {
    var parsedjwt = parseJwt(jwt);
    emailjwt = parsedjwt.email;
    username = parsedjwt.UserName;
  }
  const [savearr,setArr] = useState([]);
  const [subgarr,setSubg] = useState([]);
  const [action,setAction] = useState([]);

  function ignorefunc(props)
  {
    console.log("props in ignore:",props);
    const newdata = {
      action : "ignored",
      id: props._id,
    }
    const uri = "http://localhost:4003/user/updaction";
    axios
      .post(uri, newdata)
      .then((response) => {
        alert("Success in updation of button state");
        setArr([]);
      })
      .catch((err) => {
          console.log(err);
          console.log("fuck hogaya in updating button state");
      });
  }


  function deletefunc(props)
  {
    console.log("delete func props",props);
    const newdata = {
      id: props._id,
    }
    const uri = "http://localhost:4003/user/delrep";
    axios
      .post(uri, newdata)
      .then((response) => {
        alert("Success in Deletion");
          setArr([]);
      })
      .catch((err) => {
          console.log(err);
          console.log("fuck hogaya in delete back-front");
      });
          // Start Code

          const ext = {
            name: name,
          }
          const uriextid = "http://localhost:4003/user/extid";
          axios
          .post(uriextid, ext)
          .then(res => {   
            console.log("id req is:", res.data); 
            const id = res.data[0]._id;
            let currentDate = new Date().toJSON().slice(0, 10);
            const newd = {
              id: id,
              date: currentDate,
            }
            const nesturi = "http://localhost:4003/user/checkrepvdel";
            axios
            .post(nesturi,newd)
            .then(res=>{
              if(res.data.length > 0)
              {
                console.log("prexists");
                const newdj = {
                  id: id,
                  date: currentDate,
                  reported: "null",
                  deleted: "some user who cant be revealed : preserving privacy",
                };
                const uriupdj = "http://localhost:4003/user/updrepvdel"; 
                axios
                  .post(uriupdj, newdj)
                  .then(res => {   
                    console.log("in repvdel success");
                  })
                  .catch(err => {
                      console.log("err in repvdel stats");
                  });
              }
              else
              {
                console.log("doesnt exist prior");
                const newdp = {
                  id: id,
                  date: currentDate,
                  curr_reported: ["null"],
                  curr_deleted: ["null","some user who cant be revealed : preserving privacy"],
                }
                const nesturip = "http://localhost:4003/user/createrepvdel";
                axios
                .post(nesturip,newdp)
                .then(res=>{
                  console.log("yaya created repvdel when prior no existence at be");
                })
                .catch(err => {
                  console.log("try buddy again");
                });
              }
            })
            .catch(err => {
              console.log("try buddy again");
            });
          })
          .catch(err => {
              alert("Try Again latest callfunc");
          });
          // End Code
  }

  const [isBlocked, setIsBlocked] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [useful,setUseful] = useState({});
  const [flag,setFlag] = useState(0);
  const [check,setCheck] = useState({});

  function blockfunc(props)
  {
      console.log("reclick bro");
    const handleBlockButton = () => {
      if (!isBlocked) {
        console.log("abhi bhi wahi haal");
        // If the button is not blocked, start the blocking countdown timer
        setIsBlocked(true);
        setCountdown(5);

        // Use setInterval to update the countdown timer every second
        const timer = setInterval(() => {
          setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        // Save the timer ID in state so it can be cleared later
        setTimerId(timer);
        setFlag(1);
      } else {
        console.log("unblock kara user ne");
        // If the button is already blocked, cancel the countdown timer and unblock the button
        clearInterval(timerId);
        setIsBlocked(false);
        setCountdown(0);
        setFlag(0);
      }
    };
    handleBlockButton();
    setUseful(props);
  }

  useEffect(() => {
    return () => {
      clearInterval(timerId);
    };
  }, [timerId]);

  // Use useEffect to execute the block action when the countdown timer reaches 0
  useEffect(() => {
    if (countdown === 0 && flag === 1 && isBlocked == true) {
      console.log("finished timer");
      clearInterval(timerId);
      console.log("stuff:",useful);
      console.log(isBlocked);
      truhai(useful);
      // execute block action here
    }
  }, [countdown, timerId,useful.postedin]);

  function truhai(props)
  {
    var subname = props.postedin;
    var temparr = subgarr;
    let idx = -1;
    for(let i=0;i<temparr.length;i++)
    {
      if(temparr[i].name==subname)
      {
        idx = i;
        for(let j=0;j<temparr[i].posts.length;j++)
        {
          if(temparr[i].posts[j].posttext == props.posttext && temparr[i].posts[j].postedby == props.reported_user)
          {
            temparr[i].posts[j].postedby = "blocked_user";
          }
        }
      }
    }
    const newdata = {
      name: subname,
      posts: temparr[idx]?.posts,
    };
    const uri = "http://localhost:4003/user/updsubgrep";
    axios
      .post(uri, newdata)
      .then((response) => {
          console.log(response.data);
          setSubg([]);
          console.log("before email: ",props);
          const newdataact = {
            action : "blocked",
            id: props._id,
          }
          const uriact = "http://localhost:4003/user/updaction";
          axios
            .post(uriact, newdataact)
            .then((response) => {
            //   alert("Success in updation of button state blocked");
              setArr([]);
              handle_email_block(props);
            })
            .catch((err) => {
                console.log(err);
                console.log("fuck hogaya in updating button state blocked");
            });
      })
      .catch((err) => {
          console.log(err);
          console.log("fuck hogaya in subg back-front");
      });
  }

  const handle_email_block = async (props) => {
    try {
      await axios.post('http://localhost:4003/user/send-email', {
        blockedUserEmail: props.reported_user,
        blockingUserEmail: props.reported_by,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if(subgarr.length == 0)
  {
    const newdata = {
      email: emailjwt
    };
    const uri = "http://localhost:4003/user/findsubg";
    axios
    .post(uri, newdata)
    .then((response) => {
        console.log(response.data);
        setSubg(response.data);
    })
    .catch((err) => {
        console.log(err);
        console.log("fuck hogaya in subg back-front");
    });
  }

  console.log("subgarr:",subgarr);

  if(savearr.length === 0 && subgarr.length > 0)
  {
    const newdata = {
      list: subgarr
    };
    const uri = "http://localhost:4003/user/extractreport";
    axios
      .post(uri, newdata)
      .then((response) => {
          console.log(response.data);
          setArr(response.data);
      })
      .catch((err) => {
          console.log(err);
          console.log("fuck hogaya in rendering reported back-front");
    });
  }

  console.log("savearr",savearr);

  // var objs = savearr.length;
  // var heightval = objs*60 + 100;
  // var strheight = heightval + "vh";
  // console.log(strheight);

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

        <div className='bgrepeatlogsubreddit' style={{height:"500vh"}}>
          <div style={{display:"flex",flexWrap:"wrap"}}>
            {savearr.map((follower, index) => (
              <div key={index} style={mystyle2}>
                  PostText: {follower.posttext} <br/><br/>
                  Reported by : {follower.reported_by} <br/><br/>
                  Reported user: {follower.reported_user} <br/><br/>
                  Reporter's Concern : {follower.concern} <br/><br/>
                  <button disabled={follower.action == "ignored"} onClick={()=>deletefunc(follower)}> Delete Report </button> <br/><br/>
                  <button disabled={follower.action == "ignored" || follower.action == "blocked"} onClick={()=>{blockfunc(follower);setCheck(follower)}}> {follower.action == "blocked" ? "Blocked" : (check == follower ? (isBlocked ? (countdown > 0 ? `Cancel in ${countdown} secs` : "Blocked") : "Block"):"Block")} </button> <br/><br/>
                  {follower.action != "blocked" && <button disabled={follower.action == "ignored"} onClick={()=>ignorefunc(follower)}> {follower.action == "ignored" && "Ignored"} {follower.action == "temp" && "Ignore Report"}   </button> }<br/><br/>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};
export default PageSubreddit;