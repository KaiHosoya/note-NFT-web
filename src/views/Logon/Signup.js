import React, { useState } from "react";
import Cookies from "js-cookie"
import { Grid, Paper, Avatar, Typography, Box, Button, Link, TextField } from "@mui/material";
import { teal } from "@mui/material/colors";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import "./Signup.css"
import { signUp } from "../../lib/api/user";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmation, setConfirmation] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    const params = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: confirmation
    }
    console.log(params)
    try {
      const res = await signUp(params)
      console.log(res)
      if (res?.status === 200) {
        // アカウント作成と同時にログインさせてしまう
        // 本来であればメール確認などを挟むべきだが、今回はサンプルなので
        console.log(res)
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        // setCurrentUser(res.data.data)
        navigate("/")
      }
    } catch (error) {
      console.log(error)
    }
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
            m: "20px auto"
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

          <TextField
            type="password"
            label="Passwordの確認"
            variant="standard"
            fullWidth
            required
            onChange={(e) => {setConfirmation(e.target.value)}}
          />

          {/* ラベルとチェックボックス */}
          {/* <FormControlLabel
            labelPlacement="end"
            label="パスワードを忘れました"
            control={<Checkbox name="checkboxA" size="small" color="primary" />}
          /> */}
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
              <Link to="/login">ログイン</Link>
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