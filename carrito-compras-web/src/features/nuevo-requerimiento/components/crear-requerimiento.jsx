import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Grid, FormControlLabel, Checkbox, Backdrop } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { format } from 'date-fns';
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress';
import {crearRequerimientoServices} from '../../../services/gestionHumanaServices'

const CrearRequerimiento = () => {
  const [formData, setFormData] = useState({
    ape_paterno: '',
    ape_materno: '',
    nombres: '',
    email: '',
    num_cel: '',
    direccion: '',
    puesto_solicitante: '',
    activo: true,
    usuario_id: '72192024',
    fecha_creacion: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  });


  const [loading, setLoading] = useState(false);
  
  useEffect(() => { 
    const interval = setInterval(() => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        fecha_creacion: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    const formattedDate = format(new Date(value), 'yyyy-MM-dd HH:mm:ss');
    setFormData({
      ...formData,
      fecha_creacion: formattedDate,
    });
  };

  const resetForm = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ape_paterno: '',
      ape_materno: '',
      nombres: '',
      email: '',
      num_cel: '',
      direccion: '',
      puesto_solicitante: '',
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Formulario enviado:', formData);

    const request = {
      apePaterno: formData.ape_paterno,
      apeMaterno: formData.ape_materno,
      nombres: formData.nombres,
      email: formData.email,
      numCel: formData.num_cel,
      direccion: formData.direccion,
      puestoSolicitante: formData.puesto_solicitante,
      activo: formData.activo,
      //usuarioId: formData.usuario_id,
      fechaCreacion: formData.fecha_creacion
    };

    const requestJson = JSON.stringify(request);

    console.log("requestJson", requestJson);
    try {
      const response = await crearRequerimientoServices(requestJson);
      console.log('Respuesta:', response);

      if (response.statusCode === 200) {
        toast.success(response.message);
        resetForm(); 
      } else {
        toast.error('Error al crear el requerimiento');
      }

      setLoading(false);
    } catch (error) {
      toast.error('Error al crear el requerimiento');
    }

  };

  return (
    <Container maxWidth="md"> 
      <Box sx={{ mt: 13 }}> 
        <Typography variant="h4" component="h1" gutterBottom>
          Crea un nuevo requerimiento <PersonAddIcon />
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Apellido Paterno"
                name="ape_paterno"
                value={formData.ape_paterno}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Apellido Materno"
                name="ape_materno"
                value={formData.ape_materno}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombres"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Número de Celular"
                name="num_cel"
                value={formData.num_cel}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Dirección"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Puesto Solicitante"
                name="puesto_solicitante"
                value={formData.puesto_solicitante}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.activo}
                    onChange={handleChange}
                    name="activo"
                    color="primary"
                  />
                }
                label="Activo"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Usuario Solicitante"
                name="usuario_id"
                value={formData.usuario_id}
                onChange={handleChange}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                label="Fecha de Creación"
                name="fecha_creacion"
                value={formData.fecha_creacion}
                onChange={handleDateChange}
                fullWidth
                placeholder="yyyy-MM-dd HH:mm:ss"
                disabled
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, width: '100%' }}>
            Crear
          </Button>
       
        </form>
        <br />
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default CrearRequerimiento;