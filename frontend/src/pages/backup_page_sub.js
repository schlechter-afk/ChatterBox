import { Link, useParams } from 'react-router-dom';
// import products from '../data';

import { Container, Paper, Typography } from '@material-ui/core'
import "../App.css"
import Fuse from "fuse.js";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import Navbar from "../component/navbar_subgreddit";
import ReactDOM from "react-dom";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
  logosub: 
  {
    flexGrow: "1",
    cursor: "pointer",
    color: "black",
    marginLeft: theme.spacing(2),
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

const [searchData, setSearchData] = useState(data);

const searchItem = (query) => {
  if (!query) {
    setSearchData(data);
    return;
  }
  const fuse = new Fuse(data, {
    keys: ["name", "tags"]
  });
  const result = fuse.search(query);
  const finalResult = [];
  if (result.length) {
    result.forEach((item) => {
      finalResult.push(item.item);
    });
    setSearchData(finalResult);
  } else {
    setSearchData([]);
  }
};

const PageSubreddit = () => {
  const { name } = useParams();
  const stylecomp = useStyles();
  const theme = useTheme();
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

      {/* Search Bar */}

    <div>
      <p className="title"> Technologies</p>
      <div className="search-container">
        <input
          type="search"
          onChange={(e) => searchItem(e.target.value)}
          placeholder="Search Technologies"
        />
      </div>

      <div className="item-container">
        {searchData.map((item) => (
          <Item {...item} key={item.name} />
        ))}
      </div>
    </div>

    {/* Search Bar */}

    <div className="dashboard_style">
    <section className='section product'>
      <h2>Welcome to {name}'s page</h2>
    </section>
    </div>
    </div>
  );
};

export default PageSubreddit;