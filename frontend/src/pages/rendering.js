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
import { Line } from "react-chartjs-2";
import { Chart as ChartJS} from 'chart.js/auto';
import {Chart} from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';

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

const PageSubreddit = () => {
  const { name } = useParams();
  const [chartData,setChartData] = useState({});

  // *******************************************
  useEffect(()=>{
  const ext = {
    name: name,
  }
  const uriextid = "http://localhost:4003/user/extid";
  axios
  .post(uriextid, ext)
  .then(res => {   
    console.log("id req is:", res.data); 
    const id = res.data[0]._id;
    const newd = {
      id: id,
    }
    const nesturi = "http://localhost:4003/user/extractjoinuserstats";
    axios
    .post(nesturi,newd)
    .then(res=>{
      if(res.data.length > 0)
      {
        var datetemp = [];
        var userstemp = [];
        for(let i=0;i<res.data.length;i++)
        {
          datetemp.push(res.data[i].date);
          userstemp.push(res.data[i].joined_users.length);
        }

        console.log("datetemp: ",datetemp);
        console.log("usertemp: ",userstemp);

        // ***************************
        
        const data = {
          labels: datetemp,
          datasets: [{data: userstemp,
          label: 'Users',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'yellow',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,}],
        };
        setChartData(data);     
        // ***************************
      }
      else
      {
        alert("data join users doesnt exists");
      }
    })
    .catch(err => {
      console.log("try buddy again");
    });
  })
  .catch(err => {
      alert("Try Again latest callfunc");
  });
  },[]);

  console.log("chartdata: ",chartData);

  // *******************************************

  return (
    <div>
    <Navbar/>
    <div>
    <section className='section product'>
      <h2>Welcome to {name}'s statspage</h2>
    </section>
    <div style={{height:"100px"}}>
    <Line style={{height: "100px"}} data={chartData}/>
    </div>
    </div>
    </div>
  );
};

export default PageSubreddit;