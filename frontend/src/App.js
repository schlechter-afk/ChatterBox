import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Subgreddit from "./pages/subgreddit"
import AllPageSubreddit from "./pages/allpagesubreddit"
import PageSubreddit from "./pages/pagesubreddit"
import UsersSub from "./pages/userssub"
import JrSub from "./pages/jrsub"
import StatsSub from "./pages/statssub"
import ReportedSub from "./pages/reportedsub"
import Allsubreddits from "./pages/allsubgreddits"
import SavedPosts from "./pages/savedposts"
import Messenger from "./pages/chat_message";

import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css"

import { createTheme, ThemeProvider } from '@mui/material';
const theme = createTheme({
  typography: {
    fontFamily: [
      'Pacifico',
      'cursive',
    ].join(','),
  },});

export const currentUserDetails = {
  first_name: "",
  last_name: "",
  user_name: "",
  contact: "",
  email: "",
  age: "",
  data: {},
};

function App() {
  let [t,sett] = React.useState(0);
  function df()
  {
    sett(!t);
  }

  return (
    <div className="reddit_style">
      <Router>
      {/* <Navbar/> */}
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={t ? <Register func={df}/> : <Login func={df}/>} />
        {/* <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />  */}
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/messenger" element={<Messenger/>} />
        <Route path="/subgreddit" element={<Subgreddit/>} />
        <Route path="/allsubgreddit" element={<Allsubreddits/>} />
        <Route path="/savedposts" element={<SavedPosts/>} />
        <Route path="/allsubgreddit/:name" element={<AllPageSubreddit/>}/>
        <Route path="/subgreddit/:name" element={<PageSubreddit/>}/>
        <Route path="/subgreddit/:name/userssub" element={<UsersSub/>}/>
        <Route path="/subgreddit/:name/jrsub" element={<JrSub/>}/>
        <Route path="/subgreddit/:name/statssub" element={<StatsSub/>}/>
        <Route path="/subgreddit/:name/reportedsub" element={<ReportedSub/>}/>
      </Routes>
    </Router>
    </div>
  );
}
export default App;
