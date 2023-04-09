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

function Navbar() {
  const stylecomp = useStyles();
  const theme = useTheme();

  return (
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
            <Link to="/userssub" className={stylecomp.logosub} style={{fontSize:29}}>
                Users   
            </Link>
            <Link to="/jrsub" className={stylecomp.logosub} style={{fontSize:29}}>
                Joining Requests  
            </Link>
            <Link to="/statssub" className={stylecomp.logosub} style={{fontSize:29}}>
                Stats
            </Link>
            <Link to="/reportedsub" className={stylecomp.logosub} style={{fontSize:29}}>
                Reported 
            </Link>

            <Link to="/dashboard" className={stylecomp.link}>
              <AccountBoxTwoToneIcon sx={{fontSize:"40px"}}/>
            </Link>
          </div>  
      </Toolbar>
      </ThemeProvider>
    </AppBar>
  );
}
export default Navbar;
