import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Badge,
  Backdrop,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { listarProductosAsync } from "../../services/productoService";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  
  const navigate = useNavigate();
  // const products = [
  //   {
  //     id: 1,
  //     title: 'Smartphone XYZ',
  //     description: 'Último modelo con cámara de 48MP, 128GB de almacenamiento y 8GB RAM.',
  //     price: 1299.99,
  //     image: '/api/placeholder/300/200'
  //   },
  //   {
  //     id: 2,
  //     title: 'Laptop Pro',
  //     description: 'Procesador Intel i7, 16GB RAM, SSD 512GB, perfecta para trabajo y gaming.',
  //     price: 3499.99,
  //     image: '/api/placeholder/300/200'
  //   },
  //   {
  //     id: 3,
  //     title: 'Audífonos Wireless',
  //     description: 'Cancelación de ruido activa, 30 horas de batería, conexión Bluetooth 5.0.',
  //     price: 299.99,
  //     image: '/api/placeholder/300/200'
  //   },
  //   {
  //     id: 4,
  //     title: 'Smartwatch Sport',
  //     description: 'Monitor cardíaco, GPS integrado, resistente al agua, pantalla AMOLED.',
  //     price: 399.99,
  //     image: '/api/placeholder/300/200'
  //   },
  //   {
  //     id: 5,
  //     title: 'Tablet Ultra',
  //     description: 'Pantalla 10.5", procesador octa-core, perfecta para multimedia.',
  //     price: 699.99,
  //     image: '/api/placeholder/300/200'
  //   },
  //   {
  //     id: 6,
  //     title: 'Cámara DSLR',
  //     description: 'Sensor full frame, 24MP, grabación 4K, perfecta para profesionales.',
  //     price: 2499.99,
  //     image: '/api/placeholder/300/200'
  //   }
  // ];

  useEffect(() => {
    handleListaProductos();
  }, []);

  const handleListaProductos = async () => {
    try {
      setLoading(true);
      const response = await listarProductosAsync();
      const productosConImagenes = response.map((product) => ({
        ...product,
        urlimg: product.urlimg.startsWith("data:image")
          ? product.urlimg
          : `data:image/jpeg;base64,${product.urlimg}`,
      }));
      console.log("productosConImagenes => ", productosConImagenes);
      setProducts(productosConImagenes);
    } catch (error) {
      toast.error("Error al listar productos");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.precio, 0);
  };

  const handlePayment = () => {
    const total = calculateTotal();
    sessionStorage.setItem('totalAmount', total);
    navigate("/payment");
  };

  const CartDialog = () => (
    <Dialog
      open={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown
      onBackdropClick={(e) => e.stopPropagation()}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Carrito de Compras
        <IconButton
          aria-label="close"
          onClick={() => setIsCartOpen(false)}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {cartItems.length === 0 ? (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", color: "text.secondary", py: 2 }}
            >
              El carrito está vacío
            </Typography>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    mb: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={item.urlimg}
                    alt={item.nombreProducto}
                    sx={{
                      width: 64,
                      height: 64,
                      objectFit: "cover",
                      borderRadius: 1,
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {item.nombreProducto}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      S/ {item.precio.toFixed(2)}
                    </Typography>
                  </Box>
                  <IconButton 
                    onClick={() => removeFromCart(index)}
                    sx={{
                      color: 'error.main',
                      '&:hover': {
                        backgroundColor: 'error.light',
                        color: 'error.dark',
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}

              <Box
                sx={{
                  borderTop: "1px solid",
                  borderColor: "divider",
                  pt: 2,
                  mt: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6">
                    S/ {calculateTotal().toFixed(2)}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handlePayment}
                >
                  PAGAR
                </Button>
              </Box>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pt: "84px",
        pb: "60px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 90,
          right: 40,
          zIndex: 1100,
        }}
      >
        <IconButton
          onClick={() => setIsCartOpen(true)}
          sx={{
            bgcolor: "background.paper",
            boxShadow: 2,
            "&:hover": { bgcolor: "background.paper" },
          }}
        >
          <Badge badgeContent={cartItems.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 4,
            color: "white",
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            fontWeight: "bold",
          }}
        >
          Tecnología Store
        </Typography>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    "& .add-button": {
                      opacity: 1,
                    },
                  },
                }}
              >
                <IconButton
                  className="add-button"
                  onClick={() => addToCart(product)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "background.paper",
                    opacity: 0,
                    transition: "opacity 0.2s",
                    zIndex: 1,
                    boxShadow: 2,
                    "&:hover": {
                      bgcolor: "background.paper",
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.urlimg}
                  alt={product.nombreProducto}
                  sx={{
                    objectFit: "cover",
                    borderBottom: "1px solid rgba(0,0,0,0.1)",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: "bold" }}
                  >
                    {product.nombreProducto}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {product.descripcionProducto}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    S/ {product.precio.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <CartDialog />
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

export default Home;
