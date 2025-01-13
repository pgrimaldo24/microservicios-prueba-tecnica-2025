import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; 
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import InboxIcon from '@mui/icons-material/Inbox';

const Menu = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const menuItems = [
    { text: 'Inicio', path: '/home', icon: <HomeIcon /> },
    { text: 'Crear requerimiento', path: '/nuevo-requerimiento', icon: <CreateIcon /> },
    { text: 'Bandeja de requerimientos', path: '/bandeja', icon: <InboxIcon /> },
  ];

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{ '& .MuiDrawer-paper': { width: '23%' } }}
      >
        <List>
          {menuItems.map((item, index) => (
           <ListItem button key={index} component="a" href={item.path}>
           <ListItemIcon>{item.icon}</ListItemIcon>
           <ListItemText primary={item.text} />
         </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Menu;