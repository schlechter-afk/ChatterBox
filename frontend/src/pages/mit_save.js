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

// import { useNavigate } from 'react-router-dom';

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

  var emailjwt = "";
  var username = "";
  const jwt = localStorage.getItem("email");
  if(jwt)
  {
    var parsedjwt = parseJwt(jwt);
    emailjwt = parsedjwt.email;
    username = parsedjwt.UserName;
  }
  // const newUserinfo = {
  //   name: name,
  // };
  
  // const urilsub = "http://localhost:4003/user/findsubgusers";

  // useEffect(()=>{
  //   console.log("enetered post useeffect");
  //   axios
  //     .post(urilsub, newUserinfo)
  //     .then(res => {  
  //       console.log("res.data in effect " , res.data); 
  //       setSubarr(res.data);
  //       setDisplay(res.data[0].posts);
  //       console.log("setting postsdisplay:",displayposts);
  //     })
  //     .catch(err => {
  //         console.log("err is :",err);
  //         alert("Try Again sub-length if!");
  //     });
  // },[]);

  // console.log(subgredditarr);
  // console.log("posts till now:",displayposts);

  const [open, setOpen] = useState(false);
  const [opencomment, setOpenComment] = useState(false);
  const [posttext, setPosttext] = useState("");
  const [commenttext,setComment] = useState("");

  function handleupvote(props)
  {
    console.log(props);
    var temparr = displayposts;
    for(let i=0;i<temparr.length;i++)
    {
      if(temparr[i].postedby == props.postedby && temparr[i].posttext == props.posttext)
      {
        console.log("woo",temparr[i]);
        temparr[i].likes++;
      }
    }
    const newdata = {
      posts: temparr,
      name: name,
    };
    const uri = "http://localhost:4003/user/likesupdsavepage";
    axios
      .post(uri, newdata)
      .then((response) => {
          // setSubarr([]);
          console.log("succes in likesupd");
          setDisplay([]);
      })
      .catch((err) => {
          console.log(err);
          console.log("fuck hogaya in likes");
      });
  }

  function handledownvote(props)
  {
    console.log(props);
    var temparr = displayposts;
    for(let i=0;i<temparr.length;i++)
    {
      if(temparr[i].postedby == props.postedby && temparr[i].posttext == props.posttext)
      {
        console.log("woo",temparr[i]);
        temparr[i].dislikes++;
      }
    }
    const newdata = {
      posts: temparr,
      name: name,
    };
    const uri = "http://localhost:4003/user/dislikesupd";
    axios
      .post(uri, newdata)
      .then((response) => {
          // setSubarr([]);
          console.log("succes in dislikesupd");
          setDisplay([]);
      })
      .catch((err) => {
          console.log(err);
          console.log("fuck hogaya in dislikes");
      });
  }

  function getValue(event) {
    return event.target.value;
  }

  function OnChangePost(event) {
    setPosttext(getValue(event));
  }

  function OnChangeComment(event)
  {
    console.log("oyeoye");
    console.log(event.target.value);
    setComment(getValue(event));
  }

  const handleOpenComment = () => {
    setOpenComment(true);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  }

  const handleCloseComment = () => {
    setOpenComment(false);
  }

  const handleClose = () => {
    console.log("subgreddit data in submit:",subgredditarr[0]);
    var bannedlist = subgredditarr[0].banned.split(',');
    console.log(bannedlist);
    var postfiltered = posttext.split(' ');
    var tostr = "";
    console.log("postfilt:",postfiltered);
    for(let i=0;i<postfiltered.length;i++)
    {
      var word = postfiltered[i];
      var delims = ['~','`','!','@','#','$','%','^','&','*','(',')','-','+',':','<','>','?','/','.',';',','];
      let f1 = 0;
      let f2 = 0;
      for(let itr = 0;itr<delims.length;itr++)
      {
        if(word[0] == delims[itr])
        {
          f1 = 1;
        }
        if(word[word.length - 1] == delims[itr])
        {
          f2 = 1;
        }
      }
      var updword="";
      if(f1 == 1 && f2 == 1)
      {
        for(let itr = 1;itr<word.length-1;itr++)
        {
          updword += word[itr];
        }
      }
      else if(f1 == 1 && f2 == 0)
      {
        for(let itr = 1;itr<=word.length-1;itr++)
        {
          updword += word[itr];
        }
      }
      else if(f1 == 0 && f2 == 1)
      {
        for(let itr = 0;itr<word.length-1;itr++)
        {
          updword += word[itr];
        }
      }
      else
      {
        updword = word;
      }
      console.log(updword);
      let check = 0;
      for(let j=0;j<bannedlist.length;j++)
      {
        if(bannedlist[j].toLowerCase()==updword.toLowerCase())
        {
          check = 1;
        }
      }
      if(check == 1 && f1 == 1 && f2 == 1)
      {
        tostr += word[0];
        for(let k = 0;k<updword.length;k++)
        {
          tostr += '*';
        }
        tostr += word[word.length-1];
      }
      else if(check == 1 && f1 == 1 && f2 == 0)
      {
        tostr += word[0];
        for(let k = 0;k<updword.length;k++)
        {
          tostr += '*';
        }
      }
      else if(check == 1 && f1 == 0 && f2 == 1)
      {
        for(let k = 0;k<updword.length;k++)
        {
          tostr += '*';
        }
        tostr += word[word.length-1];
      }
      else if(check == 1 && f1 == 0 && f2 == 0)
      {
        for(let k = 0;k<updword.length;k++)
        {
          tostr += '*';
        }
      }
      else
      {
        tostr += word;
      }
      if(i != postfiltered.length - 1)
      {tostr += ' ';}
    }

    console.log("posttext:",posttext);
    console.log("tostr:",tostr);
    console.log("posttext len:",posttext.length);
    console.log("tostr len:",tostr.length);

    if(posttext != tostr)
    {
      alert("your message contains banned words!");
    }

    setPosttext(tostr);

    console.log("final:",tostr);

    const newdata = {
      posts: {posttext:tostr,postedby:emailjwt,likes:0,dislikes:0,comments:[],postedin:name},
      name: name,
    };
    const uri = "http://localhost:4003/user/postsupd";
    axios
      .post(uri, newdata)
      .then((response) => {
          // setSubarr([]);
          console.log("succes in postupd");
          alert("Inserted " + "!");
          setDisplay([]);
          console.log(displayposts);
      })
      .catch((err) => {
          console.log(err);
          console.log("fuck hogaya");
      });

    /// Updating Daily Posts Stats

    const id = subgredditarr[0]._id;
    let currentDate = new Date().toJSON().slice(0, 10);
    const newdch = {
      id: id,
      date: currentDate,
    }
    const nesturich = "http://localhost:4003/user/checkdailyposts";
    axios
    .post(nesturich,newdch)
    .then(res=>{
      if(res.data.length > 0)
      {
        console.log("prexists");
        const newdda = {
          id: id,
          date: currentDate,
          post: posttext,
        };
        const uriupdda = "http://localhost:4003/user/upddailyposts"; 
        axios
          .post(uriupdda, newdda)
          .then(res => {   
            console.log("in dailyposts success");
          })
          .catch(err => {
              console.log("err in dailyposts stats");
          });
      }
      else
      {
        console.log("doesnt exist prior");   
        const newdcr = {
          id: id,
          date: currentDate,
          curr_posts: ['no post', posttext],
        }
        const nesturicr = "http://localhost:4003/user/createdailyposts";
        axios
        .post(nesturicr,newdcr)
        .then(res=>{
          console.log("yaya created daily posts at front");
        })
        .catch(err => {
          console.log("try buddy again at front daily posts");
        });
      }
    })
    .catch(err => {
      console.log("try buddy again check daily posts frontend");
    });

    ///

    console.log("displayposts before test: ",displayposts);
    setOpen(false);
  };

  function handleCommitComment(props)
  {
    setOpenComment(false);
    console.log("comment text",commenttext);
    console.log("comment in props:",props);
    var temparr = displayposts;
    for(let i=0;i<temparr.length;i++)
    {
      if(temparr[i].postedby == props.postedby && temparr[i].posttext == props.posttext)
      {
        // console.log("woo",temparr[i]);
        temparr[i].comments.push(commenttext);
      }
    }
    const newdata = {
      posts: temparr,
      name: name,
    };
    const uri = "http://localhost:4003/user/commentsupd";
    axios
      .post(uri, newdata)
      .then((response) => {
          // setSubarr([]);
          console.log("succes in commentsupd");
          setDisplay([]);
          setComment("");
      })
      .catch((err) => {
          console.log(err);
          console.log("fuck hogaya in comments");
      });
  }

  const [buttval,setVal] = useState("Save this post");

  function savefunc(props)
  {
    console.log("props in savefunc:",props);
    const newdata = {
      post: props,
      email: emailjwt,
    };
    const uri = "http://localhost:4003/user/savedposts";
    axios
      .post(uri, newdata)
      .then((response) => {
          // setSubarr([]);
          console.log("succes in saved back-front");
          alert("Successfully Saved the selected post");
          setVal("Saved this post");
      })
      .catch((err) => {
          console.log(err);
          console.log("fuck hogaya in save back-front");
      });
  }

  function report_post(props)
  {
    console.log("enter mfer");
    console.log("props in reportfunc:",props);
    const newdata = {
      posttext: props.posttext,
      postedby: props.postedby,
      concern: "testing with temp concern",
      reportedby: emailjwt,
      postedin: props.postedin,
      action: "temp",
    };
    const uri = "http://localhost:4003/user/addreport";
    axios
      .post(uri, newdata)
      .then((response) => {
          console.log("succes in saving report front");
          alert("Successfully reported the selected post");
      })
      .catch((err) => {
          console.log(err);
          console.log("fuck hogaya in report back-front");
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
              reported: "some user who cant be revealed : preserving privacy",
              deleted: "null",
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
              curr_reported: ["null","some user who cant be revealed : preserving privacy"],
              curr_deleted: ["null"],
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


  function followfunc(props)
  {
    console.log("props in followfunc:",props);
    const newdata = {
      email: emailjwt,
      writer: props.postedby,
    };
    const uri = "http://localhost:4003/user/updwritepost";
    axios
      .post(uri, newdata)
      .then((response) => {
          console.log("succes in adding writer to following array");
      })
      .catch((err) => {
          console.log(err);
          console.log("fuck hogaya in following writer");
      });
    newfunc(props);
  }

  function newfunc(props)
  {
    const newdata = {
      user: emailjwt,
      writer: props.postedby,
    };
    const uri = "http://localhost:4003/user/updfollowerpost";
    axios
      .post(uri, newdata)
      .then((response) => {
          console.log("succes in adding user to followers array of writer");
      })
      .catch((err) => {
          console.log(err);
          console.log("fuck hogaya in adding user to followers array of writer");
      });
  }

  const newUserinfo = {
    name: name,
  };
  
  const urilsub = "http://localhost:4003/user/findsubgusers";

  // if(displayposts.length == 0)
  // {
  //   console.log("enetered post useeffect");
  //   axios
  //     .post(urilsub, newUserinfo)
  //     .then(res => {  
  //       console.log("res.data in effect " , res.data); 
  //       setSubarr(res.data);
  //       setDisplay(res.data[0].posts);
  //       console.log("setting postsdisplay:",displayposts);
  //     })
  //     .catch(err => {
  //         console.log("err is :",err);
  //         alert("Try Again sub-length if ????!");
  //     });
  // }

  useEffect(() => {
    console.log("enetered post useeffect");
    axios
      .post(urilsub, newUserinfo)
      .then(res => {  
        console.log("res.data in effect " , res.data); 
        setSubarr(res.data);
        setDisplay(res.data[0].posts);
        console.log("setting postsdisplay:",displayposts);
      })
      .catch(err => {
          console.log("err is :",err);
          alert("Try Again sub-length if ????!");
      });
  },[displayposts.length,subgredditarr.length]);

  var objs = displayposts.length;
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
      

      <div className="containerpage" style={{height:strheight}}>
        <div className="left-section" style={{backgroundColor: "blue"}}>
          <div className='subonmod1'>
          <div style={{display:"flex",flexWrap:"wrap"}}>
            {subgredditarr.map((follower, index) => (
              <div key={index} style={mystyle1}>
                {follower.image && <img style={{height:"200px",width:"200px"}} src={(follower.image)}></img>}
                {!(follower.image) && <img style={{height:"200px",width:"200px"}} src={displayimg}></img>}  <br></br><br></br>
                Name: {follower.name} <br></br><br></br>
                Description: {follower.description} <br></br><br></br>
                Tags: {follower.tags} <br></br><br></br>
              </div>
            ))}
          </div>
          </div>
        </div>

        <div className="right-section" style={{backgroundColor: "yellow"}}>
          <div className='subon'>
            <Button variant="contained" color="primary" onClick={handleOpen} className={stylecomp.button}>
              Create New Post
            </Button>
          </div>
          <div>
              <div className='subonmod'> Existing Posts </div>
              <div>
                {displayposts?.map((follower, index) => (
                  <div key={index} style={mystyle2}>
                    Post: {follower.posttext} <br/>
                    Posted By: {follower.postedby} <br/>
                    <IconButton onClick={()=>{handleupvote(follower)}}>
                      <ThumbUpTwoToneIcon/>
                      Upvotes: {follower.likes} <br/>
                    </IconButton>
                    <IconButton onClick={()=>{handledownvote(follower)}}>
                      <ThumbDownTwoToneIcon onClick/>
                      Downvotes: {follower.dislikes} <br/>
                    </IconButton> <br></br>
                    Comments: <br/> {follower.comments.map((kk,hehe)=>(
                      <div>
                      {kk} <br/>
                      </div>
                    ))} <br/>
                    <button onClick={handleOpenComment} className={stylecomp.button}>Want to Comment?</button>
                    <Modal style={{backgroundColor:"skyblue"}} open={opencomment} onClose={handleCloseComment} aria-labelledby="form-modal-title" aria-describedby="form-modal-description">
                      <div className={stylecomp.paper} style={{backgroundColor:"yellow"}}>
                        {console.log("inside inner div:",follower)}
                      <TextField value={commenttext} onChange={OnChangeComment} id="standard-basic" label="Add Comment" margin="normal" multiline />
                      <br></br>
                      <Button disabled = {!commenttext} variant="contained" style={{backgroundColor: "red",fontSize:"20px"}} color="red" onClick={()=>{handleCommitComment(follower)}}>
                        Publish Comment
                      </Button>
                      </div>
                     </Modal>
                    <br/>
                    <br/>
                    <button onClick={()=>report_post(follower)}>Report</button> <br/>
                    <button onClick={()=>savefunc(follower)}>{buttval}</button> <br/>
                    <button disabled={follower.postedby == emailjwt} onClick={()=>followfunc(follower)}>Follow User</button>
                    <br/>
                  </div>
                ))}
              </div>
          </div>
          <Modal open={open} onClose={handleCloseModal} aria-labelledby="form-modal-title" aria-describedby="form-modal-description">
              <div className={stylecomp.paper}>
                <h2 id="form-modal-title">Enter Post Message</h2>
                <TextField value={posttext} onChange={OnChangePost} id="standard-basic" label="Post" margin="normal" multiline fullWidth />
                <br/>
                <br/>
                <Button disabled = {!posttext} variant="contained" style={{backgroundColor: "red"}} color="red" onClick={handleClose}>
                  Submit
                </Button>
              </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default PageSubreddit;