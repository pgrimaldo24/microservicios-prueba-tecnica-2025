import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Backdrop,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { crearUsuario } from "../../../services/mantenimientoUsuarioService";

const RegistrarUsuario = () => {
  const [formData, setFormData] = useState({
    usuario: "",
    contraseña: "",
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    celular: "",
    correo: "",
    direccion: "",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLimpiarFormulario = () => {
    setFormData({
      usuario: "",
      contraseña: "",
      nombres: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      celular: "",
      correo: "",
      direccion: "",
    });
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      console.log(formData);

      let request = {
        usuario: formData.usuario,
        password: formData.contraseña,
        nombre: formData.nombres,
        apellido_paterno: formData.apellidoPaterno,
        apellido_materno: formData.apellidoMaterno,
        celular: formData.celular,
        correo: formData.correo,
        direccion: formData.direccion,
      };
      const json = JSON.stringify(request);
      const response = await crearUsuario(json);
      console.log("response", response);

      if (response.statusCode === 201) {
        toast.success(response.message);
        handleLimpiarFormulario();
        navigate("/login");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleVolver = () => {
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Registrar usuario
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Usuario"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contraseña"
                name="contraseña"
                type="password"
                value={formData.contraseña}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombres"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Apellido Paterno"
                name="apellidoPaterno"
                value={formData.apellidoPaterno}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Apellido Materno"
                name="apellidoMaterno"
                value={formData.apellidoMaterno}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Celular"
                name="celular"
                type="tel"
                value={formData.celular}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Correo"
                name="correo"
                type="email"
                value={formData.correo}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Dirección"
                name="direccion"
                multiline
                rows={3}
                value={formData.direccion}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Registrar
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleVolver}
              >
                Volver
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
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
    </Container>
  );
};

export default RegistrarUsuario;
