import React, { useState, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  InputAdornment,
  Backdrop,
  Avatar,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { crearProductoAsync } from "../../../services/productoService";

const CrearProductos = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [base64Data, setBase64Data] = useState(null);

  const fileInputRef = useRef(null);
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

  const [product, setProduct] = useState({
    nombre: "",
    stock: "",
    precio: "",
    descripcion: "",
    descuento: "",
    urlimg: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    stock: "",
    precio: "",
    descripcion: "",
    descuento: "",
  });

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!product.nombre.trim()) {
      tempErrors.nombre = "El nombre es requerido";
      isValid = false;
    }

    if (!product.stock) {
      tempErrors.stock = "El stock es requerido";
      isValid = false;
    } else if (parseInt(product.stock) < 0) {
      tempErrors.stock = "El stock no puede ser negativo";
      isValid = false;
    }

    if (!product.precio) {
      tempErrors.precio = "El precio es requerido";
      isValid = false;
    } else if (parseFloat(product.precio) <= 0) {
      tempErrors.precio = "El precio debe ser mayor a 0";
      isValid = false;
    }

    if (!product.descripcion.trim()) {
      tempErrors.descripcion = "La descripción es requerida";
      isValid = false;
    }

    if (
      product.descuento &&
      (parseFloat(product.descuento) < 0 || parseFloat(product.descuento) > 100)
    ) {
      tempErrors.descuento = "El descuento debe estar entre 0 y 100";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleConvertBase64 = (file) => {
    console.log("file => ", file);
    if (!file) {
      console.error("No se proporcionó ningún archivo");
      return null;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (event) => {
      if (!event.target || !event.target.result) {
        console.error("Error al leer el archivo");
        return null;
      }

      const base64String = event.target.result;
      setBase64Data(base64String);
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error(
        "Por favor, complete todos los campos requeridos correctamente"
      );
      return;
    }

    if (!base64Data) {
      toast.error("Por favor, seleccione una imagen");
      return;
    }

    try {
      setLoading(true);

      handleConvertBase64(fileData);
      console.log("base64", base64Data);

      let request = {
        nombreProducto: product.nombre,
        stock: parseInt(product.stock),
        precio: parseFloat(product.precio),
        descripcionProducto: product.descripcion,
        descuentoProducto: product.descuento,
        urlimg: base64Data,
      };
      const json = JSON.stringify(request);
      const response = await crearProductoAsync(json);

      if (response.statusCode === 201) {
        toast.success(response.message);
        setProduct({
          nombre: "",
          stock: "",
          precio: "",
          descripcion: "",
          descuento: "",
        });
        setImage(null);
        setFileData(null);
        setBase64Data(null);
        setIsDragOver(false);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      toast.error("Error al crear el producto");
      console.error("Error:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (file) => {
    if (!allowedTypes.includes(file.type)) {
      toast.info("Solo se permiten imágenes en formato JPG, JPEG, PNG o GIF");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result.length > 5 * 1024 * 1024) {
        toast.error("La imagen debe ser menor a 5MB");
        return;
      }

      setImage({
        file,
        preview: reader.result,
        base64: reader.result.split(",")[1],
      });
      setFileData(file);
      setBase64Data(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    setImage(null);
    setFileData(null);
    setBase64Data(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Box>
      <Container maxWidth="md" sx={{ py: 11 }}>
        <Paper
          elevation={3}
          sx={{ p: 4, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ mb: 4 }}
          >
            Crear Nuevo Producto
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nombre del Producto"
              name="nombre"
              value={product.nombre}
              onChange={handleChange}
              error={!!errors.nombre}
              helperText={errors.nombre}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Stock"
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleChange}
              error={!!errors.stock}
              helperText={errors.stock}
              margin="normal"
              required
              InputProps={{
                inputProps: { min: 0 },
              }}
            />

            <TextField
              fullWidth
              label="Precio"
              name="precio"
              type="number"
              value={product.precio}
              onChange={handleChange}
              error={!!errors.precio}
              helperText={errors.precio}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">S/</InputAdornment>
                ),
                inputProps: { min: 0, step: "0.01" },
              }}
            />

            <TextField
              fullWidth
              label="Descripción"
              name="descripcion"
              value={product.descripcion}
              onChange={handleChange}
              error={!!errors.descripcion}
              helperText={errors.descripcion}
              margin="normal"
              required
              multiline
              rows={4}
            />

            <TextField
              fullWidth
              label="Descuento"
              name="descuento"
              type="number"
              value={product.descuento}
              onChange={handleChange}
              error={!!errors.descuento}
              helperText={errors.descuento}
              margin="normal"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                inputProps: { min: 0, max: 100, step: "0.1" },
              }}
            />

            <Box
              sx={{
                border: `2px dashed ${isDragOver ? "blue" : "grey"}`,
                borderRadius: 2,
                p: 2,
                textAlign: "center",
                cursor: "pointer",
                transition: "border-color 0.3s ease",
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
            >
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/jpeg,image/jpg,image/png,image/gif"
                onChange={handleFileInputChange}
              />

              {!image ? (
                <Box>
                  <CloudUploadIcon sx={{ fontSize: 60, color: "grey" }} />
                  <Typography>
                    Arrastra y suelta la imagen aquí o haz clic para seleccionar
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <img
                    src={image.preview}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: 300,
                      objectFit: "contain",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <Typography variant="body2">{image.file.name}</Typography>
                    <DeleteIcon
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove();
                      }}
                      sx={{ cursor: "pointer" }}
                    />
                  </Box>
                </Box>
              )}
            </Box>

            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  minWidth: 200,
                  backgroundColor: "rgb(52 1 185)",
                  "&:hover": {
                    backgroundColor: "rgb(42 1 145)",
                  },
                }}
              >
                Crear Producto
              </Button>
            </Box>
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
    </Box>
  );
};

export default CrearProductos;
