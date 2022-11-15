import React, { useContext, useState } from "react";
import { Grid, Paper, Avatar, Typography, Box, Button, Link, TextField } from "@mui/material";
import { teal } from "@mui/material/colors";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import "./Login.css"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/api/firebase";
import { authContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [ email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setUser } = useContext(authContext)
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
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
            m: "0 auto"
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
            ログイン
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
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
            <Button type="submit" color="primary" variant="contained" fullWidth>
              ログイン
            </Button>
            <Typography variant="caption" display="block">
              アカウントを持っていますか？
              {/* <Link to="/signup">アカウントを作成</Link> */}
              <Button onClick={() => {navigate("/signup")}}>
                アカウントを作成
              </Button>
            </Typography>
          </Box>
        </form>
        </Paper>
      </Grid>
      </div>
    </div>
  )
}

export default Login;