import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Menu from '../menu/Index';
import LogoutIcon from '@mui/icons-material/Logout';
import "./styles.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => { 
    localStorage.clear(); 
    navigate('/login', { replace: true });
  };

  return (
    <AppBar
      position="fixed"
      style={{ width: "100%", backgroundColor: "rgb(52 1 185)", padding: "4px" }}
    >
      <Toolbar> 
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <span style={{ marginLeft: '10px' }}>MarkeT Compras Perú</span>
        </Typography>
        
        <Button
          color="inherit"
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            borderRadius: '8px',
            padding: '8px 16px',
          }}
        >
          Cerrar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;