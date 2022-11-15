import { Avatar, Typography, List, ListItem, ListItemAvatar, Divider, ListItemText } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../App";
import Header from "../../components/Header/Header";
import "./Profile.css"

const Profile = () => {
  const navigate = useNavigate()
  const { user } = useContext(authContext)
  console.log(user)
  return (
    <div>
    <Header/>
      <div>
        <div className="profileInfo">
          <Avatar
            alt={user.displayName}
            src={user.photoURL}
            sx={{ width: 200, height: 200, justifyContent: "center" }}
          />
          <React.Fragment>
            <Typography sx={{ display: 'inline' }}>
              {user?.displayName}
            </Typography >
            <ModeEditIcon onClick={() => {navigate("/profile/detail")}}/>
          </React.Fragment>
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