import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Backdrop
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/authService";
import { Password } from "@mui/icons-material";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const [credentials, setCredentials] = useState({
    usuario: "",
    contraseña: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
   try {
    setLoading(true);
    e.preventDefault();
    setError("");

    console.log("credentials => ", credentials);

    if(credentials.usuario === "" || credentials.contraseña === "") {
      setLoading(false);
      toast.info("Ingrese usuario y contraseña");
      return;
    }

    let request = {
      usuario: credentials.usuario,
      password: credentials.contraseña
    };
    const json = JSON.stringify(request);
    const response = await auth(json);

    if(response.accessToken != null || response.accessToken != undefined) {
      localStorage.setItem("accessToken", response.accessToken);      
      navigate("/");
    };

   } catch(error) {
    setLoading(false);
    
    if (error.response && error.response.status === 401) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage || "Usuario o contraseña incorrectos");
    } else {
      toast.error("Ocurrió un error al intentar autenticar al usuario");
    }
   } finally {
    setLoading(false);
   }
  };

  const handleRegistrarUsuario = () => {
    navigate("/registrar-usuario");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f4f4f4"
    >
      <Card sx={{ width: 350, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            MarkeT.Perú
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Usuario"
              variant="outlined"
              fullWidth
              margin="normal"
              name="usuario"
              value={credentials.usuario}
              onChange={handleChange}
            />
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              name="contraseña"
              value={credentials.contraseña}
              onChange={handleChange}
            />
            {error && (
              <Typography
                color="error"
                variant="body2"
                textAlign="center"
                mt={1}
              >
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Ingresar
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              fullWidth 
              sx={{ mt: 2 }} 
              onClick={handleRegistrarUsuario}
            >
              Registrar usuario
            </Button>
          </form>
        </CardContent>
      </Card>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Login;
