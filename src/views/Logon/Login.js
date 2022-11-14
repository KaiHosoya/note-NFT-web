import React from "react";
import { Grid, Paper, Avatar, Typography, Box, Button, Link, TextField } from "@mui/material";
import { teal } from "@mui/material/colors";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import "./Login.css"

const Login = () => {
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
            ログイン
          </Typography>
        </Grid>
        <form>
          <TextField label="Email" variant="standard" fullWidth required />
          <TextField
            type="password"
            label="Password"
            variant="standard"
            fullWidth
            required
          />
          {/* ラベルとチェックボックス */}
          {/* <FormControlLabel
            labelPlacement="end"
            label="パスワードを忘れました"
            control={<Checkbox name="checkboxA" size="small" color="primary" />}
          /> */}
          <Box mt={3}>
            <Button type="submit" color="primary" variant="contained" fullWidth>
              ログイン
            </Button>

            {/* <Typography variant="caption">
              <Link href="#">パスワードを忘れましたか？</Link>
            </Typography> */}
            <Typography variant="caption" display="block">
              アカウントを持っていますか？
              <Link to="/signup">アカウントを作成</Link>
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