import React, { useContext } from "react"
import { useState } from "react";
import { AppBar, Typography, Button, Toolbar, Box, IconButton, Container, Tooltip, Menu, MenuItem, Avatar } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/api/firebase";
import { authContext } from "../../App";


const Header = () => {
  const { user } = useContext(authContext)
  const navigate = useNavigate()
  const pages = [
    {
      title: "Home",
      link: "/"
    },
    {
      title: "Post",
      link: "/post"
    },
    {
      title: "Profile",
      link: "/profile"
    }
  ]

  const signout = async() => {
    signOut(auth)
    .then(() => {
      navigate("/login")
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
  <div className="header">
    <AppBar position="static" style={{backgroundColor: "#b0c4de"}}>
      <Container >
        <Toolbar disableGutters>
          <img src="https://pbs.twimg.com/media/FhKRzTkVIAAEJ1W?format=png&name=240x240" onClick={() => {navigate("/")}} alt="chaichai"/>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((value, key) => (
                <MenuItem
                  key={key}
                  onClick={() => {navigate(value.link)}}
                >
                  <Typography textAlign="center">{value.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((value, key) => (
              <Button
                key={key}
                onClick={() => {navigate(value.link)}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {value.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user.photoURL} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem  onClick={() => {navigate("/profile")}}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem  onClick={() => {signout()}}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  </div>
  )
}

export default Header