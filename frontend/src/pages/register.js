import React from 'react';
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button
} from '@material-ui/core';

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import Navbar from "../component/Navbar";
import srcimg from "./im4.jpg";

import "../App.css";

const Register = (props) => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const navigate = useNavigate();
  const jwt = localStorage.getItem("email");
  if(jwt)
  {
    alert("Kindly Logout First");
    window.open("/dashboard","_self");
  }

  const [age, setAge] = useState(0);
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");

  const initialFollowing = [
    { id: 1, name: "Lex Fridman" },
    { id: 2, name: "Elon Musk" },
    { id: 3, name: "Virat Kohli" },
    { id: 4, name: "Magnus Carlsen" },
    { id: 5, name: "Sundar Pichai" },
    { id: 6, name: "Swayam Agrawal" }
  ];

  const initialFollowers = [
    { id: 1, name: "Yash Kawade" },
    { id: 2, name: "Mitansh Kayathwal" },
    { id: 3, name: "Rohan Kumar" },
    { id: 4, name: "Pratham Thakkar" },
    { id: 5, name: "Manav Shah" },
    { id: 6, name: "Madhav Tank" }
  ];

  // const followers = ["Yash Kawade", "Mitansh Kayathwal", "Rohan Kumar", "Pratham Thakkar", "Manav Shah" ,"Madhav Tank"];
  // const following = ["Lex Fridman", "Elon Musk" , "Virat Kohli","Magnus Carlsen","Sundar Pichai","Swayam Agrawal"];

  function onChangeFirstname(event) {
    setFirst_name(getValue(event));
  }

  function onChangeLastname(event) {
    setLast_name(getValue(event));
  }

  function onChangeUsername(event) {
    setUser_name(getValue(event));
  }

  function onChangeEmail(event) {
      setEmail(getValue(event));
  }

  function onChangeContact(event) {
      setContact(getValue(event));
  }

  function onChangeAge(event) {
      setAge(getValue(event));
  }

  function onChangePassword(event) {
      setPassword(getValue(event));
  }

  function getValue(event) {
    return event.target.value;
  }

  const onSubmit = (event) => {
    const newUser = {
      first_name: first_name,
      last_name: last_name,
      user_name: user_name,
      email: email,
      age: age,
      contact: contact,
      password: password,
      following: initialFollowing,
      followers: initialFollowers,
    };

    // alert(JSON.stringify(newUser, null, 2));

    /// Adding Validation

    event.preventDefault();

    function isNumber(value) {
      const conv = +value;
      if (conv) {
          return true;
      } else {
          return false;
      }
    }
    function checkIfEmail(str) {
      const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
      return regexExp.test(str);
    }

    var check = 0;
    var checka = 0;
    var checke = 0;
    var checkc = 0;
    if(!first_name || !last_name || !user_name || !email || !age || !contact || !password)
    {
      check = 1;
    }
    if(!isNumber(age))
    {
      check = 1;
      checka = 1;
    }
    if(!isNumber(contact))
    {
      check = 1;
      checkc = 1;
    }
    if(!checkIfEmail(email))
    {
      check = 1;
      checke = 1;
    }
    if(!check)
    {
      const uri = "http://localhost:4003/user/register";
      axios
          .post(uri, newUser)
          .then((response) => {
              alert("Registered " + response.data.first_name + "!");
              console.log(response.data.followers);
              console.log(response.data.following);
          })
          .catch(() => {
              alert("Maybe User Exists already with given credentials");
          });
    }
    else
    {
      console.log(checka);
      console.log(checke);
      console.log(checkc);
      alert("Couldnt Register, common errors : {No @ in email} , {string in age/contact} , {empty fields}");
      if(checka) setAge("");
      if(checke) setEmail("");
      if(checkc) setContact("");
    }

    /// Ending Validation
  };

  return (
    <div>
    <Navbar/>
    <div className='bgrepeatlog'>
    <div style={{ padding: 40,marginLeft:600}}>
        <Grid container spacing={4} direction={'column'} justify={'center'} alignItems={'center'} className="login_style">

          <Grid item xs={50} className='login_id'>
            Register
          </Grid>
          <Grid item xs={200}>
            <TextField label="First_Name" value={first_name} onChange={onChangeFirstname}></TextField>
          </Grid>
          <Grid item xs={200}>
            <TextField label="Last_Name" value={last_name} onChange={onChangeLastname}></TextField>
          </Grid>
          <Grid item xs={200}>
            <TextField label="User_Name" value={user_name} onChange={onChangeUsername}></TextField>
          </Grid>
          <Grid item xs={200}>
            <TextField label="Email" value={email} onChange={onChangeEmail}></TextField>
          </Grid>
          <Grid item xs={200}>
            <TextField label="Age" value={age} onChange={onChangeAge}></TextField>
          </Grid>
          <Grid item xs={200}>
            <TextField label="Contact" value={contact} onChange={onChangeContact}></TextField>
          </Grid>
          <Grid item xs={200}>
            <TextField label="Password" type={'password'} value={password} onChange={onChangePassword}></TextField>
          </Grid>

          <Grid item xs={200}>
            <Button type='submit' disabled = {!first_name || !last_name || !user_name || !email || !age || !contact || !password} fullWidth variant="outlined" sx={{ width: 200 ,padding: 0, margin: 2 }} onClick={onSubmit}> Register </Button>
          </Grid>
          <Grid item xs={200}>
            <Button fullWidth variant="outlined" sx={{ width: 200 ,padding: 1, margin: 2 }} onClick={props.func}> Want to Login? </Button>
          </Grid>
        </Grid>
    </div>
    </div>
    </div>
  );
};

export default Register;