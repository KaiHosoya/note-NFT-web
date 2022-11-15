import React, { useContext, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Grid, Paper, Avatar, Typography, Box, Button, TextField } from "@mui/material";
import { teal } from "@mui/material/colors";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import "./Signup.css"
import { useNavigate } from "react-router-dom";
import { auth } from "../../lib/api/firebase";
import { authContext } from "../../App";

const Signup = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [confirmation, setConfirmation] = useState("")

  const navigate = useNavigate()
  const { setUser } = useContext(authContext)

  const handleSubmit = async(e) => {
    e.preventDefault()

    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      updateProfile(auth.currentUser, {
        displayName: name
      })
      setUser(userCredential.user)
      navigate("/")
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <div className="LoginContent">
      <Grid>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            height: "70vh",
            width: "50vw",
            m: "0px auto"
          }}
        >
        <Grid
          container
          direction="column"
          justifyContent="flex-start" //多分、デフォルトflex-startなので省略できる。
          alignItems="center"
        >
          <Avatar sx={{ bgcolor: teal[400] }}>
            <ExitToAppIcon />
          </Avatar>
          <Typography variant={"h5"} sx={{ m: "30px" }}>
            アカウントを作成
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="standard"
            fullWidth required
            onChange={(e) => {setName(e.target.value)}}
          />
          <TextField
            label="Email" 
            variant="standard" 
            fullWidth required 
            onChange={(e) => {setEmail(e.target.value)}}
          />
          <TextField
            type="password"
            label="Password"
            variant="standard"
            fullWidth
            required
            onChange={(e) => {setPassword(e.target.value)}}
          />
          <Box mt={3}>
            <Button
              type="submit" 
              color="primary" 
              variant="contained" 
              fullWidth
            >
              作成
            </Button>

            {/* <Typography variant="caption">
              <Link href="#">パスワードを忘れましたか？</Link>
            </Typography> */}
            <Typography variant="caption" display="block">
              アカウントを持っていますか？
              <Button onClick={() => {navigate("/login")}}>ログイン</Button>
            </Typography>
          </Box>
        </form>
        </Paper>
      </Grid>
      </div>
    </div>
  )
}

export default Signup;