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
  const [chartDataDailyVisitors,setChartDataVisitors] = useState({});
  const [chartDataRepvdel,setChartDataRepvdel] = useState({});

  // setTimeout(()=>{console.log("hello")},1000)
  console.log("hello");


  const optionsstyle = {
    backgroundColor:"black",
    scales: {
      yAxes: [
        {
          ticks: {
            fontSize: "20px",
            fontColor: "white"
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            fontSize: "20px",
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
          num_users.push(res.data[i].daily_posts.length - 1);
        }
        // datedailyposts = datedailyposts.reverse();
        // num_users = num_users.reverse();
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
  },[setChartDataDailyPosts]);

  //// Daily Posts Stats

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
          // datetemp = datetemp.reverse();
          // userstemp = userstemp.reverse();
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
          if(isMounted)
          {
            setChartData(data);   
          }  
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
    return () => {
      isMounted = false;
    };
    },[setChartData]);

  /////

  //// Daily Visitors Stats

  useEffect(()=>{
    let isMounted = true; // Add Boolean
    const extv = {
      name: name,
    }
    const uriextidv = "http://localhost:4003/user/extid";
    axios
    .post(uriextidv, extv)
    .then(res => {   
      console.log("id req is:", res.data); 
      const id = res.data[0]._id;
      const newdv = {
        id: id,
      }
      const nesturiv = "http://localhost:4003/user/extractdailyvisitors";
      axios
      .post(nesturiv,newdv)
      .then(res=>{
        if(res.data.length > 0)
        {
          var date_arr = [];
          var visitors_arr = [];
          for(let i=0;i<res.data.length;i++)
          {
            date_arr.push(res.data[i].date);
            visitors_arr.push(res.data[i].visitors.length);
          }
          // date_arr = date_arr.reverse();
          // visitors_arr = visitors_arr.reverse();

          const data = {
            labels: date_arr,
            datasets: [{data: visitors_arr,
            label: 'Daily Visitors',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'yellow',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,}],
          };
          if(isMounted)
          {
            setChartDataVisitors(data);   
          }  
        }
        else
        {
          alert("data visitors doesnt exists");
        }
      })
      .catch(err => {
        console.log("try buddy again");
      });
    })
    .catch(err => {
        alert("Try Again latest callfunc");
    });
    return () => {
      isMounted = false;
    };
    },[setChartDataVisitors]);
  
  /////

    //// Repvdel Stats

    useEffect(()=>{
      let isMounted = true; // Add Boolean
      const extr = {
        name: name,
      }
      const uriextidr = "http://localhost:4003/user/extid";
      axios
      .post(uriextidr, extr)
      .then(res => {   
        console.log("id req is:", res.data); 
        const id = res.data[0]._id;
        const newdr = {
          id: id,
        }
        const nesturir = "http://localhost:4003/user/extractrepvdel";
        axios
        .post(nesturir,newdr)
        .then(res=>{
          if(res.data.length > 0)
          {
            var date_arr_repvdel = [];
            var rep = [];
            var del = [];
            for(let i=0;i<res.data.length;i++)
            {
              date_arr_repvdel.push(res.data[i].date);
              let lenr = 0;
              let lend = 0;
              for(let j=0;j<res.data[i].reported.length;j++)
              {
                if(res.data[i].reported[j] != "null")
                {
                  lenr = lenr + 1;
                }
              }
              for(let j=0;j<res.data[i].deleted.length;j++)
              {
                if(res.data[i].deleted[j] != "null")
                {
                  lend = lend + 1;
                }
              }
              rep.push(lenr);
              del.push(lend);
            }
            // date_arr_repvdel = date_arr_repvdel.reverse();
            // rep = rep.reverse();
            // del = del.reverse();
  
            const data = {
              labels: date_arr_repvdel,
              datasets: [
                {data: rep,
              label: 'Reported',
              fill: false,
              lineTension: 0.5,
              backgroundColor: 'blue',
              borderColor: 'blue',
              borderWidth: 2,},
              {data: del,
                label: 'Deleted',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'red',
                borderColor: 'red',
                borderWidth: 2,} 
            ],
            };
            if(isMounted)
            {
              setChartDataRepvdel(data);   
            }  
          }
          else
          {
            alert("data repvdel doesnt exists");
          }
        })
        .catch(err => {
          console.log("try buddy again");
        });
      })
      .catch(err => {
          alert("Try Again latest callfunc");
      });
      return () => {
        isMounted = false;
      };
      },[setChartDataRepvdel]);
    
    /////

  console.log("chartdata: ",chartData);
  console.log("daily posts stats:",chartDataDailyPosts);
  console.log("daily visitors stats:",chartDataDailyVisitors);
  console.log("repvdel stats:",chartDataRepvdel);

  // *******************************************

  return (
    <div>
    <Navbar/>
    <div className="dashboard_style_stats">
    <div>
    <div style={{height:"500px",width:"1000px",backgroundColor:"white",fontFamily:"Pacifico",fontSize:"40px",textAlign:"center"}}>
      Joined User Stats
      {console.log("in component",chartData)}
    {chartData.labels && <Line options={optionsstyle} data={chartData}/>}
    </div>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <div>
    <div style={{height:"400px",width:"1000px",backgroundColor:"white",fontFamily:"Pacifico",fontSize:"40px",textAlign:"center"}}>
      Daily Posts
      {console.log("in component",chartDataDailyPosts)}
    {chartDataDailyPosts.labels && <Line options={optionsstyle} data={chartDataDailyPosts}/>}
    </div>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <div>
    <div style={{height:"400px",width:"1000px",backgroundColor:"white",fontFamily:"Pacifico",fontSize:"40px",textAlign:"center"}}>
      Daily Visitors
      {console.log("in component",chartDataDailyVisitors)}
    {chartDataDailyVisitors.labels && <Line options={optionsstyle} data={chartDataDailyVisitors}/>}
    </div>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <div>
    <div style={{height:"400px",width:"1000px",backgroundColor:"white",fontFamily:"Pacifico",fontSize:"40px",textAlign:"center"}}>
      Reported vs Deleted
      {console.log("in component",chartDataRepvdel)}
    {chartDataRepvdel.labels && <Line data={chartDataRepvdel}/>}
    </div>
    </div>
    </div>
    </div>
  );
};

export default PageSubreddit;