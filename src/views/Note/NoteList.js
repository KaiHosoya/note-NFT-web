import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';

import Header from '../../components/Header/Header';

export default function NoteList() {
  const navigate = useNavigate()
  return (
    <div>
      <Header />
      <div>
        <List sx={{ width: '100%', maxWidth: "100vw", bgcolor: 'background.paper' }}>
          <ListItem alignItems="flex-start">
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
            <InfoIcon onClick={() => {navigate("/notedetail", {state: {isOwner: false}})}}/>
            <ShoppingCartIcon onClick={() => {navigate("/purchase")}}/>
          </ListItem>
          <Divider />
        </List>
      </div>
    </div>
  );
}