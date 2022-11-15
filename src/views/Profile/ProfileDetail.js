import { Box, Button, Card, CardActions, CardContent, TextField } from "@mui/material";
import { updateProfile } from "firebase/auth";
import { auth } from "../../lib/api/firebase";
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { authContext } from "../../App";
import Header from "../../components/Header/Header";

const ProfileDetail = () => {
  const { user } = useContext(authContext)
  const navigate = useNavigate()
  console.log(user.displayName)
  const defaultName = user.displayName
  const [name, setName] = useState("")
  const [url, setUrl] = useState()
  const handleSubmit = async(e) => {
    e.preventDefault()
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: url
    })
    .then(() => {
      navigate("/profile")
    })
    .catch((err) => {
      console.log(err)
    })
  }
  return (
    <>
      { user ? (
        <div>
          <Header/>
          <div>
            <Box>
              <form onSubmit={handleSubmit}>
                <Card>
                  <CardContent>
                    <TextField
                      value={defaultName}
                      onChange={(e) => {setName(e.target.value)}}
                    />
                    <TextField
                      lavel="画像のURL"
                      value={user.photoURL}
                      onChange={(e) => {setUrl(e.target.value)}}
                    />
                  </CardContent>
                  <CardActions>
                    <Button type="submit">更新</Button>
                  </CardActions>
                </Card>
              </form>
            </Box>
          </div>
        </div>
      ) : (
        <Navigate to="/login"/>
      )}
    </>
  )
}

export default ProfileDetail