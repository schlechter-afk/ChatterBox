import React from 'react';
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button
} from '@material-ui/core';

import Navbar from "../component/navbarlogin";

import { useState , useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Loginele from './oauthlogin';
// import Logoutele from './oauthlogout';
import srcimg from "./gv.jpeg";
import importlog from "./login.jpg";

import "../App.css";

var CASAuthentication = require('node-cas-authentication');
 
var cas = new CASAuthentication({
    cas_url         : 'https://login.iiit.ac.in/cas/login',
    service_url     : 'https://login.iiit.ac.in/cas/login',
    cas_version     : '2.0',
    renew           : false,
    is_dev_mode     : false,
    dev_mode_user   : '',
    dev_mode_info   : {},
    session_name    : 'cas_user',
    session_info    : 'cas_userinfo',
    destroy_session : false,
    return_to       : 'https://my-website.com/'
});

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const Login = (props) => {
  
  const [emailinfo, setEmail] = useState("");
  const [passwordinfo, setPassword] = useState("");
  const [checked , setChecked] = React.useState(true);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("email");
  console.log("mai aaya" +jwt);
  if(jwt)
  {
    alert("Kindly Logout First");
    window.open("/dashboard","_self");
  }

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  function onChangeEmail(event) {
      setEmail(event.target.value);
  }

  function onChangePassword(event) {
      setPassword(event.target.value);
  }

  function gauthextra()
  {
    console.log("succ");
  }

  function onSubmit(event) {
    console.log(emailinfo);
    console.log(passwordinfo);
    const currentBuyer = {
        email: emailinfo,
        password: passwordinfo,
    };

    // alert(JSON.stringify(currentBuyer, null, 2));

    event.preventDefault(); // prevent default form submission

    const uri = "http://localhost:4003/user/login";
    axios
        .post(uri, currentBuyer)
        .then((response) => {
            console.log("printing axios resp\n");
            console.log("response.data" + response.data);
            localStorage.setItem("email", response.data);
            navigate("/dashboard");
        })
        .catch((err) => {
            console.log(err);
            alert("Try Again with correct credentials");
            setEmail("");
            setPassword("");
        });
  }

  // style={{ padding: 50,marginLeft:600,background: `url(${srcimg})`}}

  return (
    <div>
    <Navbar></Navbar>
    <div className='bgrepeatlog'>
    <div style={{ padding: 40,marginLeft:600}}>
        <Grid container spacing={4} direction={'column'} justify={'center'} alignItems={'center'} className="login_style">

          <Grid item xs={50} className='login_id'>
            Login
          </Grid>

          <Grid item xs={50} className='agreement'>
            <div>
              <div> By continuing, you agree to our</div>
              <a href = "https://www.youtube.com/watch?v=xvFZjo5PgG0"> User agreement and Privacy policy. </a>
            </div>
          </Grid>

          <Grid item xs={50}>
            <TextField label="Email-Id" value={emailinfo} onChange={onChangeEmail}></TextField>
          </Grid>

          <Grid item xs={50}>
            <TextField label="Password" type={'password'} value={passwordinfo} onChange={onChangePassword}></TextField>
          </Grid>

          <Grid item xs={50}>
            <FormControlLabel
              control={
                <Checkbox checked={checked} onChange={handleChange} label={'Do you want any future updates on your mail'}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              }
              label="Do you want any future updates on your mail"
            />
          </Grid>

          <Grid item xs={50}>
            <Button type='submit' disabled = {!emailinfo || !passwordinfo} fullWidth variant="outlined" sx={{ width: 50 ,padding: 1, margin: 2 }} onClick={onSubmit}> Login </Button>
          </Grid>

          <Grid item xs={50}>
            <Button fullWidth variant="outlined" sx={{ width: 50 ,padding: 1, margin: 2 }} onClick={props.func}> Want to Register? </Button>
          </Grid>

          {/* <Loginele onClick={gauthextra}></Loginele> */}
          <br>
          </br>
          {/* <Logoutele/> */}
          
        </Grid>
    </div>
    </div>
    </div>
  );
};

export default Login;