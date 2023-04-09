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

const PageSubreddit = () => {
  const { name } = useParams();

  // *****
  
  // *****

  const [reqarr,setArr] = useState([]);

  const newUserinfo = {
    name: name
  };

  const [idreq,setidreq] = useState("");
  
  const urilsub = "http://localhost:4003/user/jrsubg";

  useEffect(()=>{
  console.log("starting axios second jr subg");
  axios
    .post(urilsub, newUserinfo)
    .then(res => {   
      console.log("in req arr success")
      console.log(res.data);
      setArr(res.data[0].joinreqs);
      console.log("ori:",res.data[0]._id);
      setidreq(res.data[0]._id);
      console.log(idreq);
      console.log(reqarr); 
    })
    .catch(err => {
        // alert("Try Again jr req fail");
    });
  },[]);

  console.log(reqarr);

  function allowed(props)
  {
    console.log(props);
    let currentDate = new Date().toJSON().slice(0, 10);
    const newdata = {
      name: name,
      user: props,
    };
    const uri = "http://localhost:4003/user/updjrsubg"; 
    axios
      .post(uri, newdata)
      .then(res => {   
        console.log("in updjrsubg success");
        const updatedreqs = reqarr.filter(follower => follower != props);
        console.log(updatedreqs);
        setArr(updatedreqs);
      })
      .catch(err => {
          alert("Try Again updjrsubg req fail");
      });

// ****************************
    const ext = {
      name: name,
    }
    const uriextid = "http://localhost:4003/user/extid";
    axios
    .post(uriextid, ext)
    .then(res => {   
      console.log("id req is:", res.data); 
      const id = res.data[0]._id;
      var creator = res.data[0].moderators;
      let currentDate = new Date().toJSON().slice(0, 10);
      const newd = {
        id: id,
        date: currentDate,
      }
      const nesturi = "http://localhost:4003/user/checkjoinuserstats";
      axios
      .post(nesturi,newd)
      .then(res=>{
        if(res.data.length > 0)
        {
          console.log("prexists");
          const newdj = {
            id: id,
            date: currentDate,
            joined_user: props,
          };
          const uriupdj = "http://localhost:4003/user/joinuserstats"; 
          axios
            .post(uriupdj, newdj)
            .then(res => {   
              console.log("in joinuserstats success");
            })
            .catch(err => {
                console.log("err in joinuser stats");
            });
        }
        else
        {
          console.log("doesnt exist prior");
          creator.push(props);
          const newdp = {
            id: id,
            date: currentDate,
            creator: creator,
          }
          const nesturip = "http://localhost:4003/user/createjoinstats";
          axios
          .post(nesturip,newdp)
          .then(res=>{
            console.log("yaya created join user stats at be");
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
  }

  function rejected(props)
  {
    console.log(props);
    const newdata = {
      name: name,
      user: props,
    };
    const uri = "http://localhost:4003/user/updjrsubgreject"; 
    axios
      .post(uri, newdata)
      .then(res => {   
        console.log("in updjrsubg reject success");
        const updatedreqs = reqarr.filter(follower => follower != props);
        console.log(updatedreqs);
        setArr(updatedreqs);
      })
      .catch(err => {
          alert("Try Again updjrsubg reject req fail");
      });
  }

  return (
    <div>
    <Navbar/>
    <div className="dashboard_style">
    <section className='section product'>
      <h2>Welcome to {name}'s jrsubpage</h2>
    </section>
    <div>
      <div className='subonmod'> Existing Sub-Greddits </div>
      <div style={{display:"flex",flexWrap:"wrap"}}>
        {reqarr?.map((follower, index) => (
          <div key={index} style={mystyle1}>
            {follower} &nbsp; &nbsp;
            <button onClick={()=> allowed(follower)}> Allow </button> &nbsp; &nbsp;
            <button onClick={()=> rejected(follower)}> Reject </button>
          </div>
        ))}
      </div>
        </div>
    </div>
    </div>
  );
};

export default PageSubreddit;