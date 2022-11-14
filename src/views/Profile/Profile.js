import { Avatar, Typography, List, ListItem, ListItemAvatar, Divider, ListItemText } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

const Profile = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Header/>
      <div>
        <div>
          <Avatar
            alt="user profile icon" 
            src="https://i.seadn.io/gae/wMl4j3hFxn171C6mY7nyCsbzb6yQiYZMB3euhfvjW7KK9wrcR1eqBnJYMxSM42CiMLxAu_EM6goYjFcZxuXXe8C1PUgIKF_OWPRS?auto=format&w=750"
            sx={{ width: 200, height: 200 }}
          />
          <Typography>
            Kai Hosoya
          </Typography>
        </div>
        <div>
          <List sx={{ width: '100%', maxWidth: "100vw", bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start" onClick={() => {navigate("/notedetail", {state: {isOwner: true}})}}>
              <Divider />
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="https://i.seadn.io/gae/wMl4j3hFxn171C6mY7nyCsbzb6yQiYZMB3euhfvjW7KK9wrcR1eqBnJYMxSM42CiMLxAu_EM6goYjFcZxuXXe8C1PUgIKF_OWPRS?auto=format&w=750" />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider />
          </List>
        </div>
      </div>
    </div>
  )
}

export default Profile