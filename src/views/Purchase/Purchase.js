import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import React from "react";
import Header from "../../components/Header/Header";
import "./Purchase.css"
import { useNavigate } from "react-router-dom";

const Purchase = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Header/>
      <div>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="90vh"
        >
          <Card　sx={{ minWidth:500, minHeight:500, textAlign: "center"}}>
            <CardContent>
              <Typography variant="v4">
                起業ゼミ
              </Typography>
              <Typography>
              事業アイディアの見つけ方と磨き方
              </Typography>
              <img className="purchase_image" src="https://i.pinimg.com/474x/08/5c/37/085c37abbf5bc4bc5eff8462b85979e2.jpg" alt="noteImage"/>
            </CardContent>
            <CardActions>
              <Button startIcon={<AddTaskIcon />}>
                購入する
              </Button>
              <Button size="small" color="primary" onClick={() => {navigate("/")}}>
                <ArrowBackIcon />
              </Button>
            </CardActions>
          </Card>
        </Box>
      </div>
    </div>
  )
}

export default Purchase