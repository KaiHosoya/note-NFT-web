import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import Header from "../../components/Header/Header";

const Purchase = () => {
  return (
    <div>
      <Header/>
      <div>
        <Box
          // sx={{
          //   width: 300,
          //   height: 300,
          //   backgroundColor: 'white',
          // }}
        >
          <Card　sx={{ maxWidth:500 }}>
            <CardContent>
              <Typography variant="v4">
                起業ゼミ
              </Typography>
            </CardContent>
            <CardActions>
              <Button>
                購入する
              </Button>
            </CardActions>
          </Card>
        </Box>
      </div>
    </div>
  )
}

export default Purchase