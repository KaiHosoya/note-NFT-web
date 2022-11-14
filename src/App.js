import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./views/Logon/Login";
import Signup from "./views/Logon/Signup";
import NoteDetail from "./views/Note/NoteDetail";
import NoteList from "./views/Note/NoteList";
import Post from "./views/Post/Post";
import Profile from "./views/Profile/Profile";
import Purchase from "./views/Purchase/Purchase";

const APP = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ <Login />} />
        <Route path="/signup" element={ <Signup />} />
        <Route path="/" element={ <NoteList />} />
        <Route path="/notedetail" element={ <NoteDetail />} />
        <Route path="/purchase" element={ <Purchase />} />
        <Route path="/profile" element={ <Profile />} />
        <Route path="/post" element={ <Post />} />
      </Routes>
    </BrowserRouter>
  )
}

export default APP