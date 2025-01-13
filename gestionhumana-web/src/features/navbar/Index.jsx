import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Menu from '../menu/Index';
import "./styles.css";

const Navbar = () => {
  return (
    <AppBar
    position="fixed"
    style={{ width: "100%", backgroundColor: "rgb(52 1 185)", padding: "4px" }}
  >
    <Toolbar>
      <Menu />
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      <span style={{ marginLeft: '10px' }}>SISTEMA DE GESTION HUMANA</span>
      </Typography>
      {/* <Box display="flex" gap={2}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Button color="inherit">INICIO</Button>
        </Link>
        <Link
          to="/adjuntar-reporte"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button color="inherit">ADJUNTAR REPORTE</Button>
        </Link>
      </Box> */}
       
    </Toolbar>
  </AppBar>
  );
};

export default Navbar;