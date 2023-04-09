import React, { useState,useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "../component/navbardash";
import axios from "axios";
import SearchBar from "material-ui-search-bar";
import "../App.css";
import Fuse from "fuse.js";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

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
  var emailjwt = "";
  var username = "";
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
    console.log(parsedjwt);
    emailjwt = parsedjwt.email;
    username = parsedjwt.UserName;
  }

  console.log("username: ",username);

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

  const navigate = useNavigate();

  var [subgredditarr,setSubarr] = useState([]);
  var [storearr,setStore] = useState([]);
  var [storearr2,setStore2] = useState([]);

  const newUserinfo = {
  };
  
  const urilsub = "http://localhost:4003/user/findallsubg";

  console.log("starting axios first");
  const [query, updateQuery] = useState('');
  const [tagquery,updateTags] = useState('');

  useEffect(()=>{
    console.log("starting axios second");
    axios
      .post(urilsub, newUserinfo)
      .then(res => {  
        console.log("res.data " , res.data); 
        console.log("in axios")
        setSubarr(res.data);
        setStore(res.data);
        setStore2(res.data);
      })
      .catch(err => {
          alert("Try Again sub-length if!");
      });
  },[]);

  console.log("mydata",subgredditarr); 
  console.log("ending axios");
  console.log(subgredditarr); 

  var objs = subgredditarr.length;
  console.log("objs:",objs);
  objs = objs + 3 - objs % 3;
  objs = objs/3;
  var heightval = objs*47 + 100;
  var strheight = heightval + "vh";
  console.log("strheight:",strheight);

  console.log("fise:",storearr2);
  const fuse = new Fuse(storearr2, {
    keys: [
      'name'
    ],
    includeScore: true
  });

  const curr_follower_subgreddits = [];
  // @Change here if name is not unique.
  for(let i=0;i<subgredditarr.length;i++)
  {
    let ok = 0;
    for(let j=0;j<subgredditarr[i].people.length;j++)
    {
      console.log(subgredditarr[i].people[j]);
      console.log(username);
      //@ Changed username to emailjwt
      if(subgredditarr[i].people[j] == emailjwt)
      {
        ok = 1;
      }
    }
    if(ok == 1)
    {
      curr_follower_subgreddits.push(subgredditarr[i]);
    }
  }

  console.log("currfollowd" , curr_follower_subgreddits);

  const [checkboxValue, setCheckboxValue] = useState(0);

  function handleCheckboxChange() {
    setCheckboxValue(checkboxValue === 0 ? 1 : 0);
    // const results = fuse.search(query);
    // const resultsf = subgredditarr.filter(item =>
    //   item.name.toLowerCase().includes(query.toLowerCase())
    // );
    // console.log("fuse out: ",results);
    // console.log("normal out: ",resultsf);
    // checkboxValue === 1 ? setSubarr(results.map(output => output.item)) : setSubarr(resultsf);
  }

  console.log("checkbox",checkboxValue);

  function onSearch({ currentTarget }) {
    console.log("currentTarget:",currentTarget.value);
    console.log("checkboxval search is: ",checkboxValue);
    let ok = 1;
    if(query.length - currentTarget.value.length > 0)
    {
      ok = 0;
    }
    // ok === 0 ? setSubarr(storearr) : console.log("its fine");
    console.log("ok",ok);
    console.log("store: ",storearr);
    console.log("suba: ",subgredditarr);
    console.log("que: ",query);
    updateQuery(currentTarget.value);
    console.log("curr: ",currentTarget.value);
    queryout(currentTarget.value,ok);
  }

  function onFilterTags({ currentTarget }) {
    updateTags(currentTarget.value);
    console.log("tags on filter: ",currentTarget.value);
    tagout(currentTarget.value);
  }

  // Added here

  const options_sort = ['Ascending', 'Descending', 'Followers'];

  // Ended

  const sortnameasc = () => {
    console.log("entering asc");
    const sortedData = [...subgredditarr].sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    console.log(sortedData);
    setSubarr(sortedData);
  };

  const sortnamedesc = () => {
    console.log("entering desc");
    const sortedData = [...subgredditarr].sort((a, b) => {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });
    setSubarr(sortedData);
  };

  const sortfollowers = () => {
    console.log("entering followers");
    const sortedData = [...subgredditarr].sort((a, b) => {
      if (a.people > b.people) {
        return -1;
      }
      if (a.people < b.people) {
        return 1;
      }
      return 0;
    });
    console.log(sortedData);
    setSubarr(sortedData);
  };

  console.log("query ",query);

  function queryout(props1,props2) {
    console.log("query in queryout: ",props1);
    console.log("props2: ",props2);
    var resultsftemp;
    if(props2 == 1)
    {
      // if(checkboxValue == 0)
      // {
      //   console.log("aya sahi jagah");
      //   console.log(props1);
      //   console.log(subgredditarr);
      //   resultsftemp = subgredditarr.filter(item =>
      //   item.name.toLowerCase().includes(props1.toLowerCase())
      //   );
      //   console.log(resultsftemp);
      // }
      // else
      // {
        console.log("in search of fuse");
        resultsftemp = fuse.search(props1);
        var temparr = [];
        for(let i=0;i<resultsftemp.length;i++)
        {
          temparr.push(resultsftemp[i].item);
        }
        resultsftemp = temparr;
        console.log(resultsftemp);
      // }
    }
    else
    {
      resultsftemp = storearr.filter(item =>
        item.name.toLowerCase().includes(props1.toLowerCase())
      );
    }
    console.log("results: ",resultsftemp);
    setSubarr(resultsftemp);
  }

  function tagout(props)
  {
    console.log("tags prop: ",props);
    var tagsArr = props.split(',');
    console.log(tagsArr);
    var results = [];
    for(let x=0;x<tagsArr.length;x++)
    {
      var temp = [];
      for (let j=0;j<storearr2.length;j++)
      {
        let ok = 0;
        var tagtemp = storearr2[j].tags.split(',');
        console.log("tagtemp: ",tagtemp);
        for(let k=0;k<tagtemp.length;k++)
        {
          if(tagtemp[k]==tagsArr[x])
          {
            ok = 1;
          }
        }
        if(ok)
        {
          temp.push(storearr2[j]);
        }
      }
      console.log("tagsarr[x]: ",tagsArr[x]);
      console.log("temp",temp);
      for(let i=0;i<temp.length;i++)
      {
        if(!results.includes(temp[i]))
        {
          results.push(temp[i]);
        }
      }
    }
    console.log("resultstag: ",results);
    setSubarr(results);
    console.log(subgredditarr);
  }

  function routechange(props)
  {
    // event.cancelBubble = true;
    // if (event.stopPropagation) event.stopPropagation();

    /// Starting Code

    const ext = {
      name: props,
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
      const nesturi = "http://localhost:4003/user/checkdailyvisitors";
      axios
      .post(nesturi,newd)
      .then(res=>{
        if(res.data.length > 0)
        {
          console.log("prexists");
          const newdj = {
            id: id,
            date: currentDate,
            visitor: "can't disclose visitor due to privacy concerns",
          };
          const uriupdj = "http://localhost:4003/user/upddailyvisitors"; 
          axios
            .post(uriupdj, newdj)
            .then(res => {   
              console.log("in dailyvisitors success allsubg");
              callingnewpage(props);
            })
            .catch(err => {
                console.log("err in dailyvisitors stats allsubg");
            });
        }
        else
        {
          console.log("doesnt exist prior");
          const newdp = {
            id: id,
            date: currentDate,
            curr_visitors: ["no visitor","can't disclose visitor due to privacy concerns"],
          }
          const nesturip = "http://localhost:4003/user/createdailyvisitors";
          axios
          .post(nesturip,newdp)
          .then(res=>{
            console.log("yaya created daily visitors when not found at be");
            callingnewpage(props);
          })
          .catch(err => {
            console.log("try buddy again loop 1");
          });
        }
      })
      .catch(err => {
        console.log("try buddy again loop 2");
      });
    })
    .catch(err => {
        alert("Try Again latest callfunc loop dv");
    });
    
    //// Ending Code Added
  }

  function callingnewpage(props)
  {
    window.location.href = `/allsubgreddit/${props}`;
  }

  function joinsubg(props)
  {
    let ok = 0;
    for(let i = 0 ; i<subgredditarr.length;i++)
    {
      if(subgredditarr[i].name == props)
      {
        for(let j=0;j<subgredditarr[i].leftusers.length;j++)
        {
          //@ Changed username to emailjwt
          if(subgredditarr[i].leftusers[j] == emailjwt)
          {
            ok = 1;
            break;
          }
        }
      }
      if(ok == 1)
      {
        alert("Trying to join a subgreddit which was earlier left!");
        break;
      }
    }
    if(ok == 0)
    {
      //@ Changed username to emailjwt
      console.log("props in join onclick: ",props);
      const newdata = {
        name: props,
        user: emailjwt,
      };
      const uri = "http://localhost:4003/user/joinsubg";
      axios
          .post(uri, newdata)
          .then(res => {
            console.log("AAGAYA RETURN join subg!!");
          })
          .catch(err => {
              alert("Try Again Update join subg!");
          });
    }
  }

  function leavesubg(props)
  {
    console.log("props in leave onclick: ",props);
    //@ Changed username to emailjwt
    const newdata = {
      name: props,
      user: emailjwt,
    };
    const uri = "http://localhost:4003/user/leavesubg";
    axios
        .post(uri, newdata)
        .then(res => {
           console.log("AAGAYA RETURN leave subg!!");
        })
        .catch(err => {
            alert("Try Again Update leave subg!");
        });
  }

  // to={`/allsubgreddit/${follower.name}`}

  return (
    <div>
    <Navbar></Navbar>

    <div className='bgrepeatlogsubreddit' style={{height: strheight}}>
        <div>
              <div className='subonmod' style={{fontFamily:"Pacifico"}}> All Existing Sub-Greddits </div>
              <form className="search">
                <label>Search-Bar</label>
                <div style={{display:"flex"}}>
                  <div style={{marginLeft:"45%",marginTop:"1.6%",fontSize:"30px"}}>
                    Want to do Fuzzy-Search? &nbsp;
                  </div>
                  <input style={{width:"30px",height:"30px",marginLeft:"-0.2%",marginTop:"2%"}} className='chkbox' type="checkbox" checked={checkboxValue === 1} onChange={handleCheckboxChange}/>
                </div>
                <input style={{fontSize: "30px"}} placeholder='Search' type="text" value={query} onChange={onSearch} />
                <br/>
                <br/>
                <input style={{fontSize: "30px"}} placeholder='Tags Filter' type="text" value={tagquery} onChange={onFilterTags} />
              </form>
              <button onClick={sortnameasc} style={{marginLeft:"45%",marginTop:"1.6%",fontSize:"20px"}}>Sort on the basis of Name Ascending</button>
              <button onClick={sortnamedesc} style={{marginLeft:"45%",marginTop:"1.6%",fontSize:"20px"}}>Sort on the basis of Name Descending</button>
              <button onClick={sortfollowers} style={{marginLeft:"45%",marginTop:"1.6%",fontSize:"20px"}}>Sort on the basis of Followers Descending</button>
              
              <div style={{display:"flex",flexWrap:"wrap"}}>
                {subgredditarr.map((follower, index) => (
                    <div key={index} style={mystyle1} className='divhover' onClick={(event)=>{event.cancelBubble = true; if (event.stopPropagation) event.stopPropagation();routechange(follower.name)}}>
                      {/* print: {follower} <br></br> */}
                      Name: {follower.name} <br></br><br></br>
                      Description: {follower.description} <br></br><br></br>
                      Tags: {follower.tags} <br></br><br></br>
                      Banned Words: {follower.banned} <br></br><br></br>
                      Number of Posts: {follower.posts.length} <br></br><br></br>
                      Number of Followers: {follower.people.length} <br></br><br></br>
                      Number of Blocked Users: {follower.blocked.length} <br></br><br></br> 
                      <Link to={`/subgreddit/${follower.name}`}>more info</Link> &nbsp;&nbsp;
                      <button onClick={(event)=>{event.cancelBubble = true; if (event.stopPropagation) event.stopPropagation();joinsubg(follower.name)}} disabled = {curr_follower_subgreddits.includes(follower) || follower.moderators.includes(emailjwt)}> Join </button> &nbsp;&nbsp;
                      <button onClick={(event)=>{event.cancelBubble = true; if (event.stopPropagation) event.stopPropagation();leavesubg(follower.name)}} disabled = {!curr_follower_subgreddits.includes(follower) || follower.moderators.includes(emailjwt)}> Leave </button>
                    </div>
                ))}
              </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;