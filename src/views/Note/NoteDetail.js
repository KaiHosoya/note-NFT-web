import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Card, CardMedia, CardActions, Button } from "@mui/material";

const NoteDetail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // TODO isOwner の真偽で画像をぼかすか決める
  const isOwner = location.state.isOwner

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="90vh"
      >
        <Card sx={{ maxWidth: 800 }}>
          <CardMedia
            component="img"
            src="https://c.neevacdn.net/image/fetch/s--IvMEad_d--/https%3A//cdn.clearnotebooks.com/uploads/page/file/3299052/file.jpg?savepath=file.jpg"
          />
          <CardActions>
            {isOwner ? (
              <Button size="small" color="primary" onClick={() => {navigate("/profile")}}>
                <ArrowBackIcon />
              </Button>
            ) : (
              <Button size="small" color="primary" onClick={() => {navigate("/")}}>
                <ArrowBackIcon />
              </Button>
            )}
          </CardActions>
        </Card>
      </Box>
    </div>
  )
}

export default NoteDetail;