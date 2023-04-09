import { Typography } from "@material-ui/core";
import "../App.css";
import Navbar from "../component/Navbar";
import img from "./bghome.png";

// import { createTheme, ThemeProvider } from '@material-ui/core/styles';
// const theme = createTheme({
//   typography: {
//     fontFamily: [
//       'Pacifico',
//       'cursive',
//     ].join(','),
// },});

function About() {
  return(
    <div>
    <Navbar></Navbar>
    <div className="home_style_bg">
    {/* <ThemeProvider theme = {theme}> */}
    <div className="home_style" style={{fontSize:100}}>
    Welcome to Greddit!
    </div>
    {/* </ThemeProvider> */}
    </div>
    </div>
  );
}
export default About;