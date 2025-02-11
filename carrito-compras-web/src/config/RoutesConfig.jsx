import React, {useEffect} from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import LoginForm from '../features/auth/Login';
import RegistrarUsuario from '../features/auth/registrar-usuario/registrar-usuario';
import Navbar from "../features/navbar/Index";
import Home from "../features/home/Index";
import CrearProductos from "../features/mantenimiento/Index";
import BandejaRequerimiento from "../features/bandeja-requerimiento/Index";
import PaymentCard from "../features/payment/Index";

const AuthWrapper = ({ children, requireAuth }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const isAuthenticated = accessToken != null && accessToken !== undefined;

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.clear();
    }

    if (isAuthenticated && !requireAuth) {
      if (['/login', '/registrar-usuario'].includes(location.pathname)) {
        navigate('/', { replace: true });
      }
    } else if (!isAuthenticated && requireAuth) {
      navigate('/login', { 
        replace: true,
        state: { from: location.pathname } 
      });
    }
  }, [isAuthenticated, location, navigate, requireAuth]);

  if (isAuthenticated && !requireAuth) {
    return null;
  }
  if (!isAuthenticated && requireAuth) {
    return null;
  }

  return children;
};

const ProtectedRoute = ({ children }) => {
  return (
    <AuthWrapper requireAuth={true}>
      <Navbar />
      {children}
    </AuthWrapper>
  );
};

const PublicRoute = ({ children }) => {
  return (
    <AuthWrapper requireAuth={false}>
      {children}
    </AuthWrapper>
  );
};

const RoutesConfig = () => {
  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginForm />
          </PublicRoute>
        } 
      />
      <Route 
        path="/registrar-usuario" 
        element={
          <PublicRoute>
            <RegistrarUsuario />
          </PublicRoute>
        }
      />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/crear-productos"
        element={
          <ProtectedRoute>
            <CrearProductos />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/bandeja"
        element={
          <ProtectedRoute>
            <BandejaRequerimiento />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <PaymentCard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/"
        element={<Navigate to="/home" replace />}
      />

      <Route 
        path="*" 
        element={<Navigate to="/login" replace />} 
      />
    </Routes>
  );
};

export default RoutesConfig;