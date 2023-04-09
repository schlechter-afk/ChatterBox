import React, { useState,useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "../component/navbardash";
import axios from "axios";

import displayimg from "../component/display.jpeg"
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
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [tags, setTags] = useState("");
  const [banned, setBanned] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  var emailjwt = "";
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
  }

  function onChangeName(event) {
    setName(getValue(event));
  }

  function onChangeDesc(event) {
    setDesc(getValue(event));
  }

  function onChangeTags(event) {
    setTags(getValue(event));
  }

  function onChangeBanned(event) {
      setBanned(getValue(event));
  }

  function getValue(event) {
    return event.target.value;
  }

  const handleOpen = () => {
    setOpen(true);
  };

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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // setImage(file ? URL.createObjectURL(file) : null);
    setImage(file ? file : displayimg);
    console.log("file name:",file.name);
    console.log("img is:",image);
  };

  const navigate = useNavigate();

  var [subgredditarr,setSubarr] = useState([]);
  var [subgid,setsubgid] = useState("");
  var [currsubgs,setcurrsubg] = useState([]);

  const handleClose = (event) => {
    if(name && tags && description && banned)
    {
      // currsubgs = subgredditarr;
      setcurrsubg(subgredditarr);
      // setSubarr([]);
      // console.log(people);
      console.log("dataname is : " + name);
      console.log("datatags is : " + tags);
      console.log("datadesc is : " + description);
      console.log("databan is : " + banned);
      console.log(image);
      console.log(emailjwt);

      // let currentDate = new Date().toJSON().slice(0, 10);
      // var obj = {date:currentDate,new_users:[],left_users:[],new_posts:[],num_visits:[],reported_posts:[],deleted_posts:[]};

      // @Changes: to people storing "name";
      //@ Changed name to emailjwt in people
      const newdata = {
        name: name,
        tags: tags,
        description: description,
        banned: banned,
        email: emailjwt,
        people: [emailjwt,"swayam","schlechter"],
        posts: [],
        blocked: ["tempdata1","tempdata2"],
        moderators: [emailjwt],
        joinreqs: [],
        leftusers: [],
        img: image,
      };

      const formData = new FormData();
      for (let key in newdata) {
        console.log(key,newdata[key]);
        if(key == "posts" || key == "people" || key == "joinreqs" || key == "leftusers" || key == "moderators" || key == "blocked")
        {
          formData.append(key,JSON.stringify(newdata[key]));
        }
        else
        {
          formData.append(key, newdata[key]);
        }
      }
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };

      // let formData = new FormData(event.currrentTarget);
      // console.log("formdata:",formData);


      const uri = "http://localhost:4003/user/subgreddit";
      axios
        .post(uri, formData,config)
        .then((response) => {
            // setSubarr(...subgredditarr + response.data);
            console.log("before",subgredditarr);
            if(subgredditarr.length > 0)
            {setSubarr([]);}
            else setSubarr([response.data]);
            // console.log("after",subgredditarr);
            callfunc();
            alert("Inserted " + response.data.name + "!");
            // callfunc();
        })
        .catch((err) => {
            console.log(err);
            console.log("fuck hogaya");
            alert("Try Again Already Subgreddit exists with same details!");
        });
    }
    setBanned("");
    setName("");
    setDesc("");
    setTags("");
    setOpen(false);
    console.log("exiting if");
  };

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
      name: event.name,
    };
    const uridel = "http://localhost:4003/user/deletesubg";
    axios
    .post(uridel, subinfo)
    .then(res => {   
      console.log("success in axios delete");
      const newdatarep = {
        id: event._id,
      }
      const urirep = "http://localhost:4003/user/delrep";
      axios
        .post(urirep, newdatarep)
        .then((response) => {
          ///
          const newdatasave = {
            subgname: event.name,
          };
          const urisave = "http://localhost:4003/user/savesubdel";
          axios
            .post(urisave, newdatasave)
            .then((response) => {
                console.log(response.data);
                setSubarr([]);
            })
            .catch((err) => {
                console.log(err);
                console.log("fuck hogaya in save back-front delte");
            });
          ///
        })
        .catch((err) => {
            console.log(err);
            console.log("fuck hogaya in delete back-front delte");
        });
    })
    .catch(err => {
        console.log("failure in axios delete delte");
    });
  }


  const newUserinfo = {
    email: emailjwt,
    // moderators : [name],
  };
  
  const urilsub = "http://localhost:4003/user/findsubg";

  console.log("starting axios first");

  var newsubid = "";

  ////
  

  useEffect(() => {
    console.log("starting axios second");
    axios
      .post(urilsub, newUserinfo)
      .then(res => {   
        console.log("in axios req here!!!")
        setSubarr(res.data);
        console.log(subgredditarr); 
      })
      .catch(err => {
          alert("Try Again sub-length if len==0!");
      });
  },[subgredditarr.length]);

  ///

  // if(subgredditarr.length === 0)
  // {
  //   console.log("starting axios second");
  //   axios
  //     .post(urilsub, newUserinfo)
  //     .then(res => {   
  //       console.log("in axios req here!!!")
  //       setSubarr(res.data);
  //       console.log(subgredditarr); 
  //     })
  //     .catch(err => {
  //         alert("Try Again sub-length if len==0!");
  //     });
  // }
  // console.log("finally extract id:",newsubid);
  console.log("ending axios");
  console.log(subgredditarr); 

  function callfunc()
  {
    const ext = {
      name: name,
    }
    const uriextid = "http://localhost:4003/user/extid";
    axios
    .post(uriextid, ext)
    .then(res => {   
      console.log("id req is:", res.data); 
      const id = res.data[0]._id;
      const creator = res.data[0].moderators;
      let currentDate = new Date().toJSON().slice(0, 10);
      const newd = {
        id: id,
        date: currentDate,
        creator: creator,
      }
      const nesturi = "http://localhost:4003/user/createjoinstats";
      axios
      .post(nesturi,newd)
      .then(res=>{
        console.log("yaya created join user stats at be");
      })
      .catch(err => {
        console.log("try buddy again");
      });
      
      // **********FOR DAILY POSTS**********************

      const newddp = {
        id: id,
        date: currentDate,
        curr_posts: ['no post'],
      }
      const nesturidp = "http://localhost:4003/user/createdailyposts";
      axios
      .post(nesturidp,newddp)
      .then(res=>{
        console.log("yaya created daily posts at be");
      })
      .catch(err => {
        console.log("try buddy again daily posts");
      });

      // ***********************************************

      // **********FOR DAILY VISITORS*******************

      const newddv = {
        id: id,
        date: currentDate,
        curr_visitors: ["no visitor"],
      }
      const nesturidv = "http://localhost:4003/user/createdailyvisitors";
      axios
      .post(nesturidv,newddv)
      .then(res=>{
        console.log("yaya created daily visitors at be");
      })
      .catch(err => {
        console.log("try buddy again daily visitors");
      });

      // ***********************************************

      // **********FOR REPVDEL*******************
      const newddr = {
        id: id,
        date: currentDate,
        curr_reported: ["null"],
        curr_deleted: ["null"],
      }
      const nesturidr = "http://localhost:4003/user/createrepvdel";
      axios
      .post(nesturidr,newddr)
      .then(res=>{
        console.log("yaya created repvdel at be");
      })
      .catch(err => {
        console.log("try buddy again repvdel");
      });
    
      // ***********************************************

    })
    .catch(err => {
        alert("Try Again latest callfunc");
    });
  }

  var objs = subgredditarr.length;
  objs = objs + 3 - objs % 3;
  objs = objs/3;
  var heightval = objs*37 + 100;
  var strheight = heightval + "vh";
  console.log(objs);

  return (
    <div>
    <Navbar></Navbar>
    <div className='bgrepeatlogsubreddit' style={{height: "500vh"}}>
        <div className='subon'>
            <Button variant="contained" color="primary" onClick={handleOpen} className={classes.button}>
              Create New Subgreddit
            </Button>
        </div>

        <div>
              <div className='subonmod' style={{fontFamily:"Pacifico"}}> Existing My Sub-Greddits </div>
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
                    <Link to={`/subgreddit/${follower.name}`}>Open</Link>
                    {/* <button onClick={() => openfunc(follower.name)}> Open </button> &nbsp; &nbsp; */}
                    <button onClick={() => deletefunc(follower)}> Delete </button>
                  </div>
                ))}
              </div>
        </div>

      <Modal open={open} onClose={handleClose} aria-labelledby="form-modal-title" aria-describedby="form-modal-description">
        <div className={classes.paper}>
          <h2 id="form-modal-title">Form</h2>
          <TextField id="standard-basic" label="Name*" value={name} onChange={onChangeName} margin="normal" fullWidth />
          <TextField id="standard-basic" label="Description*" value={description} onChange={onChangeDesc} margin="normal" fullWidth />
          <TextField id="standard-basic" label="Tags*" value={tags} onChange={onChangeTags} margin="normal" fullWidth />
          <TextField id="standard-basic" label="Banned Keywords*" value={banned} onChange={onChangeBanned} margin="normal" fullWidth />
          
          <label>
            Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {/* {image && <img src={image} alt="Preview" />} */}
          </label>
          <br/>
          <br></br>

          <Button disabled = {!name || !description || !tags || !banned} variant="contained" color="primary" onClick={handleClose}>
            Submit
          </Button>
        </div>
      </Modal>
      </div>
    </div>
  );
};

export default FormModal;