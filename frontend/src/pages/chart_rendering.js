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
  const [chartDataDailyPosts,setChartDataDailyPosts] = useState({});
  // setTimeout(()=>{console.log("hello")},1000)
  console.log("hello");


  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: "white"
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            fontColor: "white"
          }
        }
      ]
    },
    legend: {
      labels: {
        fontColor: "white"
      }
    },
    layout: {
      padding: {
        left: 50,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0
      }
    },
    plugins: {
      datalabels: {
        align: "end",
        anchor: "end",
        backgroundColor: "black",
        borderRadius: 4,
        color: "white",
        font: {
          weight: "bold",
          size: "40"
        }
      }
    },
    backgroundColor: "black"
  };

  // *******************************************
  useEffect(()=>{
  let isMounted = true; // Add Boolean
  const ext = {
    name: name,
  }
  const uriextid = "http://localhost:4003/user/extid";
  axios
  .post(uriextid, ext)
  .then(res => {   
    console.log("id req is:", res.data); 
    const id = res.data[0]._id;
    const newddp = {
      id: id,
    }
    const nesturidp = "http://localhost:4003/user/extractdailyposts";
    axios
    .post(nesturidp,newddp)
    .then(res=>{
      if(res.data.length > 0)
      {
        var datedailyposts = [];
        var num_users = [];
        for(let i=0;i<res.data.length;i++)
        {
          datedailyposts.push(res.data[i].date);
          num_users.push(res.data[i].daily_posts.length);
        }
        const data = {
          labels: datedailyposts,
          datasets: [{data: num_users,
          label: 'Daily Posts',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'yellow',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,}],
        };
        if(isMounted)
        {
          setChartDataDailyPosts(data);   
        }  
      }
      else
      {
        alert("data Daily Posts doesnt exists");
      }
    })
    .catch(err => {
      console.log("try buddy again daily posts stats page front");
    });

    ///
  })
  .catch(err => {
      alert("Try Again latest callfunc daily");
  });
  return () => {
    isMounted = false;
  };
  },[setChartData]);

  //// Daily Posts Stats

  // useEffect(()=>{
  //   let isMounted = true; // Add Boolean
  //   const ext = {
  //     name: name,
  //   }
  //   const uriextid = "http://localhost:4003/user/extid";
  //   axios
  //   .post(uriextid, ext)
  //   .then(res => {   
  //     console.log("id req is:", res.data); 
  //     const id = res.data[0]._id;
  //     const newd = {
  //       id: id,
  //     }
  //     const nesturi = "http://localhost:4003/user/extractjoinuserstats";
  //     axios
  //     .post(nesturi,newd)
  //     .then(res=>{
  //       if(res.data.length > 0)
  //       {
  //         var datetemp = [];
  //         var userstemp = [];
  //         for(let i=0;i<res.data.length;i++)
  //         {
  //           datetemp.push(res.data[i].date);
  //           userstemp.push(res.data[i].joined_users.length);
  //         }
  //         const data = {
  //           labels: datetemp,
  //           datasets: [{data: userstemp,
  //           label: 'Users',
  //           fill: false,
  //           lineTension: 0.5,
  //           backgroundColor: 'yellow',
  //           borderColor: 'rgba(0,0,0,1)',
  //           borderWidth: 2,}],
  //         };
  //         if(isMounted)
  //         {
  //           setChartData(data);   
  //         }  
  //       }
  //       else
  //       {
  //         alert("data join users doesnt exists");
  //       }
  //     })
  //     .catch(err => {
  //       console.log("try buddy again");
  //     });
  //   })
  //   .catch(err => {
  //       alert("Try Again latest callfunc");
  //   });
  //   return () => {
  //     isMounted = false;
  //   };
  //   },[setChartDataDailyPosts]);

  /////

  console.log("chartdata: ",chartData);
  // console.log("daily posts stats:",chartDataDailyPosts);

  // *******************************************

  return (
    <div>
    <Navbar/>
    <div className="dashboard_style_stats">
    <div>
    <div style={{height:"500px",backgroundColor:"white",fontFamily:"Pacifico",fontSize:"40px",textAlign:"center"}}>
      Joined User Stats
      {console.log("in component",chartData)}
    {chartData.labels && <Line options={options} data={chartData}/>}
    </div>
    </div>
    {/* <div>
    <div style={{height:"500px",backgroundColor:"white",fontFamily:"Pacifico",fontSize:"40px",textAlign:"center"}}>
      Daily Posts
      {console.log("in component",chartDataDailyPosts)}
    {chartDataDailyPosts.labels && <Line data={chartDataDailyPosts}/>}
    </div>
    </div> */}
    </div>
    </div>
  );
};

export default PageSubreddit;