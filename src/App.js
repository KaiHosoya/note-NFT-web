import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getCurrentUser } from "./lib/api/user";

import Login from "./views/Logon/Login";
import Signup from "./views/Logon/Signup";
import NoteDetail from "./views/Note/NoteDetail";
import NoteList from "./views/Note/NoteList";
import Post from "./views/Post/Post";
import Profile from "./views/Profile/Profile";
import Purchase from "./views/Purchase/Purchase";

export const authContext = createContext()

const APP = () => {
  const [currentUser, setCurrentUser] = useState("")
  const handleGetCurrentUser = async() => {
    try {
      const res = await getCurrentUser()
      if (res?.data.isLogin === true) {
        setCurrentUser(res?.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])
  return (
    <BrowserRouter>
      <authContext.Provider value={{ currentUser, setCurrentUser}}>
        <Routes>       
          <Route path="/login" element={ <Login />} />
          <Route path="/signup" element={ <Signup />} />
          <Route path="/" element={ <NoteList />} />
          <Route path="/notedetail" element={ <NoteDetail />} />
          <Route path="/purchase" element={ <Purchase />} />
          <Route path="/profile" element={ <Profile />} />
          <Route path="/post" element={ <Post />} />
        </Routes>
      </authContext.Provider>
    </BrowserRouter>
  )
}

export default APP