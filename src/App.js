
import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "./lib/api/firebase";


import Login from "./views/Logon/Login";
import Signup from "./views/Logon/Signup";
import NoteDetail from "./views/Note/NoteDetail";
import NoteList from "./views/Note/NoteList";
import Post from "./views/Post/Post";
import Profile from "./views/Profile/Profile";
import ProfileDetail from "./views/Profile/ProfileDetail";
import Purchase from "./views/Purchase/Purchase";

export  const authContext = createContext()
const APP = () => {
  const [user, setUser] = useState("")

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user)
    });
    return () => {
      unsubscribed();
    };
  }, [user])
  return (
    <BrowserRouter>
    <authContext.Provider value={{user, setUser}}>
        <Routes>

          <Route path="/login" element={ <Login />} />
          <Route path="/signup" element={ <Signup />} />
          <Route path="/" element={ <NoteList />} />
          <Route path="/notedetail" element={ <NoteDetail />} />
          <Route path="/purchase" element={ <Purchase />} />
          <Route path="/profile" element={ <Profile />} />
          <Route path="/profile/detail" element={ <ProfileDetail />} />
          <Route path="/post" element={ <Post />} />
        </Routes>
    </authContext.Provider>
    </BrowserRouter>
    
  )
}

export default APP