import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Paper,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
import EventIcon from '@mui/icons-material/Event';

const PaymentCard = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    dni: '',
    installments: ''
  });

  useEffect(() => {
    const total = sessionStorage.getItem('totalAmount');
    if (total) {
      setTotalAmount(parseFloat(total));
    }
  }, []);

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '')
                            .replace(/(\d{4})/g, '$1 ')
                            .trim();
      setFormData({ ...formData, [name]: formatted });
      return;
    }

    if (name === 'cvv') {
      const formatted = value.replace(/[^\d]/g, '').slice(0, 4);
      setFormData({ ...formData, [name]: formatted });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Número de tarjeta inválido';
    }
    
    if (!formData.cardHolder) {
      newErrors.cardHolder = 'Nombre requerido';
    }
    
    if (!formData.expiryMonth) {
      newErrors.expiryMonth = 'Mes requerido';
    }
    
    if (!formData.expiryYear) {
      newErrors.expiryYear = 'Año requerido';
    }
    
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = 'CVV inválido';
    }
    
    if (!formData.dni || formData.dni.length < 8) {
      newErrors.dni = 'DNI inválido';
    }
    
    if (!formData.installments) {
      newErrors.installments = 'Seleccione cuotas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log('Formulario válido', formData);
      // Aquí iría la lógica de procesamiento de pago
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  // Calcular las cuotas disponibles basadas en el monto total
  const getInstallmentOptions = () => {
    const options = [
      { value: '1', label: `1 cuota de S/ ${totalAmount.toFixed(2)}` },
      { value: '3', label: `3 cuotas de S/ ${(totalAmount / 3).toFixed(2)}` },
      { value: '6', label: `6 cuotas de S/ ${(totalAmount / 6).toFixed(2)}` },
      { value: '12', label: `12 cuotas de S/ ${(totalAmount / 12).toFixed(2)}` }
    ];
    return options;
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 13, px: 2 }}> 
      <Paper elevation={3} sx={{ mb: 3, p: 2, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h6" gutterBottom>
          Resumen de Compra
        </Typography>
        <Typography variant="h4" component="div">
          Total a Pagar: S/ {totalAmount.toFixed(2)}
        </Typography>
      </Paper>

      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
            Información de Pago
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Número de Tarjeta"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreditCardIcon />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="4111 1111 1111 1111"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre del Titular"
                  name="cardHolder"
                  value={formData.cardHolder}
                  onChange={handleChange}
                  error={!!errors.cardHolder}
                  helperText={errors.cardHolder}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Como aparece en la tarjeta"
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth error={!!errors.expiryMonth}>
                  <InputLabel>Mes</InputLabel>
                  <Select
                    value={formData.expiryMonth}
                    name="expiryMonth"
                    onChange={handleChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <EventIcon />
                      </InputAdornment>
                    }
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <MenuItem key={month} value={month.toString().padStart(2, '0')}>
                        {month.toString().padStart(2, '0')}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.expiryMonth && (
                    <Typography variant="caption" color="error">
                      {errors.expiryMonth}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth error={!!errors.expiryYear}>
                  <InputLabel>Año</InputLabel>
                  <Select
                    value={formData.expiryYear}
                    name="expiryYear"
                    onChange={handleChange}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.expiryYear && (
                    <Typography variant="caption" color="error">
                      {errors.expiryYear}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="CVV"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  error={!!errors.cvv}
                  helperText={errors.cvv}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SecurityIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="DNI"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  error={!!errors.dni}
                  helperText={errors.dni}
                  placeholder="12345678"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.installments}>
                  <InputLabel>Cuotas</InputLabel>
                  <Select
                    value={formData.installments}
                    name="installments"
                    onChange={handleChange}
                  >
                    {getInstallmentOptions().map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.installments && (
                    <Typography variant="caption" color="error">
                      {errors.installments}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Pagar S/ {totalAmount.toFixed(2)}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PaymentCard;