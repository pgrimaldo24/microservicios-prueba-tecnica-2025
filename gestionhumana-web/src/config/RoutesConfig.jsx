import React, { useState, useEffect } from "react";
import { Route, Routes, withRouter } from "react-router-dom";

import Navbar from "../features/navbar/Index";
import Home from "../features/home/Index";

import NuevoRequerimiento from "../features/nuevo-requerimiento/Index";
import BandejaRequerimiento from "../features/bandeja-requerimiento/Index";

const RoutesConfig = ({ location }) => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    setRoutes([
      { path: "/", element: <Home /> },
      { path: "/nuevo-requerimiento", element: <NuevoRequerimiento /> },
      { path: "/bandeja", element: <BandejaRequerimiento /> }
    ]);
  }, []);

  return (
    <>
      <Navbar />
      {/* <Route exact path="/" component='' /> */}
      <Routes location={location}>
        {/* <Route location={location} path="/adjuntar-reporte" component={Index} /> */}
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
};

export default RoutesConfig;
