import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  colors,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import logoimg from "./logo.png";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LoginIcon from '@mui/icons-material/Login';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';

function logout() {
  localStorage.removeItem("email");
  window.location.reload();
}

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
    fontFamily: 'Pacifico',
  },
  link: 
  {
    textDecoration: "none",
    color: "black",
    // cursor: pointer,
    // height:50,
    // width:50,
    marginLeft: theme.spacing(5),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
  linkbut: 
  {
    marginLeft: theme.spacing(5),
    backgroundColor:"yellow",
    fontFamily: 'Pacifico',
    fontSize:20,
  },
}));

function Navbar() {
  const stylecomp = useStyles();
  const theme = useTheme();

  return (
    <AppBar position="static" className={stylecomp.appBar}>
      {/* <ThemeProvider theme = {themenew}> */}
      <CssBaseline />
      <Toolbar>
        <img src={logoimg} width = {50} height = {50}></img>
        <Typography className={stylecomp.logo} style={{fontSize:39}}>
          greddit   
        </Typography>
          <div className={stylecomp.navlinks}>
            <Link to="/subgreddit" className={stylecomp.link} style={{fontFamily:"Pacifico",fontSize:"27px",textDecorationLine: 'underline'}}>
              My-Subgreddits
            </Link>
            <Link to="/allsubgreddit" className={stylecomp.link} style={{fontFamily:"Pacifico",fontSize:"27px",textDecorationLine: 'underline'}}>
              All Subgreddits
            </Link>
            <Link to="/" className={stylecomp.link}>
              <HomeOutlinedIcon sx={{fontSize:"40px"}}/>
            </Link>
            <Link to="/login" className={stylecomp.link}>
              <LoginIcon sx={{fontSize:"40px"}}/>
            </Link>
            <Link to="/dashboard" className={stylecomp.link}>
              <AccountBoxTwoToneIcon sx={{fontSize:"40px"}}/>
            </Link>
          </div>
        <LogoutOutlinedIcon sx={{fontSize:"40px"}} className={stylecomp.link} onClick={logout}/>
        {/* <button onClick={logout} className={stylecomp.linkbut} >LOGOUT</button> */}
      </Toolbar>
      {/* </ThemeProvider> */}
    </AppBar>
  );
}
export default Navbar;