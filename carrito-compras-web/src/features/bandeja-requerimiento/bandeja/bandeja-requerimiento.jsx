import React, { useCallback, useEffect, useState } from "react";
import {
  FormControlLabel,
  Checkbox,
  Container,
  TextField,
  Button,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Backdrop,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import CircularProgress from "@mui/material/CircularProgress";
import {
  listarBandeja,
  eliminarRegistro,
  obtenerCandidato,
  actualizarRequerimiento,
} from "../../../services/gestionHumanaServices";
import { toast } from "react-toastify";

const BandejaRequerimiento = () => {
  const [filters, setFilters] = useState({
    id: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    apePaterno: "",
    apeMaterno: "",
    nombres: "",
    email: "",
    numCel: "",
    direccion: "",
    puestoSolicitante: "",
    activo: true,
    usuario_id: "72192024",
    fecha_creacion: format(new Date(), "dd-MM-yyyy HH:mm:ss"),
    fechaActualizacion: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSearch = async () => {
    setLoading(true);
    const listaData = await listarBandeja();

    if (listaData.statusCode === 200) {
      setData(listaData.results);
      setLoading(false);
    } else {
      toast.error(listaData.message);
      setLoading(false);
    }
  };

  const handleUpdate = async (id) => {
    setLoading(true);
    try {
      const responseSolicitud = await obtenerCandidato(id);

      if (responseSolicitud.statusCode === 200) {
        setFormData({
          id: responseSolicitud.data.id,
          apePaterno: responseSolicitud.data.apePaterno || "",
          apeMaterno: responseSolicitud.data.apeMaterno || "",
          nombres: responseSolicitud.data.nombres || "",
          email: responseSolicitud.data.email || "",
          numCel: responseSolicitud.data.numCel || "",
          direccion: responseSolicitud.data.direccion || "",
          puestoSolicitante: responseSolicitud.data.puestoSolicitante || "",
          activo: responseSolicitud.data.activo,
          usuario_id: responseSolicitud.data.usuarioId,
          fecha_creacion: responseSolicitud.data.fechaCreacion,
        });

        setOpenUpdate(true);
      } else {
        toast.error(responseSolicitud.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Formulario enviado:", formData);

    const body = {
      id: formData.id,
      apePaterno: formData.apePaterno,
      apeMaterno: formData.apeMaterno,
      nombres: formData.nombres,
      email: formData.email,
      numCel: formData.numCel,
      direccion: formData.direccion,
      puestoSolicitante: formData.puestoSolicitante,
      activo: formData.activo,
      fechaActualizacion: format(new Date(), "dd-MM-yyyy HH:mm:ss"),
    };

    const actualizar = await actualizarRequerimiento(body);

    if (actualizar.statusCode === 200) {
      toast.success(actualizar.message);
      setLoading(false);
      handleSearch();
    } else {
      toast.error(actualizar.message);
      setLoading(false);
    }
    handleCloseUpdate();
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setSelectedId(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    const response = await eliminarRegistro(selectedId);

    if (response.statusCode === 200) {
      toast.success(response.message);
      setOpenDelete(false);
      handleSearch();
    } else {
      toast.error(response.message);
    }
    setOpenDelete(false);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 13 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bandeja de Requerimientos
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="ID"
              name="id"
              value={filters.id}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Fecha Inicio"
              name="fechaInicio"
              type="date"
              value={filters.fechaInicio}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Fecha Fin"
              name="fechaFin"
              type="date"
              value={filters.fechaFin}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Buscar
            </Button>
          </Grid>
        </Grid>
        <TableContainer
          component={Paper}
          sx={{ width: "100%", overflowX: "auto", padding: "10px" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>IdSolicitud</TableCell>
                <TableCell>Nombres</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>NumCel</TableCell>
                <TableCell>Direccion</TableCell>
                <TableCell>Puesto</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{`${row.apePaterno} ${row.apeMaterno} ${row.nombres}`}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.numCel}</TableCell>
                  <TableCell>{row.direccion}</TableCell>
                  <TableCell>{row.puestoSolicitante}</TableCell>
                  <TableCell sx={{ width: "80px" }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleUpdate(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Actualizar Requerimiento</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmitUpdate}>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Apellido Paterno"
                  name="apePaterno"
                  value={formData.apePaterno}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Apellido Materno"
                  name="apeMaterno"
                  value={formData.apeMaterno}
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
                  name="numCel"
                  value={formData.numCel}
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
                  name="puestoSolicitante"
                  value={formData.puestoSolicitante}
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
                  onChange={handleChange}
                  fullWidth
                  placeholder="dd-MM-yyyy HH:mm:ss"
                  disabled
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleCloseUpdate} color="secondary">
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Actualizar
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de eliminar el registro con ID {selectedId}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="primary"
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

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

export default BandejaRequerimiento;
