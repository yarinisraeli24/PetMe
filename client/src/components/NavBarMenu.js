import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SwipeIcon from '@mui/icons-material/Swipe';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PetsIcon from '@mui/icons-material/Pets';
import './Navbar.css';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { getToken } from '../common/utils';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const NavBarMenu = () => {
  const navigate = useNavigate()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const token = getToken();
  const isLoggedIn = !!token;
  const onLogOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
    <AppBar variant="outlined" position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setIsDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography marginLeft={5} variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center'}}>
          PetMe
        </Typography>

        <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <DrawerHeader>
          <IconButton onClick={() => setIsDrawerOpen(false)}>
          Close
          <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
          <List className='menu'>
            <ListItem button className='listItem' onClick={() => navigate('/')}>
            <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem button className='listItem' onClick={() => navigate('/users/swipes')}>
              <ListItemIcon>
                <SwipeIcon />
              </ListItemIcon>
              <ListItemText primary="Pets"/>
            </ListItem>

            <ListItem button className='listItem' onClick={() => navigate('/users/favorites')}>
              <ListItemIcon>
              <PetsIcon/>
              </ListItemIcon>
              <ListItemText primary="My Favorite" />
            </ListItem>

            {isLoggedIn && <ListItem button className='listItem' onClick={() => navigate('/users/profile')}>
              <ListItemIcon>
              <AccountCircleIcon/>
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            }

            <ListItem button className='listItem' onClick={() => navigate('/allAssociations')}>
              <ListItemIcon>
              <ConnectWithoutContactIcon/>
              </ListItemIcon>
              <ListItemText primary="Associations" />
            </ListItem>

          </List>

        </Drawer>

        {isLoggedIn ?
          <Button color="inherit" onClick={onLogOut}>Login Out</Button> :
          <Button color="inherit" onClick={()=> navigate('/login')}>Login</Button> }

      </Toolbar>
    </AppBar>
    </Box>
  );
}

export default NavBarMenu;